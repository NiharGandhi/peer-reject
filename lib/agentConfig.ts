import {
  CHEN_PROMPT as METHODOLOGY_PROMPT,
  HARRINGTON_PROMPT as BUDGET_PROMPT,
  ALMANSOURI_PROMPT as DOMAIN_PROMPT,
  NOVELTY_PROMPT,
  PRESENTATION_PROMPT,
  STATISTICS_PROMPT,
  SURVEY_PROMPT,
} from './prompts';

export type AgentId =
  | 'methodology'
  | 'budget'
  | 'novelty'
  | 'domain'
  | 'presentation'
  | 'statistics'
  | 'survey';

export interface AgentMeta {
  name: string;
  role: string;
  thinkingLabel: string;
  writingLabel: string;
  scoreLabel: string;
  /** Header prefix written in the model output — used to split thinking trace */
  reviewHeader: string;
}

export const AGENT_META: Record<AgentId, AgentMeta> = {
  methodology: {
    name: 'Methodology Agent',
    role: 'Research Design & Methods',
    thinkingLabel: 'Evaluating research design and methodology...',
    writingLabel: 'Writing methodology critique...',
    scoreLabel: 'Methodology Score',
    reviewHeader: 'METHODOLOGY REVIEW',
  },
  budget: {
    name: 'Budget & Feasibility Agent',
    role: 'Budget, Timeline & Team',
    thinkingLabel: 'Auditing budget, timeline, and team qualifications...',
    writingLabel: 'Writing budget & feasibility review...',
    scoreLabel: 'Feasibility Score',
    reviewHeader: 'BUDGET & FEASIBILITY REVIEW',
  },
  novelty: {
    name: 'Novelty Agent',
    role: 'Contribution & Prior Work',
    thinkingLabel: 'Evaluating novelty and prior art...',
    writingLabel: 'Writing novelty critique...',
    scoreLabel: 'Novelty Score',
    reviewHeader: 'NOVELTY & CONTRIBUTION REVIEW',
  },
  domain: {
    name: 'Domain Expert Agent',
    role: 'Domain Accuracy & Impact',
    thinkingLabel: 'Assessing domain accuracy and scientific impact...',
    writingLabel: 'Writing domain & impact assessment...',
    scoreLabel: 'Domain / Impact Score',
    reviewHeader: 'DOMAIN & IMPACT REVIEW',
  },
  presentation: {
    name: 'Presentation Agent',
    role: 'Clarity & Structure',
    thinkingLabel: 'Analyzing writing quality and structure...',
    writingLabel: 'Writing presentation review...',
    scoreLabel: 'Clarity Score',
    reviewHeader: 'PRESENTATION & CLARITY REVIEW',
  },
  statistics: {
    name: 'Statistical Rigor Agent',
    role: 'Statistical Rigour & Data',
    thinkingLabel: 'Evaluating statistical methods and data analysis...',
    writingLabel: 'Writing statistical rigor review...',
    scoreLabel: 'Statistical Rigor Score',
    reviewHeader: 'STATISTICAL RIGOR REVIEW',
  },
  survey: {
    name: 'Survey Completeness Agent',
    role: 'Literature Coverage',
    thinkingLabel: 'Checking literature coverage and completeness...',
    writingLabel: 'Writing survey completeness review...',
    scoreLabel: 'Coverage Score',
    reviewHeader: 'SURVEY COMPLETENESS REVIEW',
  },
};

/** Map of agent ID → system prompt (server-side only) */
export const AGENT_PROMPTS: Record<AgentId, string> = {
  methodology: METHODOLOGY_PROMPT,
  budget: BUDGET_PROMPT,
  novelty: NOVELTY_PROMPT,
  domain: DOMAIN_PROMPT,
  presentation: PRESENTATION_PROMPT,
  statistics: STATISTICS_PROMPT,
  survey: SURVEY_PROMPT,
};

// ─── Document classifier (client-side heuristics, runs instantly) ─────────────

export interface Classification {
  docType: string;
  label: string;
  agents: AgentId[];
}

export function classifyDocument(text: string): Classification {
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // ── Grant proposal ──────────────────────────────────────────────────────────
  if (
    /budget justification|indirect costs|fringe rate|principal investigator.*?:\s|requested amount|grant proposal|funding request|research funding/i.test(text) ||
    /personnel.*?:\s*\$[\d,]+|subtotal.*?:\s*\$[\d,]+/i.test(text)
  ) {
    return { docType: 'Grant Proposal', label: 'Research Grant Proposal', agents: ['methodology', 'budget', 'domain'] };
  }

  // ── Clinical / medical trial ─────────────────────────────────────────────────
  if (/randomized controlled trial|rct|clinical trial|irb approval|participants were randomized|adverse event|placebo|double.blind/i.test(text)) {
    return { docType: 'Clinical Trial', label: 'Clinical / Medical Trial', agents: ['methodology', 'statistics', 'domain'] };
  }

  // ── Survey / literature review ───────────────────────────────────────────────
  const refCount = (text.match(/\[\d+\]/g) ?? []).length + (text.match(/et al\./g) ?? []).length;
  if (
    refCount > 50 ||
    /systematic review|literature review|we survey the|survey of (the )?literature|this survey/i.test(text)
  ) {
    return { docType: 'Survey', label: 'Survey / Literature Review', agents: ['survey', 'domain', 'presentation'] };
  }

  // ── Thesis / dissertation ────────────────────────────────────────────────────
  if (
    /\bthesis\b|\bdissertation\b|table of contents|chapter \d|submitted (in partial )?fulfillment/i.test(text) ||
    wordCount > 12000
  ) {
    return { docType: 'Thesis', label: 'Thesis / Dissertation', agents: ['methodology', 'novelty', 'domain', 'presentation'] };
  }

  // ── Conference / workshop paper (usually short, structured) ─────────────────
  if (
    wordCount < 4000 &&
    /abstract|introduction|conclusion/i.test(text) &&
    !/budget|funded by|grant number/i.test(text)
  ) {
    return { docType: 'Conference Paper', label: 'Conference / Workshop Paper', agents: ['novelty', 'methodology', 'presentation'] };
  }

  // ── Position / opinion paper ──────────────────────────────────────────────────
  if (/position paper|we argue that|we believe that|opinion|manifesto|call to action/i.test(text)) {
    return { docType: 'Position Paper', label: 'Position / Opinion Paper', agents: ['domain', 'novelty', 'presentation'] };
  }

  // ── Technical report / system paper ─────────────────────────────────────────
  if (/technical report|system design|architecture overview|implementation details|we describe the (system|architecture)/i.test(text)) {
    return { docType: 'Technical Report', label: 'Technical Report / System Paper', agents: ['methodology', 'domain', 'presentation'] };
  }

  // ── Default: empirical journal paper ─────────────────────────────────────────
  return { docType: 'Journal Paper', label: 'Empirical / Journal Paper', agents: ['methodology', 'novelty', 'domain'] };
}

/** Build the reviewer block for the synthesis prompt user content */
export function buildSynthesisReviewerBlock(
  agents: AgentId[],
  reviews: Record<string, string>
): string {
  return agents
    .map((id, i) => {
      const meta = AGENT_META[id];
      return `REVIEWER ${i + 1} — ${meta.name.toUpperCase()} (${meta.role}):\n${reviews[id] ?? ''}`;
    })
    .join('\n\n---\n\n');
}
