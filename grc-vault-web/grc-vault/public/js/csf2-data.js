const CSF2 = {
  functions: [
    // =========================================================================
    // GOVERN (GV)
    // =========================================================================
    {
      id: "GV",
      name: "Govern",
      color: "#8b5cf6",
      desc: "The organization's cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored",
      categories: [
        {
          id: "GV.OC",
          name: "Organizational Context",
          subcategories: [
            {
              id: "GV.OC-01",
              name: "The organizational mission is understood and informs cybersecurity risk management",
              questions: [
                "Is the organizational mission formally documented and communicated?",
                "Does the cybersecurity strategy explicitly reference and align with the mission?",
                "Are cybersecurity priorities regularly reviewed against business objectives?"
              ]
            },
            {
              id: "GV.OC-02",
              name: "Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered",
              questions: [
                "Is there a documented inventory of internal and external stakeholders with cybersecurity interests?",
                "Are stakeholder needs and expectations regarding cybersecurity formally gathered and recorded?",
                "Are stakeholder requirements periodically reviewed and incorporated into cybersecurity planning?"
              ]
            },
            {
              id: "GV.OC-03",
              name: "Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed",
              questions: [
                "Is there a maintained register of applicable legal, regulatory, and contractual cybersecurity requirements?",
                "Are compliance obligations regularly reviewed and mapped to organizational controls?",
                "Is there a formal process for tracking changes to legal and regulatory requirements?"
              ]
            },
            {
              id: "GV.OC-04",
              name: "Critical objectives, capabilities, and services that stakeholders depend on or expect are understood and communicated",
              questions: [
                "Are critical business objectives and services formally identified and documented?",
                "Are dependencies between critical services and cybersecurity controls well understood?",
                "Is this information regularly communicated to relevant stakeholders and updated?"
              ]
            },
            {
              id: "GV.OC-05",
              name: "Outcomes, capabilities, and services that the organization depends on are understood and communicated",
              questions: [
                "Are external dependencies (services, capabilities, outcomes) formally identified and documented?",
                "Is there a process for assessing cybersecurity risks associated with these dependencies?",
                "Are dependency risks communicated to leadership and incorporated into risk management planning?"
              ]
            }
          ]
        },
        {
          id: "GV.RM",
          name: "Risk Management Strategy",
          subcategories: [
            {
              id: "GV.RM-01",
              name: "Risk management objectives are established and agreed to by organizational stakeholders",
              questions: [
                "Are risk management objectives formally documented and approved by leadership?",
                "Do stakeholders across the organization agree on and understand the risk management objectives?",
                "Are risk management objectives reviewed and updated on a regular cadence?"
              ]
            },
            {
              id: "GV.RM-02",
              name: "Risk appetite and risk tolerance statements are established, communicated, and maintained",
              questions: [
                "Are risk appetite and tolerance statements formally defined and documented?",
                "Are these statements communicated organization-wide and understood by decision-makers?",
                "Are risk appetite and tolerance statements reviewed and updated based on changes in the threat landscape?"
              ]
            },
            {
              id: "GV.RM-03",
              name: "Cybersecurity risk management activities and outcomes are included in enterprise risk management processes",
              questions: [
                "Is cybersecurity risk formally integrated into the enterprise risk management framework?",
                "Are cybersecurity risk outcomes reported alongside other enterprise risks to leadership?",
                "Are enterprise risk management processes consistently applied to cybersecurity decisions?"
              ]
            },
            {
              id: "GV.RM-04",
              name: "Strategic direction that describes appropriate risk response options is established and communicated",
              questions: [
                "Are risk response options (accept, mitigate, transfer, avoid) formally defined in policy?",
                "Is strategic direction for risk response communicated to all relevant personnel?",
                "Are risk response decisions documented, tracked, and reviewed for effectiveness?"
              ]
            },
            {
              id: "GV.RM-05",
              name: "Lines of communication across the organization are established for cybersecurity risks",
              questions: [
                "Are formal communication channels established for reporting cybersecurity risks?",
                "Do communication channels span all levels of the organization, including executive leadership?",
                "Are communication processes regularly tested and improved based on lessons learned?"
              ]
            },
            {
              id: "GV.RM-06",
              name: "A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated",
              questions: [
                "Is there a standardized risk scoring or calculation methodology in use?",
                "Is the methodology consistently applied across all risk assessments organization-wide?",
                "Is the risk categorization and prioritization method regularly reviewed and refined?"
              ]
            },
            {
              id: "GV.RM-07",
              name: "Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions",
              questions: [
                "Does the organization formally identify and document strategic opportunities related to cybersecurity?",
                "Are positive risks discussed alongside negative risks in risk management meetings?",
                "Are metrics used to evaluate and track the realization of strategic cybersecurity opportunities?"
              ]
            }
          ]
        },
        {
          id: "GV.RR",
          name: "Roles, Responsibilities, and Authorities",
          subcategories: [
            {
              id: "GV.RR-01",
              name: "Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving",
              questions: [
                "Is cybersecurity accountability formally assigned to senior leadership?",
                "Does leadership actively promote a risk-aware and ethical cybersecurity culture?",
                "Are leadership actions and decisions regarding cybersecurity regularly reviewed for continuous improvement?"
              ]
            },
            {
              id: "GV.RR-02",
              name: "Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced",
              questions: [
                "Are cybersecurity roles, responsibilities, and authorities formally documented?",
                "Are these roles communicated to and understood by all relevant personnel?",
                "Is compliance with assigned cybersecurity responsibilities monitored and enforced?"
              ]
            },
            {
              id: "GV.RR-03",
              name: "Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies",
              questions: [
                "Is there a formal process for allocating cybersecurity resources based on risk?",
                "Are resource allocations reviewed regularly to ensure they remain adequate?",
                "Are resource gaps identified, documented, and addressed in a timely manner?"
              ]
            },
            {
              id: "GV.RR-04",
              name: "Cybersecurity is included in human resources practices",
              questions: [
                "Are cybersecurity requirements integrated into hiring, onboarding, and offboarding processes?",
                "Are background checks and cybersecurity competency assessments part of HR practices?",
                "Are HR cybersecurity practices regularly reviewed and updated based on evolving threats?"
              ]
            }
          ]
        },
        {
          id: "GV.PO",
          name: "Policy",
          subcategories: [
            {
              id: "GV.PO-01",
              name: "Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced",
              questions: [
                "Is there a formal cybersecurity policy that reflects organizational context and strategy?",
                "Is the policy communicated to all personnel and enforced consistently?",
                "Are policy violations tracked, reported, and addressed through a formal process?"
              ]
            },
            {
              id: "GV.PO-02",
              name: "Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission",
              questions: [
                "Is there a defined schedule and process for reviewing and updating cybersecurity policy?",
                "Are policy updates triggered by changes in threats, technology, or business requirements?",
                "Are policy changes formally communicated and are personnel trained on updates?"
              ]
            }
          ]
        },
        {
          id: "GV.OV",
          name: "Oversight",
          subcategories: [
            {
              id: "GV.OV-01",
              name: "Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction",
              questions: [
                "Are cybersecurity risk management outcomes regularly reviewed by leadership?",
                "Do outcome reviews lead to documented adjustments in strategy and direction?",
                "Are metrics and KPIs used to measure the effectiveness of the risk management strategy?"
              ]
            },
            {
              id: "GV.OV-02",
              name: "The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks",
              questions: [
                "Is the risk management strategy periodically assessed for coverage of all organizational requirements?",
                "Are gaps in strategy coverage formally identified and addressed?",
                "Is the strategy adjustment process informed by threat intelligence and organizational changes?"
              ]
            },
            {
              id: "GV.OV-03",
              name: "Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed",
              questions: [
                "Are performance evaluations of cybersecurity risk management conducted on a regular basis?",
                "Are performance results shared with leadership and used to drive improvements?",
                "Is there a continuous improvement process that incorporates lessons learned from performance reviews?"
              ]
            }
          ]
        },
        {
          id: "GV.SC",
          name: "Cybersecurity Supply Chain Risk Management",
          subcategories: [
            {
              id: "GV.SC-01",
              name: "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders",
              questions: [
                "Is there a formal supply chain risk management program with documented strategy and policies?",
                "Have organizational stakeholders reviewed and agreed to the supply chain risk management approach?",
                "Is the supply chain risk management program regularly evaluated and improved?"
              ]
            },
            {
              id: "GV.SC-02",
              name: "Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally",
              questions: [
                "Are cybersecurity roles and responsibilities clearly defined for suppliers, customers, and partners?",
                "Are these roles communicated and coordinated both internally and externally?",
                "Are supplier cybersecurity responsibilities regularly reviewed and updated?"
              ]
            },
            {
              id: "GV.SC-03",
              name: "Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes",
              questions: [
                "Is supply chain risk management formally integrated into enterprise risk management?",
                "Are supply chain risks assessed using the same methodology as other cybersecurity risks?",
                "Are supply chain risk management improvements tracked and measured over time?"
              ]
            },
            {
              id: "GV.SC-04",
              name: "Suppliers are known and prioritized by criticality",
              questions: [
                "Is there a comprehensive inventory of all suppliers with cybersecurity relevance?",
                "Are suppliers formally prioritized based on criticality to the organization?",
                "Is the supplier inventory regularly updated and criticality assessments refreshed?"
              ]
            },
            {
              id: "GV.SC-05",
              name: "Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties",
              questions: [
                "Are cybersecurity requirements formally included in supplier contracts and agreements?",
                "Are contract cybersecurity requirements prioritized based on supplier criticality?",
                "Are contractual cybersecurity requirements reviewed and updated as threats evolve?"
              ]
            },
            {
              id: "GV.SC-06",
              name: "Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships",
              questions: [
                "Is there a formal due diligence process for evaluating supplier cybersecurity posture before engagement?",
                "Does due diligence include assessment of the supplier's cybersecurity policies and practices?",
                "Are due diligence findings documented and used to inform contracting decisions?"
              ]
            },
            {
              id: "GV.SC-07",
              name: "The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship",
              questions: [
                "Are supplier risks formally assessed and recorded throughout the relationship lifecycle?",
                "Is there a process for ongoing monitoring of supplier cybersecurity risk?",
                "Are risk response actions for supplier risks tracked and their effectiveness measured?"
              ]
            },
            {
              id: "GV.SC-08",
              name: "Relevant suppliers and other third parties are included in incident planning, response, and recovery activities",
              questions: [
                "Are critical suppliers included in incident response planning and exercises?",
                "Are communication protocols with suppliers defined for incident response scenarios?",
                "Are supplier incident response capabilities regularly tested and validated?"
              ]
            },
            {
              id: "GV.SC-09",
              name: "Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle",
              questions: [
                "Are supply chain security practices integrated throughout the technology product and service life cycle?",
                "Is the performance of supply chain security practices monitored with defined metrics?",
                "Are supply chain security practices continuously improved based on monitoring results?"
              ]
            },
            {
              id: "GV.SC-10",
              name: "Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement",
              questions: [
                "Are there documented procedures for managing cybersecurity risks when supplier relationships end?",
                "Do offboarding procedures address data return, destruction, and access revocation?",
                "Are post-relationship cybersecurity activities reviewed and improved based on lessons learned?"
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // IDENTIFY (ID)
    // =========================================================================
    {
      id: "ID",
      name: "Identify",
      color: "#3b82f6",
      desc: "The organization's current cybersecurity risks are understood",
      categories: [
        {
          id: "ID.AM",
          name: "Asset Management",
          subcategories: [
            {
              id: "ID.AM-01",
              name: "Inventories of hardware managed by the organization are maintained",
              questions: [
                "Is there a comprehensive and up-to-date inventory of all hardware assets?",
                "Is the hardware inventory maintained using automated discovery tools?",
                "Is the hardware inventory regularly audited and reconciled for accuracy?"
              ]
            },
            {
              id: "ID.AM-02",
              name: "Inventories of software, services, and systems managed by the organization are maintained",
              questions: [
                "Is there a comprehensive inventory of all software, services, and systems?",
                "Is the software inventory updated automatically when changes occur?",
                "Are unauthorized software and services identified and addressed through the inventory process?"
              ]
            },
            {
              id: "ID.AM-03",
              name: "Representations of the organization's authorized network communication and internal and external network data flows are maintained",
              questions: [
                "Are network architecture diagrams and data flow maps formally documented?",
                "Are network communication and data flow representations kept current as changes occur?",
                "Are data flow maps reviewed periodically and validated against actual network traffic?"
              ]
            },
            {
              id: "ID.AM-04",
              name: "Inventories of services provided by suppliers are maintained",
              questions: [
                "Is there a complete inventory of services provided by external suppliers?",
                "Are supplier service inventories linked to criticality and risk assessments?",
                "Is the supplier services inventory reviewed and updated on a regular schedule?"
              ]
            },
            {
              id: "ID.AM-05",
              name: "Assets are prioritized based on classification, criticality, resources, and impact on the mission",
              questions: [
                "Is there a formal asset classification and prioritization scheme in place?",
                "Are asset priorities aligned with business criticality and mission impact?",
                "Are asset classifications regularly reviewed and updated based on changing business needs?"
              ]
            },
            {
              id: "ID.AM-07",
              name: "Inventories of data and corresponding metadata for designated data types are maintained",
              questions: [
                "Is there a formal data inventory that includes classification and metadata?",
                "Are data inventories maintained for all designated data types across the organization?",
                "Is the data inventory regularly reviewed, updated, and validated for completeness?"
              ]
            },
            {
              id: "ID.AM-08",
              name: "Systems, hardware, software, services, and data are managed throughout their life cycles",
              questions: [
                "Is there a formal lifecycle management process for all asset types?",
                "Are end-of-life and end-of-support assets identified, tracked, and managed?",
                "Are lifecycle management practices reviewed and improved based on operational experience?"
              ]
            }
          ]
        },
        {
          id: "ID.RA",
          name: "Risk Assessment",
          subcategories: [
            {
              id: "ID.RA-01",
              name: "Vulnerabilities in assets are identified, validated, and recorded",
              questions: [
                "Is there a formal vulnerability identification and management program?",
                "Are vulnerabilities validated and recorded in a centralized tracking system?",
                "Are vulnerability assessment processes regularly reviewed and improved?"
              ]
            },
            {
              id: "ID.RA-02",
              name: "Cyber threat intelligence is received from information sharing forums and sources",
              questions: [
                "Does the organization actively receive cyber threat intelligence from external sources?",
                "Is threat intelligence integrated into risk assessment and decision-making processes?",
                "Are threat intelligence sources regularly evaluated for relevance and reliability?"
              ]
            },
            {
              id: "ID.RA-03",
              name: "Internal and external threats to the organization are identified and recorded",
              questions: [
                "Is there a formal process for identifying and documenting internal and external threats?",
                "Are threat profiles maintained and updated based on new intelligence and incidents?",
                "Are identified threats communicated to relevant stakeholders and used in risk assessments?"
              ]
            },
            {
              id: "ID.RA-04",
              name: "Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded",
              questions: [
                "Are threat-vulnerability pairings formally analyzed for impact and likelihood?",
                "Is a consistent methodology used to assess impact and likelihood across the organization?",
                "Are impact and likelihood assessments updated as the threat landscape changes?"
              ]
            },
            {
              id: "ID.RA-05",
              name: "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization",
              questions: [
                "Is inherent risk calculated using a combination of threats, vulnerabilities, likelihoods, and impacts?",
                "Are risk response actions prioritized based on the inherent risk analysis?",
                "Is the risk prioritization methodology reviewed and refined on a regular basis?"
              ]
            },
            {
              id: "ID.RA-06",
              name: "Risk responses are chosen, prioritized, planned, tracked, and communicated",
              questions: [
                "Are risk responses formally selected, documented, and assigned to responsible parties?",
                "Is there a tracking mechanism for risk response implementation and effectiveness?",
                "Are risk response decisions and their outcomes communicated to stakeholders?"
              ]
            },
            {
              id: "ID.RA-07",
              name: "Changes and exceptions are managed, assessed for risk impact, recorded, and tracked",
              questions: [
                "Is there a formal change management process that includes cybersecurity risk assessment?",
                "Are exceptions to cybersecurity policies documented, risk-assessed, and time-limited?",
                "Are changes and exceptions tracked and reviewed for ongoing risk impact?"
              ]
            },
            {
              id: "ID.RA-08",
              name: "Processes for receiving, analyzing, and responding to vulnerability disclosures are established",
              questions: [
                "Is there a formal vulnerability disclosure process accessible to internal and external reporters?",
                "Are disclosed vulnerabilities analyzed, prioritized, and remediated in a timely manner?",
                "Is the vulnerability disclosure process regularly tested and improved?"
              ]
            },
            {
              id: "ID.RA-09",
              name: "The authenticity and integrity of hardware and software are assessed prior to acquisition and use",
              questions: [
                "Is there a process to verify the authenticity and integrity of hardware and software before deployment?",
                "Are supply chain integrity checks included in procurement procedures?",
                "Are authenticity and integrity verification practices reviewed and updated as threats evolve?"
              ]
            },
            {
              id: "ID.RA-10",
              name: "Critical suppliers are assessed prior to acquisition",
              questions: [
                "Is there a formal pre-acquisition cybersecurity assessment process for critical suppliers?",
                "Are assessment criteria aligned with organizational risk tolerance and requirements?",
                "Are pre-acquisition assessments documented and their findings tracked through remediation?"
              ]
            }
          ]
        },
        {
          id: "ID.IM",
          name: "Improvement",
          subcategories: [
            {
              id: "ID.IM-01",
              name: "Improvements are identified from evaluations",
              questions: [
                "Are cybersecurity evaluations conducted regularly to identify areas for improvement?",
                "Are evaluation findings formally documented and tracked through resolution?",
                "Are improvement actions prioritized and their effectiveness measured?"
              ]
            },
            {
              id: "ID.IM-02",
              name: "Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties",
              questions: [
                "Are security tests and exercises conducted regularly, including with third parties?",
                "Are lessons learned from tests and exercises formally documented and acted upon?",
                "Are improvements from exercises tracked to completion and validated for effectiveness?"
              ]
            },
            {
              id: "ID.IM-03",
              name: "Improvements are identified from execution of operational processes, procedures, and activities",
              questions: [
                "Is there a process for capturing improvement opportunities from day-to-day operations?",
                "Are operational improvement suggestions reviewed, prioritized, and implemented?",
                "Are metrics used to measure the impact of operational improvements on cybersecurity posture?"
              ]
            },
            {
              id: "ID.IM-04",
              name: "Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved",
              questions: [
                "Are incident response and other cybersecurity plans formally documented and communicated?",
                "Are these plans tested regularly through exercises and updated based on results?",
                "Is there a continuous improvement process for all cybersecurity operational plans?"
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // PROTECT (PR)
    // =========================================================================
    {
      id: "PR",
      name: "Protect",
      color: "#22c55e",
      desc: "Safeguards to manage the organization's cybersecurity risks are used",
      categories: [
        {
          id: "PR.AA",
          name: "Identity Management, Authentication, and Access Control",
          subcategories: [
            {
              id: "PR.AA-01",
              name: "Identities and credentials for authorized users, services, and hardware are managed by the organization",
              questions: [
                "Is there a centralized identity and credential management system for users, services, and hardware?",
                "Are identity lifecycle processes (provisioning, modification, deprovisioning) formally defined and followed?",
                "Are identity management practices regularly audited and improved?"
              ]
            },
            {
              id: "PR.AA-02",
              name: "Identities are proofed and bound to credentials based on the context of interactions",
              questions: [
                "Is there a formal identity proofing process that verifies identities before credential issuance?",
                "Are identity proofing requirements adjusted based on the risk level of the interaction context?",
                "Are identity proofing processes reviewed and strengthened based on emerging threats?"
              ]
            },
            {
              id: "PR.AA-03",
              name: "Users, services, and hardware are authenticated",
              questions: [
                "Are authentication mechanisms implemented for all users, services, and hardware?",
                "Is multi-factor authentication required for high-risk or privileged access?",
                "Are authentication mechanisms regularly evaluated and upgraded to address new threats?"
              ]
            },
            {
              id: "PR.AA-04",
              name: "Identity assertions are protected, conveyed, and verified",
              questions: [
                "Are identity assertions (tokens, certificates, claims) protected during transmission and storage?",
                "Is there a process for verifying the validity and integrity of identity assertions?",
                "Are identity assertion mechanisms reviewed and updated to maintain security?"
              ]
            },
            {
              id: "PR.AA-05",
              name: "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties",
              questions: [
                "Are access permissions formally defined in policy and based on least privilege and separation of duties?",
                "Are access entitlements regularly reviewed and recertified by appropriate authorities?",
                "Are access control violations detected, investigated, and used to improve the access management process?"
              ]
            },
            {
              id: "PR.AA-06",
              name: "Physical access to assets is managed, monitored, and enforced commensurate with risk",
              questions: [
                "Are physical access controls implemented and managed based on asset criticality?",
                "Is physical access monitored through logs, cameras, or other surveillance mechanisms?",
                "Are physical access controls regularly tested and updated based on risk assessments?"
              ]
            }
          ]
        },
        {
          id: "PR.AT",
          name: "Awareness and Training",
          subcategories: [
            {
              id: "PR.AT-01",
              name: "Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind",
              questions: [
                "Is cybersecurity awareness training provided to all personnel on a regular basis?",
                "Is training content updated to reflect current threats and organizational policies?",
                "Are training effectiveness metrics collected and used to improve the program?"
              ]
            },
            {
              id: "PR.AT-02",
              name: "Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind",
              questions: [
                "Are role-specific cybersecurity training programs provided for specialized positions?",
                "Is specialized training aligned with the specific risks and responsibilities of each role?",
                "Are specialized training programs evaluated for effectiveness and updated regularly?"
              ]
            }
          ]
        },
        {
          id: "PR.DS",
          name: "Data Security",
          subcategories: [
            {
              id: "PR.DS-01",
              name: "The confidentiality, integrity, and availability of data-at-rest are protected",
              questions: [
                "Are data-at-rest protection controls (e.g., encryption) implemented based on data classification?",
                "Are data-at-rest protections consistently applied across all storage locations?",
                "Are data-at-rest protection mechanisms regularly reviewed and updated?"
              ]
            },
            {
              id: "PR.DS-02",
              name: "The confidentiality, integrity, and availability of data-in-transit are protected",
              questions: [
                "Are data-in-transit protection controls (e.g., TLS, VPN) implemented for all sensitive communications?",
                "Are data-in-transit protections enforced consistently across all network paths?",
                "Are data-in-transit protection standards reviewed and upgraded as cryptographic standards evolve?"
              ]
            },
            {
              id: "PR.DS-10",
              name: "The confidentiality, integrity, and availability of data-in-use are protected",
              questions: [
                "Are controls in place to protect data while it is being actively processed or used?",
                "Are data-in-use protection mechanisms applied consistently across systems and applications?",
                "Are data-in-use protections evaluated against emerging threats and improved accordingly?"
              ]
            },
            {
              id: "PR.DS-11",
              name: "Backups of data are created, protected, maintained, and tested",
              questions: [
                "Are data backups performed regularly according to a documented backup policy?",
                "Are backups protected from unauthorized access, corruption, and ransomware?",
                "Are backup restoration procedures regularly tested and validated for reliability?"
              ]
            }
          ]
        },
        {
          id: "PR.PS",
          name: "Platform Security",
          subcategories: [
            {
              id: "PR.PS-01",
              name: "The configuration of systems is managed to minimize risk",
              questions: [
                "Are secure configuration baselines established and applied to all systems?",
                "Is configuration drift detected and remediated through automated or regular manual processes?",
                "Are configuration baselines reviewed and updated based on new vulnerabilities and best practices?"
              ]
            },
            {
              id: "PR.PS-02",
              name: "Software is maintained, replaced, and removed commensurate with risk",
              questions: [
                "Is there a formal process for maintaining, patching, and updating software?",
                "Is end-of-life or unsupported software identified and replaced or mitigated?",
                "Are software maintenance activities tracked, measured, and improved over time?"
              ]
            },
            {
              id: "PR.PS-03",
              name: "Hardware is maintained, replaced, and removed commensurate with risk",
              questions: [
                "Is there a formal process for hardware maintenance, replacement, and secure disposal?",
                "Is aging or unsupported hardware identified and addressed based on risk?",
                "Are hardware lifecycle management practices regularly evaluated and improved?"
              ]
            },
            {
              id: "PR.PS-04",
              name: "Log records are generated and made available for continuous monitoring",
              questions: [
                "Are log records generated for all critical systems and security-relevant events?",
                "Are logs centrally collected, protected from tampering, and retained per policy?",
                "Are logging practices reviewed regularly to ensure adequate coverage and usefulness?"
              ]
            },
            {
              id: "PR.PS-05",
              name: "Installation and execution of unauthorized software are prevented",
              questions: [
                "Are controls in place to prevent the installation and execution of unauthorized software?",
                "Are application whitelisting or other prevention mechanisms consistently enforced?",
                "Are unauthorized software prevention controls tested and updated regularly?"
              ]
            },
            {
              id: "PR.PS-06",
              name: "Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle",
              questions: [
                "Are secure development practices (e.g., SSDLC) formally defined and integrated into the development process?",
                "Are security activities (code review, testing, scanning) performed at each phase of the development lifecycle?",
                "Are secure development metrics collected and used to continuously improve the process?"
              ]
            }
          ]
        },
        {
          id: "PR.IR",
          name: "Technology Infrastructure Resilience",
          subcategories: [
            {
              id: "PR.IR-01",
              name: "Networks and environments are protected from unauthorized logical access and usage",
              questions: [
                "Are network segmentation and access controls implemented to prevent unauthorized logical access?",
                "Are network protection controls consistently applied across all environments?",
                "Are network access controls regularly tested through penetration testing and vulnerability scanning?"
              ]
            },
            {
              id: "PR.IR-02",
              name: "The organization's technology assets are protected from environmental threats",
              questions: [
                "Are environmental controls (fire suppression, climate control, flood protection) in place for critical assets?",
                "Are environmental protections monitored and maintained on a regular basis?",
                "Are environmental risk assessments conducted and protections updated as needed?"
              ]
            },
            {
              id: "PR.IR-03",
              name: "Mechanisms are implemented to achieve resilience requirements in normal and adverse situations",
              questions: [
                "Are resilience mechanisms (redundancy, failover, load balancing) implemented for critical systems?",
                "Are resilience capabilities tested regularly under both normal and adverse conditions?",
                "Are resilience requirements reviewed and updated based on business impact analyses and test results?"
              ]
            },
            {
              id: "PR.IR-04",
              name: "Adequate resource capacity to ensure availability is maintained",
              questions: [
                "Is capacity planning performed to ensure adequate resources for critical systems?",
                "Are capacity thresholds monitored and alerts configured for potential shortfalls?",
                "Are capacity management practices reviewed and improved based on performance trends?"
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // DETECT (DE)
    // =========================================================================
    {
      id: "DE",
      name: "Detect",
      color: "#eab308",
      desc: "Possible cybersecurity attacks and compromises are found and analyzed",
      categories: [
        {
          id: "DE.CM",
          name: "Continuous Monitoring",
          subcategories: [
            {
              id: "DE.CM-01",
              name: "Networks and network services are monitored to find potentially adverse events",
              questions: [
                "Is continuous network monitoring implemented using intrusion detection or similar tools?",
                "Are network monitoring alerts reviewed and triaged in a timely manner?",
                "Are network monitoring capabilities regularly evaluated and enhanced based on threat intelligence?"
              ]
            },
            {
              id: "DE.CM-02",
              name: "The physical environment is monitored to find potentially adverse events",
              questions: [
                "Are physical environment monitoring controls (sensors, cameras, alarms) deployed for critical areas?",
                "Are physical monitoring alerts reviewed and responded to promptly?",
                "Are physical monitoring capabilities assessed and improved on a regular basis?"
              ]
            },
            {
              id: "DE.CM-03",
              name: "Personnel activity and technology usage are monitored to find potentially adverse events",
              questions: [
                "Is personnel activity and technology usage monitoring implemented with appropriate controls?",
                "Are monitoring activities conducted in accordance with privacy policies and legal requirements?",
                "Are personnel monitoring practices reviewed for effectiveness and adjusted as needed?"
              ]
            },
            {
              id: "DE.CM-06",
              name: "External service provider activities and services are monitored to find potentially adverse events",
              questions: [
                "Are external service provider activities monitored for cybersecurity-relevant events?",
                "Are service provider monitoring requirements defined in contracts and service agreements?",
                "Are provider monitoring capabilities evaluated and improved based on incident trends?"
              ]
            },
            {
              id: "DE.CM-09",
              name: "Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events",
              questions: [
                "Is endpoint and application monitoring deployed across computing hardware and software?",
                "Are runtime environments and data access patterns monitored for anomalies?",
                "Are monitoring tools and rules regularly tuned to reduce false positives and detect new threats?"
              ]
            }
          ]
        },
        {
          id: "DE.AE",
          name: "Adverse Event Analysis",
          subcategories: [
            {
              id: "DE.AE-02",
              name: "Potentially adverse events are analyzed to better understand associated activities",
              questions: [
                "Is there a formal process for analyzing potentially adverse events to understand their nature?",
                "Are analysis findings documented and used to improve detection capabilities?",
                "Are event analysis practices regularly reviewed and enhanced based on lessons learned?"
              ]
            },
            {
              id: "DE.AE-03",
              name: "Information is correlated from multiple sources",
              questions: [
                "Is event information correlated across multiple data sources (logs, alerts, threat feeds)?",
                "Are correlation tools (e.g., SIEM) deployed and configured to identify complex attack patterns?",
                "Are correlation rules and data sources regularly reviewed and expanded?"
              ]
            },
            {
              id: "DE.AE-04",
              name: "The estimated impact and scope of adverse events are understood",
              questions: [
                "Is there a process for estimating the impact and scope of detected adverse events?",
                "Are impact assessments performed in a timely manner to support response decisions?",
                "Are impact estimation methods refined based on post-incident reviews?"
              ]
            },
            {
              id: "DE.AE-06",
              name: "Information on adverse events is provided to authorized staff and tools",
              questions: [
                "Is adverse event information disseminated promptly to authorized staff and security tools?",
                "Are communication channels for adverse event information clearly defined and tested?",
                "Is the timeliness and completeness of information sharing measured and improved?"
              ]
            },
            {
              id: "DE.AE-07",
              name: "Cyber threat intelligence and other contextual information are integrated into the analysis",
              questions: [
                "Is cyber threat intelligence actively integrated into adverse event analysis?",
                "Are contextual factors (business impact, threat actor TTPs) considered during analysis?",
                "Are threat intelligence integration practices evaluated and improved over time?"
              ]
            },
            {
              id: "DE.AE-08",
              name: "Incidents are declared when adverse events meet the defined incident criteria",
              questions: [
                "Are incident declaration criteria formally defined and documented?",
                "Are adverse events consistently evaluated against incident criteria in a timely manner?",
                "Are incident declaration criteria reviewed and refined based on operational experience?"
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // RESPOND (RS)
    // =========================================================================
    {
      id: "RS",
      name: "Respond",
      color: "#f76b15",
      desc: "Actions regarding a detected cybersecurity incident are taken",
      categories: [
        {
          id: "RS.MA",
          name: "Incident Management",
          subcategories: [
            {
              id: "RS.MA-01",
              name: "The incident response plan is executed in coordination with relevant third parties once an incident is declared",
              questions: [
                "Is the incident response plan activated promptly upon incident declaration?",
                "Are relevant third parties (suppliers, partners, law enforcement) engaged as defined in the plan?",
                "Is the coordination process with third parties evaluated and improved after each incident?"
              ]
            },
            {
              id: "RS.MA-02",
              name: "Incident reports are triaged and validated",
              questions: [
                "Is there a formal process for triaging and validating incident reports?",
                "Are triage criteria consistently applied to ensure accurate incident classification?",
                "Are triage and validation processes reviewed and improved based on performance metrics?"
              ]
            },
            {
              id: "RS.MA-03",
              name: "Incidents are categorized and prioritized",
              questions: [
                "Is there a formal incident categorization and prioritization scheme?",
                "Are incidents consistently categorized and prioritized based on impact and urgency?",
                "Is the categorization scheme regularly reviewed and updated based on lessons learned?"
              ]
            },
            {
              id: "RS.MA-04",
              name: "Incidents are escalated or elevated as needed",
              questions: [
                "Are escalation procedures formally defined with clear thresholds and responsible parties?",
                "Are incidents escalated in a timely manner according to defined procedures?",
                "Are escalation procedures reviewed and refined after incidents to improve response times?"
              ]
            },
            {
              id: "RS.MA-05",
              name: "The criteria for initiating incident recovery are applied",
              questions: [
                "Are criteria for initiating incident recovery formally documented?",
                "Are recovery initiation criteria consistently applied during incident response?",
                "Are recovery criteria reviewed and updated based on post-incident analysis?"
              ]
            }
          ]
        },
        {
          id: "RS.AN",
          name: "Incident Analysis",
          subcategories: [
            {
              id: "RS.AN-03",
              name: "Analysis is performed to establish what has taken place during an incident and the root cause of the incident",
              questions: [
                "Is formal incident analysis conducted to determine the timeline and root cause of incidents?",
                "Are root cause analysis findings documented and used to prevent recurrence?",
                "Are analysis techniques and tools regularly evaluated and improved?"
              ]
            },
            {
              id: "RS.AN-06",
              name: "Actions performed during an investigation are recorded, and the records' integrity and provenance are preserved",
              questions: [
                "Are all investigative actions formally recorded during incident investigations?",
                "Are investigation records protected to ensure their integrity and chain of custody?",
                "Are recordkeeping practices reviewed and improved to meet legal and regulatory requirements?"
              ]
            },
            {
              id: "RS.AN-07",
              name: "Incident data and metadata are collected, and their integrity and provenance are preserved",
              questions: [
                "Is incident data and metadata systematically collected during and after incidents?",
                "Are data integrity and provenance controls applied to all collected incident information?",
                "Are data collection practices reviewed and enhanced based on forensic and legal requirements?"
              ]
            },
            {
              id: "RS.AN-08",
              name: "An incident's magnitude is estimated and validated",
              questions: [
                "Is there a formal process for estimating the magnitude and business impact of incidents?",
                "Are magnitude estimates validated through investigation and analysis?",
                "Are magnitude estimation methods improved based on post-incident reviews?"
              ]
            }
          ]
        },
        {
          id: "RS.CO",
          name: "Incident Response Reporting and Communication",
          subcategories: [
            {
              id: "RS.CO-02",
              name: "Internal and external stakeholders are notified of incidents",
              questions: [
                "Are notification procedures for internal and external stakeholders formally defined?",
                "Are stakeholders notified within required timeframes based on incident severity and regulatory obligations?",
                "Are notification procedures tested, reviewed, and improved after incidents?"
              ]
            },
            {
              id: "RS.CO-03",
              name: "Information is shared with designated internal and external stakeholders",
              questions: [
                "Is there a formal process for sharing incident information with designated stakeholders?",
                "Is information sharing conducted securely and in accordance with confidentiality requirements?",
                "Are information sharing practices evaluated for effectiveness and improved over time?"
              ]
            }
          ]
        },
        {
          id: "RS.MI",
          name: "Incident Mitigation",
          subcategories: [
            {
              id: "RS.MI-01",
              name: "Incidents are contained",
              questions: [
                "Are containment strategies formally defined for different types of incidents?",
                "Is containment executed promptly and effectively to limit incident impact?",
                "Are containment strategies reviewed and refined based on incident outcomes and lessons learned?"
              ]
            },
            {
              id: "RS.MI-02",
              name: "Incidents are eradicated",
              questions: [
                "Are eradication procedures formally defined to remove threats from the environment?",
                "Is eradication verified through scanning, monitoring, or other validation techniques?",
                "Are eradication procedures reviewed and improved after each incident?"
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // RECOVER (RC)
    // =========================================================================
    {
      id: "RC",
      name: "Recover",
      color: "#06b6d4",
      desc: "Assets and operations affected by a cybersecurity incident are restored",
      categories: [
        {
          id: "RC.RP",
          name: "Incident Recovery Plan Execution",
          subcategories: [
            {
              id: "RC.RP-01",
              name: "The recovery portion of the incident response plan is executed once initiated from the incident response process",
              questions: [
                "Is the recovery plan activated promptly once recovery initiation criteria are met?",
                "Are recovery procedures executed in accordance with the documented plan?",
                "Are recovery plan execution processes reviewed and improved after each incident?"
              ]
            },
            {
              id: "RC.RP-02",
              name: "Recovery actions are selected, scoped, and prioritized, and are performed",
              questions: [
                "Are recovery actions formally prioritized based on business impact and criticality?",
                "Are recovery actions executed systematically with clear ownership and timelines?",
                "Are recovery prioritization decisions reviewed post-incident to improve future responses?"
              ]
            },
            {
              id: "RC.RP-03",
              name: "The integrity of backups and other restoration assets is verified before using them for restoration",
              questions: [
                "Is there a formal process for verifying backup and restoration asset integrity before use?",
                "Are backup integrity checks performed consistently as part of the recovery process?",
                "Are backup verification practices improved based on recovery experience and test results?"
              ]
            },
            {
              id: "RC.RP-04",
              name: "Critical mission functions and cybersecurity risk management are considered to establish post-incident norms of operations",
              questions: [
                "Are critical mission functions considered when establishing post-incident operational norms?",
                "Are post-incident operational changes formally documented and communicated?",
                "Are post-incident norms reviewed and adjusted as the organization returns to full operations?"
              ]
            },
            {
              id: "RC.RP-05",
              name: "The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed",
              questions: [
                "Is the integrity of restored assets verified before returning systems to production?",
                "Is normal operating status formally confirmed through testing and validation?",
                "Are restoration verification processes improved based on lessons learned from recoveries?"
              ]
            },
            {
              id: "RC.RP-06",
              name: "The end of incident recovery is declared based on criteria, and incident-related documentation is completed",
              questions: [
                "Are criteria for declaring the end of incident recovery formally defined?",
                "Is all incident-related documentation completed and archived upon recovery closure?",
                "Are recovery closure criteria and documentation practices reviewed and improved?"
              ]
            }
          ]
        },
        {
          id: "RC.CO",
          name: "Incident Recovery Communication",
          subcategories: [
            {
              id: "RC.CO-03",
              name: "Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders",
              questions: [
                "Are recovery status updates provided to designated stakeholders on a regular basis?",
                "Are communication channels and frequency appropriate to stakeholder needs during recovery?",
                "Are recovery communication practices evaluated and improved after each incident?"
              ]
            },
            {
              id: "RC.CO-04",
              name: "Public updates on incident recovery are shared using approved methods and messaging",
              questions: [
                "Are public communications about incident recovery managed through approved channels and messaging?",
                "Is there a formal review and approval process for public recovery statements?",
                "Are public communication practices reviewed post-incident and improved based on stakeholder feedback?"
              ]
            }
          ]
        }
      ]
    }
  ]
};
