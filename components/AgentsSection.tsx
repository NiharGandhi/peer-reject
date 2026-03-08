'use client';

import { useLang } from '@/contexts/LanguageContext';

/* Darker shades for better visibility in both themes */
const AGENT_ACCENTS = [
  '#0891b2', // 01 cyan-600
  '#059669', // 02 emerald-600
  '#7c3aed', // 03 violet-600
  '#d97706', // 04 amber-600
  '#db2777', // 05 pink-600
  '#2563eb', // 06 blue-600
  '#4f46e5', // 07 indigo-600
  '#475569', // 08 slate-600
  '#b8860b', // 09 dark goldenrod
];

const AGENTS: {
  num: string;
  name: string;
  role: string;
  focus: string[];
  assignedTo: string[];
  comingSoon?: boolean;
}[] = [
  {
    num: '01',
    name: 'Methodology Agent',
    role: 'Research Design & Methods',
    focus: [
      'Clarity of research questions and hypotheses',
      'Appropriateness of design for stated objectives',
      'Sample sizes, power analysis, and data sources',
      'Statistical analysis plan and reproducibility',
      'Internal and external validity threats',
    ],
    assignedTo: ['Grant', 'Clinical Trial', 'Thesis', 'Journal Paper'],
  },
  {
    num: '02',
    name: 'Budget & Feasibility Agent',
    role: 'Budget, Timeline & Team',
    focus: [
      'Line-by-line budget audit — personnel, equipment, indirect costs',
      'Timeline realism and milestone sequencing',
      'PI and team qualification gaps',
      'Unmitigated risks and missing contingencies',
    ],
    assignedTo: ['Grant Proposal'],
  },
  {
    num: '03',
    name: 'Novelty Agent',
    role: 'Contribution & Prior Art',
    focus: [
      'Claimed vs. genuinely novel contributions',
      'Specific prior works that overlap or supersede',
      'Missing baselines and comparison benchmarks',
      'Whether novelty claims are narrow and defensible',
    ],
    assignedTo: ['Journal Paper', 'Conference Paper', 'Thesis'],
  },
  {
    num: '04',
    name: 'Domain Expert Agent',
    role: 'Domain Accuracy & Scientific Impact',
    focus: [
      'Accuracy of technical claims and terminology',
      'Engagement with the current state of the art',
      'Realistic assessment of broader impact',
      'Factual errors and dangerous oversimplifications',
    ],
    assignedTo: ['Grant', 'Clinical Trial', 'Survey', 'Thesis', 'Journal Paper'],
  },
  {
    num: '05',
    name: 'Presentation Agent',
    role: 'Clarity & Structure',
    focus: [
      'Abstract accuracy and contribution clarity',
      'Logical narrative flow from problem to conclusion',
      'Ambiguous, vague, or contradictory statements',
      'Figures, tables, notation consistency',
    ],
    assignedTo: ['Conference Paper', 'Thesis', 'Position Paper', 'Survey'],
  },
  {
    num: '06',
    name: 'Statistical Rigor Agent',
    role: 'Statistical Methods & Data',
    focus: [
      'Sample size adequacy and experimental controls',
      'Appropriateness and assumptions of chosen tests',
      'Effect sizes, confidence intervals, multiple comparisons',
      'Causal vs. correlational interpretation',
    ],
    assignedTo: ['Clinical Trial'],
  },
  {
    num: '07',
    name: 'Survey Completeness Agent',
    role: 'Literature Coverage',
    focus: [
      'Missing seminal and recent works',
      'Taxonomy logic and category consistency',
      'Fairness of cross-paper comparisons',
      'Accuracy of cited paper summaries',
    ],
    assignedTo: ['Survey / Literature Review'],
  },
  {
    num: '08',
    name: 'Ethics & Compliance Agent',
    role: 'Ethics, Consent & Regulatory Compliance',
    focus: [
      'IRB / ethics board approval status and adequacy',
      'Informed consent procedures and participant protections',
      'Data privacy, handling, and retention policies',
      'Regulatory compliance and conflict-of-interest disclosures',
    ],
    assignedTo: ['Clinical Trial', 'Grant', 'Thesis'],
    comingSoon: true,
  },
  {
    num: '09',
    name: 'Reproducibility Agent',
    role: 'Open Science & Replicability',
    focus: [
      'Code, model weights, and artifact availability',
      'Dataset documentation and access conditions',
      'Sufficiency of implementation details for replication',
      'Alignment with open-science and FAIR data principles',
    ],
    assignedTo: ['Journal Paper', 'Conference Paper', 'Thesis'],
    comingSoon: true,
  },
];

export default function AgentsSection() {
  const { theme } = useLang();
  const isLight = theme === 'light';
  const gradStart = isLight ? '15' : '08';
  const gradHover = isLight ? '22' : '12';

  return (
    <section className="agents-section px-6 sm:px-12 py-24 sm:py-32 border-t border-[var(--border)] relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--t3)' }}>
            The Panel
          </p>
          <h2 className="display text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--t1)' }}>
            Seven agents.<br />
            <span className="gradient-text">Every angle covered.</span>
          </h2>
          <p className="text-base font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
            Each agent is a specialist. Peer Reject automatically assembles the right panel based on your document type — so only the relevant experts review your work.
          </p>
        </div>

        {/* Agent grid */}
        <div className="agents-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
          {AGENTS.map((agent, idx) => {
            const accent = AGENT_ACCENTS[idx] ?? '#71717a';
            return (
              <div
                key={agent.num}
                className="agent-card flex flex-col gap-6 p-8 transition-all duration-300 relative"
                style={{
                  background: `linear-gradient(to bottom, ${accent}${gradStart} 0%, var(--bg) 40%)`,
                  opacity: agent.comingSoon ? 0.55 : 1,
                  borderBottom: `2px solid ${accent}30`,
                }}
                onMouseEnter={(e) => {
                  if (!agent.comingSoon) {
                    e.currentTarget.style.background = `linear-gradient(to bottom, ${accent}${gradHover} 0%, var(--bg1) 40%)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(to bottom, ${accent}${gradStart} 0%, var(--bg) 40%)`;
                }}
              >
                {/* Number + badges */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-mono text-[10px] tracking-widest font-bold tabular-nums px-2 py-1 rounded"
                    style={{ color: accent, background: `${accent}18` }}
                  >
                    {agent.num}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {agent.comingSoon ? (
                      <span className="coming-soon-badge text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ color: 'var(--t3)', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
                        Coming Soon
                      </span>
                    ) : (
                      agent.assignedTo.map((type) => (
                        <span
                          key={type}
                          className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            color: accent,
                            border: `1px solid ${accent}40`,
                            background: `${accent}15`,
                          }}
                        >
                          {type}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Name + role */}
                <div className="flex flex-col gap-1 relative">
                  <h3 className="display text-lg font-semibold leading-snug" style={{ color: 'var(--t1)' }}>
                    {agent.name}
                  </h3>
                  <p className="agent-role text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
                    {agent.role}
                  </p>
                </div>

                {/* Focus areas */}
                <ul className="agent-focus-border flex flex-col gap-2 pt-4 border-t border-[var(--border)] relative">
                  {agent.focus.map((item) => (
                    <li key={item} className="agent-focus flex items-start gap-2.5 text-sm font-light leading-snug"
                      style={{ color: 'var(--t2)', fontFamily: 'var(--font-ui)' }}>
                      <span
                        className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
