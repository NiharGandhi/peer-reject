// A deliberately flawed research proposal for demo purposes.
// Flaws: vague methodology, no sample sizes or controls, inflated budget with round numbers, weak novelty (ignores major prior work).
export const SAMPLE_PROPOSAL = `
GRANT PROPOSAL

Title: Deep Learning Approaches for Early Detection of Neurodegenerative Diseases Using Multi-Modal Biomarker Analysis

Principal Investigator: Dr. Marcus Webb, Department of Computer Science
Requested Amount: $1,850,000 over 3 years
Submitted to: National Institute of Health Research

---

ABSTRACT

Neurodegenerative diseases such as Alzheimer's and Parkinson's affect millions worldwide and impose enormous burdens on healthcare systems. Current diagnostic methods detect disease only after significant neuronal loss has occurred, limiting treatment options. This project proposes a novel deep learning framework that analyzes multiple biomarker modalities—including MRI scans, blood plasma samples, and cognitive assessments—to detect early indicators of neurodegeneration before clinical symptoms appear. Our approach is novel because, to the best of our knowledge, no existing system combines all three data modalities using deep learning for this purpose. The expected outcome is a diagnostic tool with high accuracy that can be deployed in clinical settings.

---

INTRODUCTION AND BACKGROUND

Alzheimer's disease (AD) and related dementias represent one of the most pressing healthcare challenges of the 21st century. Existing biomarker studies have shown correlations between imaging features and disease progression. Deep learning has shown promise in medical imaging tasks. We believe that combining data from multiple sources will yield better results than single-modality approaches.

---

RESEARCH OBJECTIVES

1. Develop a multi-modal deep learning model for early neurodegenerative disease detection
2. Achieve high diagnostic accuracy
3. Create a clinically deployable tool
4. Publish results in top-tier venues

---

METHODOLOGY

We will collect patient data from hospital partners and public datasets. The data will be preprocessed and fed into a deep learning model. We will use transformer-based architectures because transformers have shown strong performance across many domains. The model will be trained on the collected data and evaluated on held-out test sets.

For the MRI component, we will extract relevant features using convolutional layers. For blood biomarkers, we will use a fully connected network. For cognitive assessments, we will use a recurrent component. These three components will be fused at a late fusion stage.

We will iterate on the model architecture until we achieve satisfactory performance. Results will be validated by clinical collaborators.

---

TIMELINE

Year 1: Data collection and preprocessing; initial model development
Year 2: Model refinement and optimization
Year 3: Clinical validation and dissemination

---

BUDGET JUSTIFICATION

Personnel:
- Principal Investigator (25% effort): $150,000
- 3 PhD Research Assistants (full time): $450,000
- 1 Postdoctoral Researcher: $250,000
- Hospital Clinical Coordinator: $100,000
Subtotal Personnel: $950,000

Equipment and Computing:
- High-performance GPU cluster: $400,000
- Data storage infrastructure: $150,000
- Workstations (x5): $50,000
Subtotal Equipment: $600,000

Travel and Dissemination:
- Conference travel (3 years): $75,000
- Open access publication fees: $25,000
Subtotal Travel: $100,000

Indirect Costs (21%): $200,000

TOTAL: $1,850,000

---

EXPECTED OUTCOMES AND IMPACT

This research will produce a state-of-the-art diagnostic tool that detects neurodegenerative diseases earlier than current methods, allowing for more effective intervention. The deep learning framework will be generalizable to other diseases. We expect to publish at least 5 papers in top venues and file 1–2 patents. The tool could be commercialized to benefit the healthcare system.

---

TEAM QUALIFICATIONS

Dr. Marcus Webb has 8 years of experience in machine learning research and has published in several venues. The research team includes experienced PhD students. We have access to hospital data through an existing MOU.
`.trim();
