export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'quote'; text: string };

export interface Post {
  slug: string;
  title: string;
  description: string;          // meta description
  date: string;                 // ISO date string
  readTime: number;             // minutes
  tags: string[];
  excerpt: string;              // card summary
  content: Block[];
}

const posts: Post[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'grant-proposal-rejection-reasons',
    title: '10 Reasons Grant Proposals Get Rejected — And How to Fix Them',
    description:
      'Most grant proposals are rejected for the same handful of avoidable reasons. Learn what reviewers flag most often and how to fix each issue before you submit.',
    date: '2026-02-10',
    readTime: 9,
    tags: ['Grant Writing', 'Peer Review', 'Research'],
    excerpt:
      'Rejection is the default outcome for most grant proposals. Understanding the ten most common reasons — and fixing them before submission — dramatically improves your odds.',
    content: [
      { type: 'p', text: 'Grant committees reject the majority of applications they receive. At the NIH, for example, the overall success rate for R01 applications hovers below 20%. At most private foundations, it is lower still. Understanding why proposals fail is the single most efficient way to improve your own odds.' },
      { type: 'h2', text: '1. The Research Question Is Not Falsifiable' },
      { type: 'p', text: 'Reviewers need to be able to imagine your proposal being wrong. If your research question is so broad or so vaguely stated that no experimental outcome could disprove it, the committee cannot evaluate scientific merit. State a specific, testable hypothesis — ideally in the form "we predict X because of Y, and we will measure Z to test it."' },
      { type: 'h2', text: '2. Underpowered Sample Sizes' },
      { type: 'p', text: 'Nothing signals methodological weakness faster than a sample size that was chosen by convenience rather than by power analysis. A methodology reviewer will calculate whether your N is sufficient to detect the effect size you claim — and if it is not, the proposal receives a Fatal flaw. Include a formal power analysis for every primary outcome measure.' },
      { type: 'h2', text: '3. Inflated or Unjustified Budget' },
      { type: 'p', text: 'Budget auditors are trained to spot rounded numbers, unexplained equipment costs, and salary rates that do not match institutional scales. Every line item must be justified with a calculation, not a guess. Personnel costs should reference actual FTE allocations. Equipment should cite vendor quotes.' },
      { type: 'h2', text: '4. Weak Novelty Claims' },
      { type: 'p', text: 'Claiming that your work is "the first to..." is one of the most dangerous moves in a grant proposal. Domain experts on review committees are intimately familiar with the literature and will know immediately if a prior paper contradicts your novelty claim. Make narrow, defensible contribution statements and acknowledge existing work explicitly.' },
      { type: 'h2', text: '5. Missing or Outdated Literature Coverage' },
      { type: 'p', text: 'A literature review that omits seminal papers, or that cites nothing newer than five years ago, signals to reviewers that the PI is not current in the field. Survey your references for coverage gaps before submission and ensure you engage with work published in the last 24 months.' },
      { type: 'h2', text: '6. Unrealistic Timeline' },
      { type: 'p', text: 'A four-year timeline that compresses eighteen months of participant recruitment into the first six months will be flagged as infeasible. Map each milestone to actual resource availability. Include buffer time after major data collection phases. Reviewers have seen enough funded projects to know what is achievable.' },
      { type: 'h2', text: '7. Methodology Does Not Match the Research Question' },
      { type: 'p', text: 'A cross-sectional survey cannot establish causal relationships. A qualitative case study cannot generalize to a population. Methodology reviewers evaluate whether your chosen design is capable of answering your stated research question — not just whether the methods are well described. The match between question and design must be explicit.' },
      { type: 'h2', text: '8. No Preliminary Data' },
      { type: 'p', text: 'For most competitive grant mechanisms, preliminary data is not optional — it is expected. A proposal without pilot results is asking the committee to fund a hypothesis rather than a demonstrated approach. Even a small pilot study, a proof-of-concept experiment, or published adjacent work counts as evidence of feasibility.' },
      { type: 'h2', text: '9. Writing Quality and Structure' },
      { type: 'p', text: 'Reviewers read dozens of proposals in a compressed timeframe. A proposal with an unclear abstract, a poorly structured Specific Aims page, or dense walls of text will receive a lower priority score regardless of scientific merit. Clarity is a scientific virtue.' },
      { type: 'h2', text: '10. Underqualified Team for Proposed Scope' },
      { type: 'p', text: 'If your proposal involves clinical data collection and no one on the team has clinical research experience, reviewers will notice. Every major methodological component of the proposal should be matched to a named team member with demonstrable experience in that area. Identify gaps honestly and address them with consultants or collaborators.' },
      { type: 'callout', text: 'Peer Reject simulates an adversarial review panel that checks for all ten of these issues simultaneously — before your real committee sees the proposal. Upload your draft and receive a severity-ranked weakness report in under two minutes.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-write-a-grant-proposal',
    title: 'How to Write a Grant Proposal: A Complete Step-by-Step Guide',
    description:
      'A comprehensive guide to writing a fundable grant proposal — from crafting your Specific Aims page to building a defensible budget and surviving peer review.',
    date: '2026-02-14',
    readTime: 12,
    tags: ['Grant Writing', 'Research Funding', 'Academic Writing'],
    excerpt:
      'Writing a grant proposal that survives peer review requires more than good science. Here is a step-by-step framework covering every section, from the abstract to the budget justification.',
    content: [
      { type: 'p', text: 'A grant proposal is not a research paper. It is a persuasive document designed to convince a skeptical, time-pressured committee that your work is fundable. Every section serves a specific rhetorical function, and understanding those functions is the first step toward writing a proposal that gets funded.' },
      { type: 'h2', text: 'Step 1: Start with the Specific Aims Page' },
      { type: 'p', text: 'The Specific Aims page is the most important single page in most grant applications. It must state the problem, your approach, and your expected outcomes within a single page. Many reviewers form their overall impression of a proposal from this page alone. Write it last, after you fully understand what the rest of the proposal says.' },
      { type: 'h2', text: 'Step 2: Frame the Problem Precisely' },
      { type: 'p', text: 'The background and significance section must establish three things: that the problem is real and important, that existing approaches are insufficient, and that you have a plausible solution. Do not pad this section with general statements about disease burden or societal impact — reviewers want to see that you understand the specific gap your work fills.' },
      { type: 'h2', text: 'Step 3: State a Falsifiable Hypothesis' },
      { type: 'p', text: 'Your central hypothesis must be testable. "We hypothesize that X leads to Y via mechanism Z, which will manifest as observable outcome W" is a good template. A hypothesis that cannot be disproven is not a scientific hypothesis — it is a belief statement, and committees do not fund belief statements.' },
      { type: 'h2', text: 'Step 4: Build a Methodology Section That Can Withstand Scrutiny' },
      { type: 'p', text: 'Describe your research design, sample selection, data collection procedures, and analysis plan in sufficient detail that a reviewer in your field could replicate the study. Address potential limitations proactively — describing alternative approaches if primary methods encounter obstacles demonstrates methodological maturity.' },
      { type: 'h3', text: 'Include a Statistical Analysis Plan' },
      { type: 'p', text: 'Specify the statistical tests you will use, justify your sample size with a formal power analysis, and indicate how you will handle missing data. A methodology reviewer who cannot find these elements will mark the proposal as a major weakness.' },
      { type: 'h2', text: 'Step 5: Write an Honest Budget Justification' },
      { type: 'p', text: 'Every line in your budget must be justified with a specific calculation. Personnel costs should specify effort in person-months. Equipment should cite vendor quotes or GSA schedule prices. Travel should reference conference registration fees and airfare estimates. Round numbers are a red flag — they suggest estimation rather than planning.' },
      { type: 'h2', text: 'Step 6: Demonstrate Team Qualifications' },
      { type: 'p', text: 'The biosketch section is your opportunity to match your team to the demands of the proposed work. For every major technical component of the proposal, at least one named team member should have demonstrable expertise. If your team has a gap — for instance, you propose machine learning methods but no one has an ML background — address it explicitly with a consultant.' },
      { type: 'h2', text: 'Step 7: Revise the Abstract Last' },
      { type: 'p', text: 'The abstract is read first but should be written last. It must accurately summarize every section of the proposal in a form that makes sense to a non-specialist reviewer. Test your abstract by asking a colleague in a different field whether they can explain your project after reading it.' },
      { type: 'h2', text: 'Step 8: Run an Adversarial Pre-Review' },
      { type: 'p', text: 'Before submitting, read your proposal through the eyes of a hostile reviewer looking for reasons to reject it. Better yet, ask a colleague to do so. The goal is to find every weakness before the committee does. Tools like Peer Reject automate this process by simulating a panel of adversarial AI reviewers who evaluate your methodology, budget, and novelty independently.' },
      { type: 'callout', text: 'Peer Reject can review your complete grant proposal in under two minutes, returning a formal rejection letter, severity-ranked weakness report, and numbered fix recommendations — the same output format a real committee would produce.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'what-grant-reviewers-look-for',
    title: 'What Grant Reviewers Actually Look For: Inside the Review Committee',
    description:
      'Grant reviewers evaluate proposals on specific criteria. Understanding exactly what each type of reviewer looks for — and how they score — lets you write directly to their concerns.',
    date: '2026-02-18',
    readTime: 8,
    tags: ['Peer Review', 'Grant Writing', 'Research Funding'],
    excerpt:
      'Every person on a grant review panel brings a different lens. Understanding how methodology reviewers, budget auditors, and domain experts think — and what they penalise — is the key to writing a proposal that survives.',
    content: [
      { type: 'p', text: 'A grant review panel is not a monolith. Different reviewers are assigned to evaluate different aspects of your proposal, and each brings specific expertise and specific concerns. Writing a proposal without understanding these distinct roles is like preparing for a job interview without knowing who will be in the room.' },
      { type: 'h2', text: 'The Methodology Reviewer' },
      { type: 'p', text: 'The methodology reviewer\'s job is to determine whether your proposed research design is capable of answering your stated research question. They will look for a clear hypothesis, an appropriate study design, justified sample sizes, a complete statistical analysis plan, and explicit discussion of limitations and alternative approaches.' },
      { type: 'p', text: 'Common flags raised by methodology reviewers: sample size chosen without power analysis, statistical tests named without justification, no mention of blinding or randomisation in experimental designs, and confounding variables not addressed.' },
      { type: 'h2', text: 'The Budget Auditor' },
      { type: 'p', text: 'Budget auditors read grant applications like forensic accountants. They are looking for rounded numbers (suggesting estimation rather than planning), unexplained equipment costs, salary rates that do not match published institutional scales, and project costs that do not align with the proposed scope of work.' },
      { type: 'p', text: 'A budget that is too high signals poor planning or inflated ambition. A budget that is too low for the proposed work signals that you have not thought through what execution actually requires. Both are red flags.' },
      { type: 'h2', text: 'The Domain Expert' },
      { type: 'p', text: 'The domain expert evaluates the scientific novelty of your contribution and your engagement with the field\'s current state of knowledge. They will know the key papers in your area and will immediately notice if you have missed a seminal work, misrepresented a prior result, or overclaimed novelty.' },
      { type: 'p', text: 'Domain experts also evaluate the broader impact of your proposed work — whether it has the potential to advance understanding in a meaningful way, not just produce incremental results.' },
      { type: 'h2', text: 'The Presentation Reviewer' },
      { type: 'p', text: 'Not all panels have a dedicated presentation reviewer, but all reviewers are influenced by writing quality. Proposals with a disorganised abstract, an unclear Specific Aims page, or inconsistent terminology are penalised — not because the science is bad, but because poor presentation signals poor thinking.' },
      { type: 'h2', text: 'How Reviewers Score' },
      { type: 'p', text: 'Most funding bodies use a tiered scoring system. NIH uses a 1-9 scale where lower scores are better. Issues are typically classified as Fatal (blocks fundability), Major (requires significant revision), or Minor (polish-level concerns). A single Fatal flaw is usually sufficient to reject an application regardless of its other merits.' },
      { type: 'h2', text: 'Writing Directly to Each Reviewer\'s Concerns' },
      { type: 'p', text: 'The practical implication of understanding reviewer roles is that you should mentally address each reviewer type as you write each section. When you write your methods, ask: what would a hostile methodology reviewer flag here? When you write your budget, ask: what would a forensic budget auditor question? This adversarial mindset is the most effective pre-submission review you can perform.' },
      { type: 'callout', text: 'Peer Reject replicates this multi-reviewer dynamic with parallel AI agents — a Methodology Agent, Budget & Feasibility Agent, Domain Expert Agent, and more — each independently reviewing your proposal from their specialist perspective.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'grant-proposal-methodology-section',
    title: 'How to Write a Methodology Section That Survives Peer Review',
    description:
      'The methodology section is where most grant proposals lose points. Learn exactly what reviewers expect — from hypothesis to statistical analysis plan — and how to write a methods section that holds up under scrutiny.',
    date: '2026-02-22',
    readTime: 10,
    tags: ['Grant Writing', 'Research Methods', 'Academic Writing'],
    excerpt:
      'The methodology section is the most technically scrutinised part of any grant proposal. A rigorous methods section demonstrates scientific maturity — and a weak one is a Fatal flaw regardless of how strong your other sections are.',
    content: [
      { type: 'p', text: 'In most grant proposals, the methodology section is where applications succeed or fail. A compelling research question and a polished abstract cannot compensate for a methods section that raises unanswered questions about feasibility, validity, or statistical rigor. Methodology reviewers are trained to be skeptical — and they should be.' },
      { type: 'h2', text: 'State Your Design Choice and Justify It' },
      { type: 'p', text: 'Do not simply name your research design — justify why it is the most appropriate design for your research question. If you are using a randomized controlled trial, explain why observational data would be insufficient. If you are using a qualitative approach, explain why quantitative measurement would miss the phenomenon you are studying. Every design choice implies trade-offs; acknowledge them.' },
      { type: 'h2', text: 'Define Your Primary and Secondary Outcomes Precisely' },
      { type: 'p', text: 'Vague outcome measures are a methodological red flag. Instead of "we will measure cognitive function," specify "we will administer the Montreal Cognitive Assessment (MoCA) at baseline, 6 months, and 12 months, with composite MoCA score as our primary outcome and Trail Making Test Part B as a secondary outcome." Precision signals that you have actually thought through what you are measuring.' },
      { type: 'h2', text: 'Include a Formal Power Analysis' },
      { type: 'p', text: 'Sample sizes chosen without power analysis are one of the most common Fatal flaws in grant methodology sections. Your power analysis should specify your expected effect size and its source (prior literature, pilot data), your significance threshold (typically α = 0.05), your desired power (typically 80% or 90%), and the resulting minimum sample size. Account for expected attrition.' },
      { type: 'h3', text: 'Where to Get Your Effect Size Estimate' },
      { type: 'p', text: 'The most credible sources for effect size estimates are your own pilot data, meta-analyses in your field, or the most recent high-quality study on your population. Using an effect size from a different population or a convenience sample will be questioned.' },
      { type: 'h2', text: 'Describe Your Statistical Analysis Plan' },
      { type: 'p', text: 'Name the specific statistical tests you will use for each outcome measure. Justify why those tests are appropriate (e.g., mixed-effects models to handle missing data and within-subject correlation). Describe how you will handle violations of statistical assumptions. Address multiple comparison corrections if you have multiple primary outcomes.' },
      { type: 'h2', text: 'Address Limitations and Mitigation Strategies' },
      { type: 'p', text: 'A methodology section that does not acknowledge any limitations will be viewed as naive by reviewers who know the field. Proactively identify the two or three most significant limitations of your design and describe how you will mitigate them. This demonstrates methodological maturity, not weakness.' },
      { type: 'h2', text: 'Describe Data Management and Quality Control' },
      { type: 'p', text: 'Reviewers increasingly expect explicit data management plans. Describe where data will be stored, how it will be backed up, how access will be controlled, and how data quality will be verified. For clinical data, describe blinding procedures. For survey data, describe validation procedures. These details signal that you have run studies before.' },
      { type: 'h2', text: 'Present a Realistic Timeline' },
      { type: 'p', text: 'A Gantt chart or milestone table that shows your project unfolding in a logical, achievable sequence is expected in most grant applications. Map each milestone to specific deliverables and specific personnel. If Year 1 is entirely devoted to recruitment and instrument development, state that explicitly — do not compress recruitment into a single quarter to make the timeline look faster.' },
      { type: 'callout', text: 'Peer Reject\'s Methodology Agent reviews your methods section with the same skepticism as a real committee reviewer — checking your design-question fit, power analysis, statistical plan, and timeline for logical consistency.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'grant-budget-justification-guide',
    title: 'Grant Budget Justification: A Complete Guide with Examples',
    description:
      'Your budget justification can make or break a grant application. Learn how to write a budget narrative that satisfies forensic-level scrutiny from review committees.',
    date: '2026-02-26',
    readTime: 8,
    tags: ['Grant Writing', 'Research Funding', 'Budget Planning'],
    excerpt:
      'A grant budget that cannot be justified line by line is a Fatal flaw. This guide walks through every major budget category — personnel, equipment, travel, and indirect costs — with examples of what reviewers expect.',
    content: [
      { type: 'p', text: 'Grant reviewers who evaluate budgets are experienced. They know typical salary scales, equipment prices, and indirect cost rates. A budget that contains rounded numbers, unexplained line items, or costs that do not match the proposed scope of work will raise immediate concerns — and in many cases result in an unfunded decision.' },
      { type: 'h2', text: 'Personnel Costs: The Largest Budget Category' },
      { type: 'p', text: 'Personnel typically accounts for 60-80% of most research budgets. Every personnel line item should specify: the person\'s name or title, their role in the project, the percentage of their effort (expressed as person-months for NIH applications), their annual salary, and the resulting budget amount.' },
      { type: 'p', text: 'Do not simply list "Graduate Student RA — $25,000." Instead: "Graduate Research Assistant (1.0 FTE, 12 person-months): The RA will conduct participant recruitment, data collection, and preliminary data analysis. Annual stipend of $25,000 per institutional schedule, plus 30% fringe benefits ($7,500), totalling $32,500."' },
      { type: 'h2', text: 'Equipment: Quote Before You Budget' },
      { type: 'p', text: 'Never estimate equipment costs. Obtain vendor quotes or reference GSA schedule prices before submitting. For major equipment (typically items over $5,000), most funders require formal justification that the equipment is not already available at the institution. If you are requesting a microscope, confirm in writing that no suitable instrument is available through a shared facility.' },
      { type: 'h2', text: 'Supplies and Materials: Itemise Specifically' },
      { type: 'p', text: 'Lump-sum supplies budgets ("Laboratory supplies — $10,000/year") are a red flag. Break your supplies budget into categories: reagents and consumables (with estimated quantities and unit prices), participant incentives (with calculation: 200 participants × $50 = $10,000), software licences (named, with pricing), and printing and postage (estimated by run size).' },
      { type: 'h2', text: 'Travel: Justify by Conference Name' },
      { type: 'p', text: 'Travel budgets should name the specific conferences you plan to attend, with cost breakdowns: registration fee (cite the published rate), round-trip airfare (cite estimated fare from your institution\'s city), hotel (cite the conference rate or GSA per diem), and per diem for meals. "Travel — $5,000/year" is not acceptable.' },
      { type: 'h2', text: 'Indirect Costs: Apply Your Institution\'s Rate' },
      { type: 'p', text: 'Indirect costs (facilities and administrative costs, or F&A) must be calculated at your institution\'s federally negotiated rate. Applying the wrong rate, or applying the rate to a non-MTDC base, is an error that will be caught. Check your institution\'s Office of Research for the current approved rate and its base of calculation.' },
      { type: 'h2', text: 'Common Budget Red Flags' },
      { type: 'ul', items: [
        'Round numbers in any line item (e.g., $10,000, $50,000) without supporting calculations',
        'Personnel effort that does not match the proposed scope (PI at 5% effort on a highly ambitious project)',
        'Equipment requested that should already be available at a research university',
        'No fringe benefit calculations, or rates that do not match institutional schedules',
        'Indirect costs applied to equipment, which is typically excluded from the MTDC base',
        'Budget that increases year-over-year without explanation (usually only inflation adjustments are appropriate)',
      ]},
      { type: 'callout', text: 'Peer Reject\'s Budget & Feasibility Agent performs a forensic audit of your budget narrative — flagging rounded numbers, unjustified line items, and personnel effort mismatches before a real reviewer does.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-write-research-abstract',
    title: 'How to Write a Research Abstract That Gets Your Proposal Read',
    description:
      'Your research abstract is read first and remembered longest. Learn how to write an abstract that clearly communicates your problem, approach, and expected impact to both specialists and non-specialists.',
    date: '2026-03-02',
    readTime: 7,
    tags: ['Academic Writing', 'Grant Writing', 'Research Communication'],
    excerpt:
      'Many reviewers form their initial impression of a proposal from the abstract alone. A well-written abstract is not a summary — it is a standalone argument for why your research matters and why your approach is credible.',
    content: [
      { type: 'p', text: 'The abstract is both the first thing reviewers read and the section they remember most clearly when scoring your proposal. Yet it is consistently the section that researchers write first and revise least. The result is abstracts that are technically accurate but rhetorically weak — they describe what the proposal says but fail to make the case for why it should be funded.' },
      { type: 'h2', text: 'The Four Jobs of a Grant Abstract' },
      { type: 'ol', items: [
        'State the problem clearly enough that a non-specialist can understand why it matters.',
        'Identify the specific gap in current knowledge or practice that your work will fill.',
        'Describe your approach at a level that conveys methodological credibility without technical jargon.',
        'State the expected outcome and its significance to the field or to society.',
      ]},
      { type: 'h2', text: 'Open with the Problem, Not with Background' },
      { type: 'p', text: 'Abstracts that begin with broad background statements ("Cancer is the leading cause of death globally...") waste the reviewer\'s attention before stating why your specific project matters. Begin with the specific gap or problem your project addresses. "Despite decades of research, the molecular mechanism by which X regulates Y remains unknown — a gap that limits our ability to develop targeted therapies for Z." This immediately signals that your work has a precise scientific target.' },
      { type: 'h2', text: 'State Your Hypothesis Explicitly' },
      { type: 'p', text: 'Many abstracts describe a study design without stating the central hypothesis being tested. Reviewers need to understand not just what you will do, but what you predict will happen and why. A one-sentence hypothesis statement ("We hypothesize that X reduces Y by inhibiting Z, as evidenced by our preliminary finding that...") gives reviewers a concrete scientific claim to evaluate.' },
      { type: 'h2', text: 'Describe Your Approach in One to Three Sentences' },
      { type: 'p', text: 'You do not have space in an abstract to describe your methodology in detail — that is what the methods section is for. Use one to three sentences to convey: what kind of study you are conducting, what population or system you are studying, and what data you will collect. Prioritise clarity over comprehensiveness.' },
      { type: 'h2', text: 'End with Expected Outcomes and Impact' },
      { type: 'p', text: 'The final sentences of your abstract should answer: what do you expect to find, and why does it matter? Do not be vague ("this will advance the field"). Be specific: "If our hypothesis is confirmed, this work will provide the first mechanistic evidence for X, enabling the development of Y, which affects Z million patients annually."' },
      { type: 'h2', text: 'Write the Abstract Last' },
      { type: 'p', text: 'The single most effective thing you can do to improve your abstract is to write it after you have completed the rest of the proposal. Only then do you know exactly what the proposal argues, what the strongest evidence is, and what the clearest framing of your contribution is. Writing the abstract first and then fitting the proposal to it produces documents that are internally inconsistent.' },
      { type: 'h2', text: 'Test Your Abstract on a Non-Specialist' },
      { type: 'p', text: 'Ask a colleague from a different department — ideally someone with no familiarity with your subfield — to read your abstract and explain your project back to you. If they cannot do so, the abstract is not clear enough. Grant panels typically include reviewers who are scientists but not specialists in your exact area, and your abstract must work for them.' },
      { type: 'callout', text: 'After completing a full review, Peer Reject generates a revised abstract that addresses every major weakness identified by the AI panel — giving you a template for how your abstract should read after the core issues are resolved.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 7
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'peer-review-process-explained',
    title: 'The Peer Review Process Explained: What Happens After You Submit',
    description:
      'What actually happens to your grant application after it is submitted? This guide walks through every stage of the peer review process, from initial screening to funding decision.',
    date: '2026-03-05',
    readTime: 8,
    tags: ['Peer Review', 'Research Funding', 'Academic Research'],
    excerpt:
      'The peer review process is opaque by design. Understanding what happens to your application at each stage — and what reviewers are doing — helps you write a proposal that survives every checkpoint.',
    content: [
      { type: 'p', text: 'Most researchers experience peer review only from the outside — they submit, they wait, and then they receive a decision. The process that happens between submission and decision is largely invisible. Understanding it demystifies the experience and, more practically, reveals what you can do at the proposal stage to improve your odds at each checkpoint.' },
      { type: 'h2', text: 'Stage 1: Administrative Review' },
      { type: 'p', text: 'Before your proposal reaches any scientific reviewer, it passes through an administrative screening. Staff check that the application is complete, that it meets page limits and formatting requirements, and that it falls within the scope of the funding opportunity. Applications that fail administrative review are returned without scientific evaluation — a preventable outcome.' },
      { type: 'h2', text: 'Stage 2: Assignment to a Study Section' },
      { type: 'p', text: 'For federal funders like the NIH, applications are assigned to a Scientific Review Group (SRG), commonly called a study section. The assignment is based on the scientific content of your application. Choosing the wrong study section — or failing to request an appropriate one — can mean your application is reviewed by people who do not understand your field.' },
      { type: 'h2', text: 'Stage 3: Assignment of Primary and Secondary Reviewers' },
      { type: 'p', text: 'Each application is typically assigned two or three reviewers: a primary reviewer who reads the application in full and writes a detailed critique, a secondary reviewer who provides an independent assessment, and sometimes a tertiary reviewer. These reviewers evaluate your proposal independently before the panel discussion.' },
      { type: 'h2', text: 'Stage 4: Written Reviews and Preliminary Scores' },
      { type: 'p', text: 'Assigned reviewers submit written critiques and preliminary priority scores before the panel meeting. These written reviews are the most detailed feedback you will receive. They typically address each review criterion separately — significance, approach, innovation, investigator, and environment — with specific comments and a preliminary score for each.' },
      { type: 'h2', text: 'Stage 5: Panel Discussion' },
      { type: 'p', text: 'At the panel meeting, reviewers present their assessments and the full panel discusses the application. Not all applications receive full discussion — many funding bodies use a "streamlining" or "triage" process in which applications below a certain preliminary score threshold are not discussed and receive only the written reviews. Understanding the triaging threshold for your target funder is important for realistic expectation-setting.' },
      { type: 'h2', text: 'Stage 6: Final Score and Percentile' },
      { type: 'p', text: 'After discussion, all panel members who are not in conflict vote on a final priority score. For NIH applications, this score is typically converted to a percentile that indicates where your application ranks relative to all applications reviewed in the same study section over recent cycles. Funding decisions are based on this percentile.' },
      { type: 'h2', text: 'Stage 7: Advisory Council Review and Funding Decision' },
      { type: 'p', text: 'The funding agency\'s advisory council reviews the study section\'s recommendations and approves funding decisions. The council may override study section scores in exceptional cases, but for most applications, the percentile score is determinative.' },
      { type: 'h2', text: 'What This Means for How You Write' },
      { type: 'p', text: 'Understanding that your application will be read by two or three specialist reviewers, then discussed by a panel of ten to twenty scientists, should shape how you write. Your primary reviewer must be able to advocate for your application in the panel discussion — which means they need to be able to explain your key contributions clearly and confidently. Write to make their job easy.' },
      { type: 'callout', text: 'Peer Reject simulates the written review stage of this process — generating the kind of detailed, section-by-section critique that primary reviewers produce, so you can address weaknesses before they reach the panel.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 8
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'ai-peer-review-tools-research',
    title: 'AI Peer Review Tools for Researchers: What Works in 2026',
    description:
      'AI is reshaping how researchers get feedback on grant proposals and academic papers. Here is an honest assessment of what AI peer review tools can and cannot do — and how to use them effectively.',
    date: '2026-03-08',
    readTime: 9,
    tags: ['AI Research Tools', 'Peer Review', 'Academic Technology'],
    excerpt:
      'A growing number of AI tools now claim to review research proposals and academic papers. Here is what they actually do well, where they fall short, and how to use them as a complement to human feedback.',
    content: [
      { type: 'p', text: 'AI-assisted peer review is no longer a speculative concept. Several tools now offer automated feedback on grant proposals, preprints, and journal manuscripts. The quality and usefulness of these tools varies enormously. Understanding what AI peer review does well — and where it fails — helps researchers use these tools productively rather than credulously.' },
      { type: 'h2', text: 'What AI Peer Review Tools Do Well' },
      { type: 'ul', items: [
        'Identifying structural issues: missing sections, unclear hypothesis statements, abstract-body mismatches.',
        'Flagging methodological concerns at a surface level: underpowered samples, unnamed statistical tests, missing power analyses.',
        'Catching writing quality problems: passive voice overuse, undefined jargon, inconsistent terminology.',
        'Checking budget arithmetic and flagging round numbers or unexplained line items.',
        'Identifying gaps in literature coverage by comparing reference lists against known works.',
        'Processing documents quickly — typically in seconds to minutes rather than the weeks of human review.',
      ]},
      { type: 'h2', text: 'Where AI Peer Review Has Limitations' },
      { type: 'ul', items: [
        'Genuine novelty evaluation requires up-to-date knowledge of unpublished work, conference presentations, and community norms that AI systems may not have.',
        'Ethical review — IRB adequacy, consent procedure appropriateness — requires nuanced judgment.',
        'Field-specific experimental standards (e.g., what constitutes an adequate control in a specific organism model) are areas where human domain expertise is still essential.',
        'AI systems can miss subtle logical inconsistencies that require deep reading across multiple sections simultaneously.',
      ]},
      { type: 'h2', text: 'The Role of Reasoning Models in Peer Review' },
      { type: 'p', text: 'The most significant recent development in AI peer review is the emergence of reasoning models — AI systems that produce explicit chains of thought before generating their final assessment. Unlike standard language models, reasoning models show their work: they reason through the implications of a sample size choice, trace the logic of a budget justification, or work through the implications of a stated hypothesis before rendering a verdict.' },
      { type: 'p', text: 'This transparency is important for peer review applications because it allows researchers to evaluate the AI\'s reasoning, not just its conclusions. A reviewer that says "your sample size is insufficient" is less useful than one that says "your stated effect size of d=0.3 requires N=176 per group at 80% power, but your proposed N=60 per group gives you only 47% power — meaning you have a coin-flip chance of detecting a real effect."' },
      { type: 'h2', text: 'How to Use AI Peer Review Effectively' },
      { type: 'ol', items: [
        'Use AI review early in your drafting process, not as a final polish step. AI feedback is most useful when there is still time to make substantive changes.',
        'Treat AI feedback as a first pass, not a final verdict. Use it to identify areas that need attention, then apply human judgment to determine the best fix.',
        'Compare AI feedback to your past rejection letters. If the AI flags the same issues that real reviewers previously flagged, that is a strong signal that the issue is real.',
        'Do not rely on AI review as a substitute for external human feedback from colleagues in your field.',
      ]},
      { type: 'h2', text: 'What to Look for in an AI Review Tool' },
      { type: 'p', text: 'The best AI peer review tools provide specific, evidence-based feedback (not generic suggestions), distinguish between severity levels (fatal flaws versus minor issues), show their reasoning transparently, and provide actionable recommendations rather than just problem identification. If an AI review tool gives you generic feedback that could apply to any proposal, it is not providing real value.' },
      { type: 'callout', text: 'Peer Reject uses K2 Think V2, a frontier reasoning model from MBZUAI / IFM, to generate adversarial reviews that show explicit reasoning traces — so you can see exactly why each weakness was flagged, not just that it was flagged.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 9
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'nih-grant-application-mistakes',
    title: 'NIH Grant Application: 8 Most Common Mistakes and How to Avoid Them',
    description:
      'NIH R01 success rates are below 20%. Most applications that fail make the same avoidable mistakes. This guide covers the eight most common errors — and how to fix them before submission.',
    date: '2026-03-10',
    readTime: 9,
    tags: ['NIH Grants', 'Research Funding', 'Grant Writing'],
    excerpt:
      'The NIH R01 success rate has hovered below 20% for years. But most rejected applications fail for the same handful of avoidable reasons. Here are the eight mistakes that appear most often in NIH Summary Statements — and how to address each one.',
    content: [
      { type: 'p', text: 'The NIH funds less than one in five R01 applications. The applications that succeed are not necessarily the ones with the most brilliant science — they are the ones that present strong science in a way that survives a room full of skeptical reviewers. Most rejections are preventable if you know what reviewers are looking for.' },
      { type: 'h2', text: '1. A Specific Aims Page That Does Not Make the Case' },
      { type: 'p', text: 'The Specific Aims page is the most important page in an NIH application. It must establish the significance of the problem, the gap in knowledge, your central hypothesis, your aims, and the expected impact — all within a single page. Reviewers often score an application based substantially on this page. If it does not make a compelling case, the rest of the application may not be read carefully.' },
      { type: 'h2', text: '2. Innovation Section That Describes, Not Argues' },
      { type: 'p', text: 'The Innovation section should argue that your approach is genuinely new relative to the current state of the art — not merely describe your methods. The common error is writing an Innovation section that summarises your approach without explicitly contrasting it with existing approaches and explaining why yours advances beyond them.' },
      { type: 'h2', text: '3. Approach Section That Lacks Rigor and Reproducibility Language' },
      { type: 'p', text: 'Since 2016, NIH has required explicit attention to rigor and reproducibility in grant applications. Applications that do not address these criteria — sex as a biological variable, authentication of key biological resources, consideration of relevant biological variables — are flagged in review. This language must be woven throughout your Approach section, not added as a paragraph at the end.' },
      { type: 'h2', text: '4. No Preliminary Data — Or Weak Preliminary Data' },
      { type: 'p', text: 'For R01 applications, preliminary data is effectively required. Applications without it signal that the PI is asking NIH to fund an untested hypothesis rather than a demonstrated approach. If your preliminary data is weak or indirect, reframe it carefully: describe what it establishes, acknowledge what it does not yet establish, and use it to motivate your proposed aims rather than to prove your hypothesis prematurely.' },
      { type: 'h2', text: '5. Alternative Approaches Not Addressed' },
      { type: 'p', text: 'NIH reviewers expect you to anticipate what might go wrong and describe what you will do if it does. An Approach section that presents only the ideal scenario — in which every experiment works as planned — signals inexperience. For each major aim, describe at least one alternative approach you will pursue if your primary approach encounters obstacles.' },
      { type: 'h2', text: '6. Budget Not Aligned with Scope' },
      { type: 'p', text: 'A budget that is too small for the proposed work signals that you have not thought through the execution. A budget that is too large for the scope signals padding or poor planning. Both raise concerns. Every major budget category should be directly traceable to a specific activity described in the Approach section.' },
      { type: 'h2', text: '7. Page Limit Violations or Formatting Errors' },
      { type: 'p', text: 'NIH has strict page limits and formatting requirements. Applications that violate these — through small fonts, narrow margins, or text in figures that circumvents page limits — are subject to administrative rejection before they reach any reviewer. Read the Notice of Funding Opportunity (NOFO) formatting requirements carefully and have someone else verify your application meets them before submission.' },
      { type: 'h2', text: '8. Weak Biosketches That Do Not Match the Proposed Work' },
      { type: 'p', text: 'The NIH biosketch\'s Personal Statement should connect your prior work explicitly to the proposed project. If your CV contains work relevant to your proposal that is not highlighted in the Personal Statement, reviewers may conclude you lack the necessary expertise — not because you do, but because you did not make the connection explicit.' },
      { type: 'callout', text: 'Peer Reject\'s AI agents review NIH-style proposals for all eight of these issues — delivering a formal rejection letter and severity-ranked weakness report in under two minutes. Upload your draft before it reaches the study section.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 10
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'grant-proposal-pre-submission-checklist',
    title: 'Grant Proposal Pre-Submission Checklist: 25 Things to Verify',
    description:
      'Before submitting your grant proposal, run through this 25-point checklist. It covers every section — from the abstract to the budget justification — and flags the issues reviewers catch most often.',
    date: '2026-03-12',
    readTime: 7,
    tags: ['Grant Writing', 'Research Funding', 'Checklist'],
    excerpt:
      'A pre-submission checklist is the last line of defence between your proposal and a preventable rejection. This 25-point checklist covers scientific rigour, budget integrity, writing quality, and administrative compliance.',
    content: [
      { type: 'p', text: 'Even experienced researchers submit proposals with avoidable errors. A systematic pre-submission checklist is not a sign of inexperience — it is the habit of researchers who consistently win funding. Work through this checklist in the 48 hours before you submit, ideally with a fresh set of eyes from a colleague.' },
      { type: 'h2', text: 'Abstract and Specific Aims' },
      { type: 'ul', items: [
        'The abstract states the specific problem, not just a general research area.',
        'The central hypothesis is explicitly stated and falsifiable.',
        'Expected outcomes and their significance are clearly described.',
        'The abstract is consistent with the body of the proposal (no contradictions).',
        'The Specific Aims page makes a compelling case within one page.',
      ]},
      { type: 'h2', text: 'Scientific Merit and Innovation' },
      { type: 'ul', items: [
        'Your novelty claims are narrow, defensible, and contrasted explicitly with prior work.',
        'All major prior works in your specific area are cited and engaged with.',
        'No prior publication contradicts your novelty claim (search carefully).',
        'The gap in knowledge your work fills is stated explicitly, not implied.',
      ]},
      { type: 'h2', text: 'Methodology and Rigour' },
      { type: 'ul', items: [
        'A formal power analysis is included, with effect size source cited.',
        'All statistical tests are named and justified.',
        'Potential limitations are acknowledged, with mitigation strategies described.',
        'Alternative approaches are described for each major aim.',
        'Sex as a biological variable is addressed (for NIH applications).',
        'Data management and quality control procedures are described.',
        'The timeline is realistic and maps milestones to specific personnel.',
      ]},
      { type: 'h2', text: 'Budget' },
      { type: 'ul', items: [
        'Every line item has a specific calculation, not a rounded estimate.',
        'Personnel effort (person-months) is appropriate for the proposed scope.',
        'Equipment requests confirm non-availability through institutional shared facilities.',
        'Indirect costs are calculated at the correct federally negotiated rate.',
        'Budget totals are consistent across all budget forms.',
      ]},
      { type: 'h2', text: 'Writing and Formatting' },
      { type: 'ul', items: [
        'The proposal meets all page limits specified in the NOFO.',
        'Font size and margins meet requirements (not reduced to fit more text).',
        'All abbreviations are defined on first use.',
        'No section contradicts another section of the same proposal.',
      ]},
      { type: 'h2', text: 'Final Step: Adversarial Self-Review' },
      { type: 'p', text: 'After completing this checklist, read your proposal one more time with a single question in mind: what would a hostile reviewer do with this? For every claim, ask whether you have provided sufficient evidence. For every budget line, ask whether you can defend it in a rebuttal. For every methodological choice, ask whether you have addressed the obvious alternative.' },
      { type: 'callout', text: 'Peer Reject automates the adversarial self-review step — running your proposal through parallel AI agents who evaluate methodology, budget, novelty, and domain accuracy independently, returning a severity-ranked weakness report before you submit.' },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
