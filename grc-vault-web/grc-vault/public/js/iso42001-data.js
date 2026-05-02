// ═══════════════════════════════════════════════════════════════════════════
// ISO/IEC 42001:2023 — Artificial Intelligence Management System (AIMS)
// Source: ISO/IEC 42001:2023 Annex A — 38 reference controls in 9 control sets
// Reference: https://www.iso.org/standard/81230.html
// Maturity scale: Tier 1 Initial / 2 Defined / 3 Managed / 4 Optimized
// ═══════════════════════════════════════════════════════════════════════════
const ISO_42001 = {
  ref: "https://www.iso.org/standard/81230.html",
  groups: [
    {
      id: "A.2",
      name: "Policies related to AI",
      color: "#8b5cf6",
      desc: "Provide management direction and support for AI systems through policies aligned with organizational objectives and obligations",
      controls: [
        { id: "A.2.2", name: "AI policy",
          desc: "The organization shall document and approve an AI policy that sets out its approach to developing, providing, or using AI systems",
          questions: [
            "Is there a board- or executive-approved AI policy that defines the organization's approach to AI development, provisioning, and use?",
            "Does the policy address responsibilities, intended use, prohibited uses, and acceptable risk thresholds?",
            "Is the AI policy communicated to all relevant personnel, suppliers, and stakeholders?"
          ]},
        { id: "A.2.3", name: "Alignment with other organizational policies",
          desc: "The AI policy shall be aligned with other organizational policies (e.g., data protection, information security, quality, safety) and its interaction with them documented",
          questions: [
            "Are interactions between the AI policy and adjacent policies (security, privacy, quality, safety) explicitly documented?",
            "Are conflicting or overlapping requirements between policies resolved through a defined precedence or reconciliation process?",
            "Is the AI policy part of an integrated policy framework rather than a standalone document?"
          ]},
        { id: "A.2.4", name: "Review of the AI policy",
          desc: "The AI policy shall be reviewed at planned intervals or when significant changes occur to ensure its continuing suitability, adequacy, and effectiveness",
          questions: [
            "Is there a defined review cadence (e.g., annual) for the AI policy?",
            "Are policy reviews triggered by significant changes (regulation, technology, incidents, business model)?",
            "Are review outcomes recorded with rationale, approver, and effective date?"
          ]}
      ]
    },
    {
      id: "A.3",
      name: "Internal organization",
      color: "#3b82f6",
      desc: "Establish accountability for AI within the organization through defined roles, responsibilities, and reporting channels",
      controls: [
        { id: "A.3.2", name: "AI roles and responsibilities",
          desc: "Roles and responsibilities for the AI management system shall be defined and allocated according to the organization's needs",
          questions: [
            "Are AI management system roles formally documented (e.g., AI program owner, AI risk owner, model owners, data stewards)?",
            "Is a RACI or equivalent published for AI lifecycle activities including development, deployment, monitoring, and decommissioning?",
            "Have role holders formally accepted their AI responsibilities (signed acknowledgment, charter, or attestation)?"
          ]},
        { id: "A.3.3", name: "Reporting of concerns",
          desc: "Mechanisms shall be established for any person to report concerns about the organization's AI systems in a timely and appropriate manner",
          questions: [
            "Is there an accessible, well-publicized channel for staff and external parties to raise AI concerns (anonymous option included)?",
            "Are reported concerns triaged, investigated, and tracked to closure with non-retaliation protections?",
            "Are themes from reported concerns reviewed by leadership and reflected in policy or design changes?"
          ]}
      ]
    },
    {
      id: "A.4",
      name: "Resources for AI systems",
      color: "#10b981",
      desc: "Identify, document, and manage the resources (data, tooling, compute, people) required to develop and operate AI systems",
      controls: [
        { id: "A.4.2", name: "Resource documentation",
          desc: "Documentation shall identify the resources needed for the AI management system and the AI system life cycle activities",
          questions: [
            "Is there a maintained inventory of resources (data, tooling, infrastructure, people) required by the AI management system?",
            "Are resource needs mapped to specific lifecycle activities (design, training, validation, deployment, monitoring)?",
            "Is the resource documentation reviewed and updated when new AI systems or technologies are introduced?"
          ]},
        { id: "A.4.3", name: "Data resources",
          desc: "The organization shall document the data resources (including origin, nature, and intended purpose) used for AI systems",
          questions: [
            "Is each AI system's training, validation, and operational data inventoried with origin, lawful basis, and intended purpose?",
            "Are sensitive or regulated data classes flagged with handling requirements (PII, PHI, IP, export-controlled)?",
            "Is data lineage maintained from acquisition through model output?"
          ]},
        { id: "A.4.4", name: "Tooling resources",
          desc: "The organization shall document tooling resources (development, operation, monitoring) used for AI systems",
          questions: [
            "Are development, MLOps, and monitoring tools inventoried and approved per AI system?",
            "Are open-source models and libraries tracked with license, version, and known-vulnerability status?",
            "Are tool changes managed under configuration control with reproducibility safeguards?"
          ]},
        { id: "A.4.5", name: "System and computing resources",
          desc: "The organization shall document system and computing resources (hardware, networking, cloud) used for AI systems",
          questions: [
            "Are compute, storage, and network resources for each AI system identified and capacity-planned?",
            "Are environmental and energy considerations (e.g., GPU usage, sustainability targets) tracked?",
            "Are resilience requirements (HA, DR, failover) defined commensurate with AI system criticality?"
          ]},
        { id: "A.4.6", name: "Human resources",
          desc: "The organization shall document the human resources and their competencies needed for the AI system life cycle activities",
          questions: [
            "Are required competencies for AI roles defined (data science, AI ethics, security, domain expertise)?",
            "Is competency assessed at hire, periodically, and on role change?",
            "Are training and skill-development plans in place to close identified gaps?"
          ]}
      ]
    },
    {
      id: "A.5",
      name: "Assessing impacts of AI systems",
      color: "#f59e0b",
      desc: "Assess and document potential impacts of AI systems on individuals, groups, and society throughout the lifecycle",
      controls: [
        { id: "A.5.2", name: "AI system impact assessment process",
          desc: "The organization shall establish a process to assess the potential consequences of AI systems on individuals, groups, and society",
          questions: [
            "Is there a documented AI impact assessment (AIA) procedure with criteria, methodology, and approval gates?",
            "Are AIAs required before development, before deployment, and on material change?",
            "Are AIA outcomes used to drive design, deployment, and risk-mitigation decisions?"
          ]},
        { id: "A.5.3", name: "Documentation of AI system impact assessments",
          desc: "Results of impact assessments shall be documented, retained, and maintained",
          questions: [
            "Are AIA results recorded in a central repository with version history and approval signatures?",
            "Are AIA records retained per regulatory and contractual requirements?",
            "Are AIA records linked to the relevant AI system entries in the inventory?"
          ]},
        { id: "A.5.4", name: "Assessing AI system impact on individuals or groups of individuals",
          desc: "Impact assessments shall consider effects on individuals and groups, including potential discriminatory outcomes, privacy impacts, and rights impacts",
          questions: [
            "Do AIAs explicitly evaluate fairness, bias, and discrimination across protected attributes?",
            "Are privacy and human-rights impacts (autonomy, due process, freedom of expression) assessed?",
            "Are affected individuals or representative groups consulted where appropriate?"
          ]},
        { id: "A.5.5", name: "Assessing societal impacts of AI systems",
          desc: "Impact assessments shall consider effects on society, including environmental, economic, and cultural dimensions",
          questions: [
            "Do AIAs cover environmental impact (energy, emissions), labor/economic disruption, and cultural impacts?",
            "Are second-order and systemic risks (misinformation, market concentration) considered?",
            "Are societal-impact findings escalated to leadership and reflected in deployment decisions?"
          ]}
      ]
    },
    {
      id: "A.6",
      name: "AI system life cycle",
      color: "#06b6d4",
      desc: "Manage AI systems through a documented life cycle covering objectives, design, development, verification, deployment, operation, and decommissioning",
      controls: [
        { id: "A.6.1.2", name: "Objectives for responsible development of AI systems",
          desc: "The organization shall define and document objectives for the responsible development of AI systems",
          questions: [
            "Are responsible-development objectives (fairness, robustness, safety, transparency, privacy) documented per AI system?",
            "Are objectives translated into measurable acceptance criteria?",
            "Are objectives reviewed against trustworthy-AI principles and updated over time?"
          ]},
        { id: "A.6.1.3", name: "Processes for responsible design and development of AI systems",
          desc: "Processes shall be defined for the responsible design and development of AI systems throughout the life cycle",
          questions: [
            "Are responsible AI activities embedded in the SDLC (threat modeling, fairness review, model cards)?",
            "Are stage gates with go/no-go criteria enforced before progression?",
            "Are exceptions to the responsible-development process logged and approved?"
          ]},
        { id: "A.6.2.2", name: "AI system requirements and specification",
          desc: "Requirements and specifications for AI systems shall be documented, including performance, robustness, explainability, and safety requirements",
          questions: [
            "Are functional, performance, robustness, explainability, and safety requirements specified for each AI system?",
            "Are requirements traceable from stakeholder needs through verification?",
            "Are requirements reviewed and re-baselined when context or risk changes?"
          ]},
        { id: "A.6.2.3", name: "Documentation of AI system design and development",
          desc: "Design and development activities, assumptions, and decisions shall be documented",
          questions: [
            "Are design decisions, assumptions, and trade-offs captured (e.g., model cards, datasheets, ADRs)?",
            "Are training procedures, hyperparameters, and data splits reproducible from documentation?",
            "Is documentation reviewed and version-controlled alongside code and models?"
          ]},
        { id: "A.6.2.4", name: "AI system verification and validation",
          desc: "Verification and validation measures shall be defined, performed, and documented to demonstrate the AI system meets its requirements",
          questions: [
            "Are V&V plans defined per AI system covering performance, robustness, fairness, security, and safety?",
            "Are V&V results documented, reviewed, and used as deployment-gate evidence?",
            "Are red-teaming or adversarial tests performed for systems with material risk?"
          ]},
        { id: "A.6.2.5", name: "AI system deployment",
          desc: "Deployment of AI systems shall follow a documented plan addressing readiness criteria, user information, operational environment, and rollback",
          questions: [
            "Is a deployment plan in place covering readiness criteria, rollout strategy, user communications, and rollback?",
            "Is production access controlled with separation of duties between development and operations?",
            "Are deployment records retained for traceability and audit?"
          ]},
        { id: "A.6.2.6", name: "AI system operation and monitoring",
          desc: "Operational and monitoring elements shall be defined and implemented to ensure AI systems function as intended over time",
          questions: [
            "Are runtime metrics monitored (accuracy, drift, latency, fairness, abuse signals) with defined thresholds?",
            "Are alerts wired into incident-response workflows?",
            "Are scheduled reviews held to revalidate model performance against baselines?"
          ]},
        { id: "A.6.2.7", name: "AI system technical documentation",
          desc: "Technical documentation shall be prepared and maintained to provide necessary information to interested parties about the AI system",
          questions: [
            "Is technical documentation maintained per AI system (purpose, capabilities, limitations, training data summary, performance)?",
            "Is documentation appropriate for each audience (regulators, deployers, end users)?",
            "Is documentation kept synchronized with the deployed system version?"
          ]},
        { id: "A.6.2.8", name: "AI system event log",
          desc: "Events relevant to the AI system's operation shall be logged, retained, and analyzed",
          questions: [
            "Are inputs, outputs, decisions, and operational events logged sufficient for audit and incident investigation?",
            "Are logs retained per legal, contractual, and forensic requirements with integrity protection?",
            "Are logs analyzed for anomalies, abuse, and continuous-improvement signals?"
          ]}
      ]
    },
    {
      id: "A.7",
      name: "Data for AI systems",
      color: "#ef4444",
      desc: "Manage data quality, provenance, and preparation across the AI lifecycle to ensure trustworthy outcomes",
      controls: [
        { id: "A.7.2", name: "Data for development and enhancement of AI system",
          desc: "Data used for development, training, and enhancement of the AI system shall be defined, documented, and managed",
          questions: [
            "Are training, validation, and test datasets defined and approved per AI system?",
            "Are dataset versions controlled and linked to the model versions trained on them?",
            "Are dataset access rights managed under least privilege?"
          ]},
        { id: "A.7.3", name: "Acquisition of data",
          desc: "Processes for acquiring data shall ensure data is obtained from appropriate sources with proper authorization and legal basis",
          questions: [
            "Is data acquired only from approved sources with documented lawful basis (consent, contract, legitimate interest, license)?",
            "Are third-party data licenses tracked, including any restrictions on AI/ML use?",
            "Is web-scraped or synthetically generated data evaluated for legal and ethical risks?"
          ]},
        { id: "A.7.4", name: "Quality of data for AI systems",
          desc: "The organization shall define and maintain quality requirements for data used by AI systems (completeness, accuracy, representativeness)",
          questions: [
            "Are data-quality dimensions (completeness, accuracy, timeliness, representativeness, balance) defined and measured?",
            "Are quality issues quantified, remediated, and reported?",
            "Is dataset representativeness assessed against the deployment population?"
          ]},
        { id: "A.7.5", name: "Data provenance",
          desc: "The provenance of data used by AI systems shall be recorded, including origin, collection method, and transformations applied",
          questions: [
            "Is provenance metadata captured for each dataset (source, collection date, method, jurisdiction)?",
            "Are all transformations (cleansing, labeling, augmentation) logged with versioned scripts?",
            "Is provenance data discoverable via the AI system inventory?"
          ]},
        { id: "A.7.6", name: "Data preparation",
          desc: "Methods and criteria for preparing data for use in AI systems (cleansing, labeling, transformation) shall be defined and applied",
          questions: [
            "Are data-preparation procedures documented and reproducible?",
            "Are labeling protocols defined including reviewer qualifications, inter-annotator agreement, and dispute resolution?",
            "Are preparation steps validated to ensure they do not introduce bias or leakage?"
          ]}
      ]
    },
    {
      id: "A.8",
      name: "Information for interested parties of AI systems",
      color: "#a855f7",
      desc: "Provide users, regulators, and affected parties with accurate, timely information about AI systems",
      controls: [
        { id: "A.8.2", name: "System documentation and information for users",
          desc: "System documentation shall enable users to understand and use the AI system appropriately (purpose, capabilities, limitations, intended use)",
          questions: [
            "Is user-facing documentation provided that clearly states purpose, capabilities, limitations, and intended use?",
            "Are warnings about misuse, edge cases, and uncertainty included where appropriate?",
            "Is user documentation available in accessible formats and languages?"
          ]},
        { id: "A.8.3", name: "External reporting",
          desc: "Mechanisms shall be provided for external interested parties to report matters related to AI systems",
          questions: [
            "Is there a public, easily discoverable channel for external parties to report AI concerns or harms?",
            "Are externally reported issues triaged with defined response SLAs?",
            "Are external reports tracked, trended, and disclosed where appropriate?"
          ]},
        { id: "A.8.4", name: "Communication of incidents",
          desc: "AI system incidents shall be communicated to relevant interested parties according to defined criteria and timelines",
          questions: [
            "Are AI incident notification criteria, recipients, and timelines defined (regulator, customers, affected individuals)?",
            "Are incident communications coordinated with legal, compliance, and communications functions?",
            "Are post-incident communications reviewed for accuracy, transparency, and remedial action?"
          ]},
        { id: "A.8.5", name: "Information for interested parties",
          desc: "Information shall be made available to interested parties about the AI systems' purposes, capabilities, and limitations",
          questions: [
            "Is information about AI systems made available proportionate to stakeholder needs (transparency reports, model cards, FAQs)?",
            "Is information accurate, current, and free of misleading claims?",
            "Are mechanisms in place to keep interested parties informed of material changes?"
          ]}
      ]
    },
    {
      id: "A.9",
      name: "Use of AI systems",
      color: "#f97316",
      desc: "Govern responsible use of AI systems including objectives, intended use, and deviations",
      controls: [
        { id: "A.9.2", name: "Processes for responsible use of AI systems",
          desc: "Processes shall be established for the responsible use of AI systems",
          questions: [
            "Are user-facing processes defined for responsible use (acceptable-use policy, oversight, override, escalation)?",
            "Are operators trained on responsible-use procedures before being granted access?",
            "Are responsible-use practices reinforced through monitoring and periodic refresher training?"
          ]},
        { id: "A.9.3", name: "Objectives for responsible use of AI system",
          desc: "Objectives for the responsible use of AI systems shall be defined and documented",
          questions: [
            "Are responsible-use objectives documented (human oversight, accountability, fairness in deployment)?",
            "Are objectives translated into measurable indicators?",
            "Are deployment decisions tested against responsible-use objectives?"
          ]},
        { id: "A.9.4", name: "Intended use of the AI system",
          desc: "The intended use of the AI system shall be defined, communicated, and controlled; deviations from intended use shall be assessed",
          questions: [
            "Is the intended use of each AI system clearly defined and communicated to operators and users?",
            "Are technical or contractual controls in place to prevent or detect out-of-scope use?",
            "Are deviations from intended use formally assessed and approved or remediated?"
          ]}
      ]
    },
    {
      id: "A.10",
      name: "Third-party and customer relationships",
      color: "#14b8a6",
      desc: "Manage AI-related responsibilities, requirements, and expectations across the supply and value chain",
      controls: [
        { id: "A.10.2", name: "Allocating responsibilities",
          desc: "Responsibilities between the organization, its partners, suppliers, customers, and third parties shall be defined for the AI system life cycle",
          questions: [
            "Is a responsibility allocation matrix maintained for each AI system covering provider, deployer, and operator roles?",
            "Are shared-responsibility boundaries reflected in contracts, SLAs, and operating runbooks?",
            "Are responsibility allocations reviewed when relationships or system architectures change?"
          ]},
        { id: "A.10.3", name: "Suppliers",
          desc: "Processes shall ensure that the organization's AI-related requirements are considered in the relationship with suppliers",
          questions: [
            "Are AI-related requirements (transparency, security, bias testing, incident reporting) included in supplier contracts?",
            "Are suppliers assessed for AI risk before onboarding and periodically thereafter?",
            "Are supplier AI incidents and changes integrated into the organization's risk and incident processes?"
          ]},
        { id: "A.10.4", name: "Customers",
          desc: "Processes shall ensure that customer AI-related expectations and requirements are identified, agreed, and addressed",
          questions: [
            "Are customer AI requirements and expectations elicited, documented, and agreed?",
            "Are customer obligations regarding intended use, oversight, and reporting communicated and reinforced?",
            "Is customer feedback on AI performance and concerns captured and used to drive improvement?"
          ]}
      ]
    }
  ]
};
