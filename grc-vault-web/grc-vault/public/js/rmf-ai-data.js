// ═══════════════════════════════════════════════════════════════════════════
// NIST AI RMF 1.0 — Artificial Intelligence Risk Management Framework
// Source: NIST AI 100-1 (January 2023) and the AI RMF Playbook
// Functions: Govern, Map, Measure, Manage
// ═══════════════════════════════════════════════════════════════════════════
const RMF_AI = {
  ref: "https://www.nist.gov/itl/ai-risk-management-framework",
  functions: [
    // =========================================================================
    // GOVERN (GV)
    // =========================================================================
    {
      id: "GV",
      name: "Govern",
      color: "#8b5cf6",
      desc: "A culture of risk management is cultivated and present — policies, processes, procedures, and practices for managing AI risks are in place, transparent, and implemented effectively",
      categories: [
        {
          id: "GV-1",
          name: "Policies, Processes, Procedures, Practices",
          subcategories: [
            { id: "GV-1.1", name: "Legal and regulatory requirements involving AI are understood, managed, and documented",
              questions: [
                "Is there a current register of legal, regulatory, and contractual obligations that apply to AI systems (e.g., EU AI Act, NYC AEDT, sectoral rules)?",
                "Are obligations mapped to specific AI systems, controls, and accountable owners?",
                "Is there a formal process to monitor changes to AI law and regulation and update the register?"
              ]},
            { id: "GV-1.2", name: "The characteristics of trustworthy AI are integrated into organizational policies, processes, procedures, and practices",
              questions: [
                "Do organizational AI policies explicitly reference NIST trustworthy AI characteristics (valid & reliable, safe, secure & resilient, accountable & transparent, explainable & interpretable, privacy-enhanced, fair with harmful bias managed)?",
                "Are these characteristics translated into measurable requirements within development, procurement, and deployment processes?",
                "Are policies reviewed against new AI capabilities and threats on a defined cadence?"
              ]},
            { id: "GV-1.3", name: "Processes, procedures, and practices are in place to determine the needed level of risk management activities based on the organization's risk tolerance",
              questions: [
                "Is there a tiered or risk-based approach that scales AI risk activities to system criticality and potential harm?",
                "Are tiering criteria documented (e.g., autonomy level, data sensitivity, populations affected, reversibility of harm)?",
                "Are tiering decisions reviewed by an appropriate governance body and revisited as systems evolve?"
              ]},
            { id: "GV-1.4", name: "The risk management process and its outcomes are established through transparent policies, procedures, and other controls based on organizational risk priorities",
              questions: [
                "Are AI risk management roles, decision rights, and approval gates documented and visible to staff?",
                "Are go/no-go criteria for AI deployment formally captured and consistently applied?",
                "Are exceptions and accepted residual risks logged with executive sign-off?"
              ]},
            { id: "GV-1.5", name: "Ongoing monitoring and periodic review of the risk management process and its outcomes are planned and organizational roles and responsibilities are clearly defined",
              questions: [
                "Is a review cadence (e.g., quarterly, annual) defined for the AI risk program?",
                "Are KPIs/KRIs defined to measure program effectiveness over time?",
                "Are review outcomes reported to executive leadership and the board?"
              ]},
            { id: "GV-1.6", name: "Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities",
              questions: [
                "Is there a maintained inventory of AI systems, models, datasets, and dependencies (including third-party and embedded AI)?",
                "Are inventory attributes (purpose, owner, data sources, risk tier, deployment status) captured for each system?",
                "Is the inventory integrated with change management so new or modified AI systems are added in real time?"
              ]},
            { id: "GV-1.7", name: "Processes and procedures are in place for decommissioning and phasing out AI systems safely and in a manner that does not increase risks or decrease the organization's trustworthiness",
              questions: [
                "Is there a documented AI system retirement procedure covering data, model, and downstream dependency disposition?",
                "Are users and affected stakeholders notified of decommissioning and given migration paths where applicable?",
                "Are post-decommissioning records (data, model artifacts, audit logs) retained per policy and legal hold requirements?"
              ]}
          ]
        },
        {
          id: "GV-2",
          name: "Accountability Structures",
          subcategories: [
            { id: "GV-2.1", name: "Roles and responsibilities and lines of communication related to mapping, measuring, and managing AI risks are documented and are clear to individuals and teams throughout the organization",
              questions: [
                "Is a RACI (or equivalent) defined for AI risk activities across business, data science, security, privacy, legal, and audit functions?",
                "Are escalation paths to executive leadership and the board documented?",
                "Do AI actors confirm understanding of their responsibilities (e.g., signed acknowledgments, role-based attestations)?"
              ]},
            { id: "GV-2.2", name: "The organization's personnel and partners receive AI risk management training to enable them to perform their duties and responsibilities consistent with related policies, procedures, and agreements",
              questions: [
                "Is role-based AI risk training delivered to developers, product owners, executives, and frontline operators?",
                "Is training updated to reflect new risks (e.g., generative AI, model drift, adversarial attacks)?",
                "Is training completion tracked and required prior to AI system access or deployment authority?"
              ]},
            { id: "GV-2.3", name: "Executive leadership of the organization takes responsibility for decisions about risks associated with AI system development and deployment",
              questions: [
                "Is there a named executive accountable for the AI risk program (e.g., Chief AI Officer, CRO, CISO)?",
                "Are material AI risk decisions reviewed and approved at the executive or board level?",
                "Is executive accountability formally documented in charters, policies, or board minutes?"
              ]}
          ]
        },
        {
          id: "GV-3",
          name: "Workforce Diversity, Equity, Inclusion & Accessibility",
          subcategories: [
            { id: "GV-3.1", name: "Decision-making related to mapping, measuring, and managing AI risks throughout the lifecycle is informed by a diverse team",
              questions: [
                "Are AI risk reviews staffed with cross-functional and demographically diverse perspectives?",
                "Are diverse stakeholder voices (including affected communities) sought during risk assessments?",
                "Are diversity gaps in AI teams identified and remediated through hiring or partnerships?"
              ]},
            { id: "GV-3.2", name: "Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems",
              questions: [
                "Are human-in-the-loop, human-on-the-loop, and human-out-of-the-loop modes documented per AI system?",
                "Are operator competency requirements defined for each oversight model?",
                "Are override and escalation procedures available and tested for human reviewers?"
              ]}
          ]
        },
        {
          id: "GV-4",
          name: "Safety, Critical Thinking & Incident Reporting Culture",
          subcategories: [
            { id: "GV-4.1", name: "Organizational practices are in place to foster a critical thinking and safety-first mindset in the design, development, deployment, and uses of AI systems to minimize potential negative impacts",
              questions: [
                "Are 'red team' or adversarial review practices used during AI development?",
                "Are staff empowered (and rewarded) to raise concerns about AI safety and ethics without retaliation?",
                "Are 'lessons learned' from AI near-misses captured and shared organization-wide?"
              ]},
            { id: "GV-4.2", name: "Organizational teams document the risks and potential impacts of the AI technology they design, develop, deploy, evaluate, and use, and they communicate about the impacts more broadly",
              questions: [
                "Are AI risk and impact assessments documented prior to deployment for each system?",
                "Are model/system cards or fact sheets produced and shared with stakeholders?",
                "Are residual risks and mitigations transparently communicated to users and affected parties?"
              ]},
            { id: "GV-4.3", name: "Organizational practices are in place to enable AI testing, identification of incidents, and information sharing",
              questions: [
                "Is there an AI-specific incident response process distinct from (but integrated with) cybersecurity IR?",
                "Are AI incidents reported to internal stakeholders, regulators, and external repositories where applicable (e.g., AVID, AI Incident Database)?",
                "Are post-incident reviews used to update risk controls and training?"
              ]}
          ]
        },
        {
          id: "GV-5",
          name: "Engagement With AI Actors",
          subcategories: [
            { id: "GV-5.1", name: "Organizational policies and practices are in place to collect, consider, prioritize, and integrate feedback from those external to the team that developed or deployed the AI system regarding the potential individual and societal impacts related to AI risks",
              questions: [
                "Are formal channels established to receive feedback from end users, affected communities, and civil society?",
                "Is feedback systematically reviewed, prioritized, and acted upon?",
                "Are feedback responses communicated back to submitters?"
              ]},
            { id: "GV-5.2", name: "Mechanisms are established to enable AI actors to regularly incorporate adjudicated feedback from relevant AI actors into system design and implementation",
              questions: [
                "Is feedback incorporated into product backlogs and prioritized against risk?",
                "Are adjudication decisions (accept/reject/defer) documented and auditable?",
                "Are users notified when their feedback drives a material change?"
              ]}
          ]
        },
        {
          id: "GV-6",
          name: "Third-Party Software, Data, and Models",
          subcategories: [
            { id: "GV-6.1", name: "Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third-party's intellectual property or other rights",
              questions: [
                "Are third-party AI components (models, datasets, APIs) reviewed for licensing, IP, and provenance prior to use?",
                "Are due diligence requirements proportionate to risk tier?",
                "Are contracts updated to allocate AI-specific liability, indemnity, and audit rights?"
              ]},
            { id: "GV-6.2", name: "Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk",
              questions: [
                "Are fallback procedures documented for the loss or compromise of critical third-party AI services?",
                "Are SLAs and breach-notification clauses in place with third-party AI providers?",
                "Are contingency plans tested at least annually?"
              ]}
          ]
        }
      ]
    },

    // =========================================================================
    // MAP (MP)
    // =========================================================================
    {
      id: "MP",
      name: "Map",
      color: "#3b82f6",
      desc: "Context is recognized and risks related to context are identified — the framing of the AI system's purpose, capabilities, deployment setting, and affected stakeholders is established",
      categories: [
        {
          id: "MP-1",
          name: "Context is Established and Understood",
          subcategories: [
            { id: "MP-1.1", name: "Intended purposes, potentially beneficial uses, context-specific laws, norms and expectations, and prospective settings in which the AI system will be deployed are understood and documented",
              questions: [
                "Is the intended purpose of the AI system explicitly written and approved?",
                "Are out-of-scope uses and prohibited uses formally documented?",
                "Are context-specific norms (cultural, sectoral, legal) catalogued for each deployment setting?"
              ]},
            { id: "MP-1.2", name: "Interdisciplinary AI actors, competencies, skills, and capacities for establishing context reflect demographic diversity and broad domain and user experience expertise, and their participation is documented",
              questions: [
                "Are subject-matter experts from affected domains involved in framing the AI system?",
                "Is participation of diverse perspectives (lived experience, demographic, disciplinary) documented?",
                "Are skill or capacity gaps remediated before deployment?"
              ]},
            { id: "MP-1.3", name: "The organization's mission and relevant goals for AI technology are understood and documented",
              questions: [
                "Is the AI system's contribution to organizational mission articulated?",
                "Are alignment criteria reviewed by leadership prior to development?",
                "Are misalignments identified and remediated or escalated?"
              ]},
            { id: "MP-1.4", name: "The business value or context of business use has been clearly defined or — in the case of assessing existing AI systems — re-evaluated",
              questions: [
                "Is a business case (value, cost, risk, alternatives) documented for each AI system?",
                "Are existing AI systems re-evaluated periodically against current business needs?",
                "Are systems lacking value identified for retirement or repurposing?"
              ]},
            { id: "MP-1.5", name: "Organizational risk tolerances are determined and documented",
              questions: [
                "Are AI-specific risk tolerances defined (e.g., acceptable false-positive rates, fairness thresholds, allowed autonomy)?",
                "Are tolerances approved by appropriate governance authority?",
                "Are tolerances communicated to AI development and operations teams?"
              ]},
            { id: "MP-1.6", name: "System requirements (e.g., 'the system shall respect the privacy of its users') are elicited from and understood by relevant AI actors",
              questions: [
                "Are functional and non-functional (privacy, security, fairness, explainability) requirements captured for each AI system?",
                "Are requirements traced through design, build, and test phases?",
                "Are requirements verified by stakeholders prior to release?"
              ]}
          ]
        },
        {
          id: "MP-2",
          name: "Categorization of the AI System",
          subcategories: [
            { id: "MP-2.1", name: "The specific tasks and methods used to implement the tasks that the AI system will support are defined (e.g., classifiers, generative models, recommenders)",
              questions: [
                "Is the AI task type and underlying ML/AI method documented?",
                "Are model architectures, key hyperparameters, and training paradigms recorded?",
                "Are alternatives evaluated and rejection rationale captured?"
              ]},
            { id: "MP-2.2", name: "Information about the AI system's knowledge limits and how system output may be utilized and overseen by humans is documented",
              questions: [
                "Are known limitations (data coverage, domain shift, edge cases) documented?",
                "Are operator instructions for interpreting outputs distributed?",
                "Are downstream consumers informed of confidence intervals and uncertainty?"
              ]},
            { id: "MP-2.3", name: "Scientific integrity and TEVV (test, evaluation, verification, validation) considerations are identified and documented, including those related to experimental design, data collection and selection, and the construct's variance and reliability",
              questions: [
                "Is the TEVV approach for each AI system documented?",
                "Are construct validity (does the metric measure what is intended?) considerations addressed?",
                "Are TEVV results peer-reviewed or independently validated for high-risk systems?"
              ]}
          ]
        },
        {
          id: "MP-3",
          name: "AI Capabilities, Targeted Usage, Goals, Expected Benefits and Costs",
          subcategories: [
            { id: "MP-3.1", name: "Potential benefits of intended AI system functionality and performance are examined and documented",
              questions: [
                "Are quantitative and qualitative benefits estimated and recorded?",
                "Are benefit estimates revisited post-deployment with measured outcomes?",
                "Are benefits compared against non-AI baselines?"
              ]},
            { id: "MP-3.2", name: "Potential costs, including non-monetary costs, which result from expected or realized AI errors or system functionality and trustworthiness are examined and documented",
              questions: [
                "Are direct and indirect costs of failure (financial, reputational, harm to individuals) modeled?",
                "Are worst-case and most-likely scenarios documented?",
                "Are cost estimates updated after incidents or near-misses?"
              ]},
            { id: "MP-3.3", name: "Targeted application scope is specified and documented based on the system's capability, established context, and AI system categorization",
              questions: [
                "Are deployment populations, geographies, and use scenarios bounded?",
                "Are guardrails (input filters, output filters, rate limits) implemented to enforce scope?",
                "Are scope expansions reviewed through a formal change-control process?"
              ]},
            { id: "MP-3.4", name: "Processes for operator and practitioner proficiency with AI system performance and trustworthiness — and relevant technical standards and certifications — are defined, assessed, and documented",
              questions: [
                "Are competency requirements for AI operators defined and assessed?",
                "Is ongoing proficiency tracked (e.g., recertification, periodic testing)?",
                "Are operator performance issues escalated and remediated?"
              ]},
            { id: "MP-3.5", name: "Processes for human oversight are defined, assessed, and documented in accordance with organizational policies",
              questions: [
                "Are oversight responsibilities defined per system and per decision type?",
                "Are reviewers given the authority, time, and information to override AI outputs?",
                "Is oversight effectiveness measured (e.g., override rates, accuracy of overrides)?"
              ]}
          ]
        },
        {
          id: "MP-4",
          name: "Risks and Benefits Mapped for All Components",
          subcategories: [
            { id: "MP-4.1", name: "Approaches for mapping AI technology and legal risks of its components — including the use of third-party data or software — are in place, followed, and documented, as are risks of infringement of a third-party's intellectual property or other rights",
              questions: [
                "Is a documented method (e.g., threat modeling) used to identify AI-specific risks across the lifecycle?",
                "Are third-party components individually risk-assessed?",
                "Are IP and licensing risks captured per component?"
              ]},
            { id: "MP-4.2", name: "Internal risk controls for components of the AI system, including third-party AI technologies, are identified and documented",
              questions: [
                "Are control catalogs (technical, procedural, contractual) maintained for AI components?",
                "Is each identified risk traceably mapped to one or more controls?",
                "Are control gaps tracked to remediation?"
              ]}
          ]
        },
        {
          id: "MP-5",
          name: "Impacts to Individuals, Groups, Communities, Organizations, and Society",
          subcategories: [
            { id: "MP-5.1", name: "Likelihood and magnitude of each identified impact (both potentially beneficial and harmful) based on expected use, past uses of AI systems in similar contexts, public incident reports, feedback from those external to the team that developed or deployed the AI system, and other data are identified and documented",
              questions: [
                "Is impact analysis informed by published incident data and lessons from comparable systems?",
                "Are likelihood and magnitude estimated using a defined methodology?",
                "Are impact estimates reviewed by stakeholders external to the development team?"
              ]},
            { id: "MP-5.2", name: "Practices and personnel for supporting regular engagement with relevant AI actors and integrating feedback about positive, negative, and unanticipated impacts are in place and documented",
              questions: [
                "Are dedicated personnel responsible for stakeholder engagement and impact monitoring?",
                "Are engagement cadences and channels documented?",
                "Is impact feedback used to update MAP outputs and downstream measurements?"
              ]}
          ]
        }
      ]
    },

    // =========================================================================
    // MEASURE (MS)
    // =========================================================================
    {
      id: "MS",
      name: "Measure",
      color: "#10b981",
      desc: "Identified risks are assessed, analyzed, and tracked — appropriate methods and metrics are used to evaluate AI system trustworthiness and performance",
      categories: [
        {
          id: "MS-1",
          name: "Appropriate Methods and Metrics Identified and Applied",
          subcategories: [
            { id: "MS-1.1", name: "Approaches and metrics for measurement of AI risks enumerated during the MAP function are selected for implementation starting with the most significant AI risks. The risks or trustworthiness characteristics that will not — or cannot — be measured are properly documented",
              questions: [
                "Are measurement methods and metrics chosen and prioritized based on MAP outputs?",
                "Are unmeasurable risks explicitly listed with rationale and compensating controls?",
                "Is the selection process repeatable and auditable?"
              ]},
            { id: "MS-1.2", name: "Appropriateness of AI metrics and effectiveness of existing controls are regularly assessed and updated, including reports of errors and potential impacts on affected communities",
              questions: [
                "Are metrics reviewed periodically against new threats, drift, and stakeholder concerns?",
                "Are reports of errors and harms used to update metrics?",
                "Are obsolete metrics retired and replacements documented?"
              ]},
            { id: "MS-1.3", name: "Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments and updates. Domain experts, users, AI actors external to the team that developed or deployed the AI system, and affected communities are consulted in support of assessments as necessary per organizational risk tolerance",
              questions: [
                "Are assessments performed by reviewers independent of the development team?",
                "Are external experts engaged for high-risk systems?",
                "Are affected communities consulted as part of measurement design?"
              ]}
          ]
        },
        {
          id: "MS-2",
          name: "AI Systems are Evaluated for Trustworthy Characteristics",
          subcategories: [
            { id: "MS-2.1", name: "Test sets, metrics, and details about the tools used during TEVV are documented",
              questions: [
                "Are test datasets, metrics, scripts, and tooling versioned and documented?",
                "Are test artifacts retained for reproducibility?",
                "Are test methodology limitations disclosed?"
              ]},
            { id: "MS-2.2", name: "Evaluations involving human subjects meet applicable requirements (including human subject protection) and are representative of the relevant population",
              questions: [
                "Are human-subject evaluations reviewed for IRB or equivalent ethics approval where applicable?",
                "Are participant demographics representative of deployment populations?",
                "Are informed consent and participant safeguards in place?"
              ]},
            { id: "MS-2.3", name: "AI system performance or assurance criteria are measured qualitatively or quantitatively and demonstrated for conditions similar to deployment setting(s). Measures are documented",
              questions: [
                "Is system performance measured under realistic operational conditions?",
                "Are stress tests, edge cases, and out-of-distribution inputs evaluated?",
                "Are deployment-condition performance results recorded and compared to acceptance criteria?"
              ]},
            { id: "MS-2.4", name: "The functionality and behavior of the AI system and its components — as identified in the MAP function — are monitored when in production",
              questions: [
                "Is real-time or scheduled monitoring deployed for model accuracy, drift, and behavior?",
                "Are monitoring outputs reviewed by responsible AI actors?",
                "Are alert thresholds tuned to organizational risk tolerance?"
              ]},
            { id: "MS-2.5", name: "The AI system to be deployed is demonstrated to be valid and reliable. Limitations of the generalizability beyond the conditions under which the technology was developed are documented",
              questions: [
                "Are validity and reliability evidence packages produced prior to deployment?",
                "Are generalizability boundaries (populations, contexts, conditions) documented?",
                "Are users informed of validity scope?"
              ]},
            { id: "MS-2.6", name: "AI system is evaluated regularly for safety risks — as identified in the MAP function. The AI system to be deployed is demonstrated to be safe, its residual negative risk does not exceed the risk tolerance, and it can fail safely, particularly if made to operate beyond its knowledge limits",
              questions: [
                "Are safety tests (including failure-mode and graceful-degradation tests) executed regularly?",
                "Are residual safety risks within documented tolerance, with sign-off from accountable owners?",
                "Are safe-fail behaviors verified for out-of-distribution and adversarial conditions?"
              ]},
            { id: "MS-2.7", name: "AI system security and resilience — as identified in the MAP function — are evaluated and documented",
              questions: [
                "Are AI-specific security tests (model extraction, data poisoning, prompt injection, evasion) performed?",
                "Are resilience evaluations (graceful degradation under adversarial or noisy input) conducted?",
                "Are vulnerabilities tracked and remediated like other security defects?"
              ]},
            { id: "MS-2.8", name: "Risks associated with transparency and accountability — as identified in the MAP function — are examined and documented",
              questions: [
                "Are transparency artifacts (model cards, system documentation, decision logs) produced and maintained?",
                "Are accountability gaps identified and remediated?",
                "Are transparency disclosures audited for accuracy?"
              ]},
            { id: "MS-2.9", name: "The AI model is explained, validated, and documented, and AI system output is interpreted within its context — as identified in the MAP function — to inform responsible use and governance",
              questions: [
                "Are explanation methods (global and local) implemented appropriate to system risk and stakeholder needs?",
                "Are explanations validated for fidelity?",
                "Are operators trained to interpret outputs and explanations correctly?"
              ]},
            { id: "MS-2.10", name: "Privacy risk of the AI system — as identified in the MAP function — is examined and documented",
              questions: [
                "Are privacy risks (re-identification, memorization, inference) measured for each AI system?",
                "Are privacy-enhancing technologies (anonymization, differential privacy, federated learning) applied where appropriate?",
                "Are DPIAs or equivalent assessments completed and refreshed?"
              ]},
            { id: "MS-2.11", name: "Fairness and bias — as identified in the MAP function — are evaluated and results are documented",
              questions: [
                "Are fairness/bias metrics (e.g., demographic parity, equalized odds, disparate impact) measured against defined groups?",
                "Are mitigations evaluated for effectiveness and side effects?",
                "Are fairness measurements communicated to affected stakeholders?"
              ]},
            { id: "MS-2.12", name: "Environmental impact and sustainability of AI model training and management activities — as identified in the MAP function — are assessed and documented",
              questions: [
                "Are compute, energy, and water-use estimates produced for training and inference?",
                "Are lower-impact alternatives (smaller models, efficient architectures, green regions) evaluated?",
                "Are environmental impact metrics reported alongside performance metrics?"
              ]},
            { id: "MS-2.13", name: "Effectiveness of the employed TEVV metrics and processes in the MEASURE function are evaluated and documented",
              questions: [
                "Is the TEVV program itself periodically reviewed for effectiveness?",
                "Are gaps between measured and operational performance investigated?",
                "Are improvements to TEVV implemented and tracked?"
              ]}
          ]
        },
        {
          id: "MS-3",
          name: "Mechanisms for Tracking AI Risks Over Time",
          subcategories: [
            { id: "MS-3.1", name: "Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts",
              questions: [
                "Is there a formal process to surface emergent AI risks (drift, capability surprise, misuse)?",
                "Are responsible personnel assigned and resourced for emergent-risk tracking?",
                "Are emergent risks documented and escalated for treatment?"
              ]},
            { id: "MS-3.2", name: "Risk tracking approaches are considered for settings where AI risks are difficult to assess using currently available measurement techniques or where metrics are not yet available",
              questions: [
                "Are qualitative and proxy measures used where quantitative metrics are unavailable?",
                "Are 'measurement gaps' explicitly catalogued?",
                "Are research or vendor partnerships pursued to close measurement gaps?"
              ]},
            { id: "MS-3.3", name: "Feedback processes for end users and impacted communities to report problems and appeal system outcomes are established and integrated into AI system evaluation metrics",
              questions: [
                "Are user-facing feedback and appeal mechanisms in place?",
                "Are reported problems triaged and integrated into measurement?",
                "Are systemic issues from feedback escalated to risk owners?"
              ]}
          ]
        },
        {
          id: "MS-4",
          name: "Feedback About Efficacy of Measurement is Gathered and Assessed",
          subcategories: [
            { id: "MS-4.1", name: "Measurement approaches for identifying AI risks are connected to deployment context(s) and informed through consultation with domain experts and other end users. Approaches are documented",
              questions: [
                "Are measurement approaches reviewed by domain experts and operators?",
                "Are deployment-context changes triggering measurement updates?",
                "Are review outcomes documented and traceable?"
              ]},
            { id: "MS-4.2", name: "Measurement results regarding AI system trustworthiness in deployment context(s) and across the AI lifecycle are informed by input from domain experts and relevant AI actors to validate whether the system is performing consistently as intended. Results are documented",
              questions: [
                "Are measurement results validated by external or independent reviewers?",
                "Are discrepancies between expected and observed performance investigated?",
                "Are validation results documented and used to update controls?"
              ]},
            { id: "MS-4.3", name: "Measurable performance improvements (e.g., participatory methods) based on consultations with end users, practitioners, and affected communities and other actors are identified and documented",
              questions: [
                "Are measurable improvement targets set based on stakeholder input?",
                "Are participatory methods (co-design, citizen panels) used where appropriate?",
                "Are improvements verified and reported back to participants?"
              ]}
          ]
        }
      ]
    },

    // =========================================================================
    // MANAGE (MG)
    // =========================================================================
    {
      id: "MG",
      name: "Manage",
      color: "#f59e0b",
      desc: "Risks are prioritized and acted upon based on a projected impact — risk treatment, monitoring, response, and recovery activities are planned, resourced, and executed",
      categories: [
        {
          id: "MG-1",
          name: "AI Risks Are Prioritized, Responded To, and Managed",
          subcategories: [
            { id: "MG-1.1", name: "A determination is made as to whether the AI system achieves its intended purposes and stated objectives and whether its development or deployment should proceed",
              questions: [
                "Is there a formal go/no-go gate prior to AI deployment that evaluates intended-purpose achievement?",
                "Are decisions documented with rationale, signatories, and conditions?",
                "Are no-go decisions tracked to closure (cancellation, rework, or escalation)?"
              ]},
            { id: "MG-1.2", name: "Treatment of documented AI risks is prioritized based on impact, likelihood, and available resources or methods",
              questions: [
                "Is a documented risk-treatment prioritization method used (e.g., risk matrix, FAIR-AI)?",
                "Are resource and method constraints considered in prioritization?",
                "Is the prioritized treatment plan reviewed by accountable owners?"
              ]},
            { id: "MG-1.3", name: "Responses to the AI risks deemed high priority — as identified by the MAP function — are developed, planned, and documented. Risk response options can include mitigating, transferring, avoiding, or accepting",
              questions: [
                "Are response plans (mitigate/transfer/avoid/accept) documented for high-priority risks?",
                "Are responses resourced with named owners and timelines?",
                "Are accepted risks formally signed off?"
              ]},
            { id: "MG-1.4", name: "Negative residual risks (defined as the sum of all unmitigated risks) to both downstream acquirers of AI systems and end users are documented",
              questions: [
                "Are residual risks documented post-treatment?",
                "Are downstream acquirers and end users informed of material residual risks?",
                "Are residual risks reviewed periodically and on material change?"
              ]}
          ]
        },
        {
          id: "MG-2",
          name: "Strategies to Maximize Benefits and Minimize Negative Impacts",
          subcategories: [
            { id: "MG-2.1", name: "Resources required to manage AI risks are taken into account, along with viable non-AI alternative systems, approaches, or methods, to reduce the magnitude or likelihood of potential impacts",
              questions: [
                "Are non-AI alternatives evaluated as a baseline against AI deployments?",
                "Are resourcing requirements for AI risk management explicitly budgeted?",
                "Is the trade-off between AI value and risk-management cost documented?"
              ]},
            { id: "MG-2.2", name: "Mechanisms are in place and applied to sustain the value of deployed AI systems",
              questions: [
                "Are model retraining, recalibration, and refresh cadences defined?",
                "Are value KPIs tracked and reviewed post-deployment?",
                "Are degraded systems remediated, rebuilt, or retired?"
              ]},
            { id: "MG-2.3", name: "Procedures are followed to respond to and recover from a previously unknown risk when it is identified",
              questions: [
                "Are unknown-risk response procedures defined and rehearsed?",
                "Are recovery objectives (RTO/RPO equivalents) defined for AI systems?",
                "Are post-event reviews used to convert 'unknown' into 'managed' risks?"
              ]},
            { id: "MG-2.4", name: "Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use",
              questions: [
                "Is there a documented kill-switch or rollback capability for each AI system?",
                "Are decision authorities for deactivation clearly assigned?",
                "Are deactivation drills conducted for high-risk systems?"
              ]}
          ]
        },
        {
          id: "MG-3",
          name: "AI Risks From Third Parties Are Managed",
          subcategories: [
            { id: "MG-3.1", name: "AI risks and benefits from third-party resources are regularly monitored, and risk controls are applied and documented",
              questions: [
                "Are third-party AI services and datasets continuously monitored for performance, drift, and incidents?",
                "Are third-party-specific controls (contractual, technical) verified periodically?",
                "Are issues escalated to vendor-management and risk forums?"
              ]},
            { id: "MG-3.2", name: "Pre-trained models which are used for development are monitored as part of AI system regular monitoring and maintenance",
              questions: [
                "Are pre-trained foundation/base models tracked in inventory with version, source, and license?",
                "Are downstream behaviors monitored when upstream models change?",
                "Are upgrade and replacement plans defined for deprecated foundation models?"
              ]}
          ]
        },
        {
          id: "MG-4",
          name: "Risk Treatments, Including Response and Recovery, Are Documented",
          subcategories: [
            { id: "MG-4.1", name: "Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management",
              questions: [
                "Is a documented post-deployment monitoring plan in place per AI system?",
                "Are user feedback, appeals, overrides, and incidents captured in a unified workflow?",
                "Are change-management decisions traceable through deployment, decommissioning, and recovery events?"
              ]},
            { id: "MG-4.2", name: "Measurable activities for continual improvements are integrated into AI system updates and include regular engagement with interested parties, including relevant AI actors",
              questions: [
                "Are continual-improvement activities scheduled and resourced?",
                "Are interested parties engaged at defined cadences?",
                "Are improvements verified through measurement and reported?"
              ]},
            { id: "MG-4.3", name: "Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented",
              questions: [
                "Is an AI incident communication plan in place (internal, regulatory, public)?",
                "Are incidents tracked end-to-end with root cause and corrective action documented?",
                "Are post-incident communications reviewed for accuracy, timeliness, and stakeholder reach?"
              ]}
          ]
        }
      ]
    }
  ]
};
