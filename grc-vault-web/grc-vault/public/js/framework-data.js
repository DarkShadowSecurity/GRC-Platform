const FW = {
  "NIST CSF": {
    ref: "https://www.nist.gov/cyberframework",
    controls: [
      // IDENTIFY (ID)
      // Asset Management (ID.AM)
      ["ID.AM-1", "Physical devices and systems within the organization are inventoried"],
      ["ID.AM-2", "Software platforms and applications within the organization are inventoried"],
      ["ID.AM-3", "Organizational communication and data flows are mapped"],
      ["ID.AM-4", "External information systems are catalogued"],
      ["ID.AM-5", "Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value"],
      ["ID.AM-6", "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g., suppliers, customers, partners) are established"],
      // Business Environment (ID.BE)
      ["ID.BE-1", "The organization's role in the supply chain is identified and communicated"],
      ["ID.BE-2", "The organization's place in critical infrastructure and its industry sector is identified and communicated"],
      ["ID.BE-3", "Priorities for organizational mission, objectives, and activities are established and communicated"],
      ["ID.BE-4", "Dependencies and critical functions for delivery of critical services are established"],
      ["ID.BE-5", "Resilience requirements to support delivery of critical services are established for all operating states (e.g., under duress/attack, during recovery, normal operations)"],
      // Governance (ID.GV)
      ["ID.GV-1", "Organizational cybersecurity policy is established and communicated"],
      ["ID.GV-2", "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners"],
      ["ID.GV-3", "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed"],
      ["ID.GV-4", "Governance and risk management processes address cybersecurity risks"],
      // Risk Assessment (ID.RA)
      ["ID.RA-1", "Asset vulnerabilities are identified and documented"],
      ["ID.RA-2", "Cyber threat intelligence is received from information sharing forums and sources"],
      ["ID.RA-3", "Threats, both internal and external, are identified and documented"],
      ["ID.RA-4", "Potential business impacts and likelihoods are identified"],
      ["ID.RA-5", "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk"],
      ["ID.RA-6", "Risk responses are identified and prioritized"],
      // Risk Management Strategy (ID.RM)
      ["ID.RM-1", "Risk management processes are established, managed, and agreed to by organizational stakeholders"],
      ["ID.RM-2", "Organizational risk tolerance is determined and clearly expressed"],
      ["ID.RM-3", "The organization's determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis"],
      // Supply Chain Risk Management (ID.SC)
      ["ID.SC-1", "Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to by organizational stakeholders"],
      ["ID.SC-2", "Suppliers and third party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process"],
      ["ID.SC-3", "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization's cybersecurity program and Cyber Supply Chain Risk Management Plan"],
      ["ID.SC-4", "Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations"],
      ["ID.SC-5", "Response and recovery planning and testing are conducted with suppliers and third-party providers"],

      // PROTECT (PR)
      // Access Control (PR.AC)
      ["PR.AC-1", "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"],
      ["PR.AC-2", "Physical access to assets is managed and protected"],
      ["PR.AC-3", "Remote access is managed"],
      ["PR.AC-4", "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties"],
      ["PR.AC-5", "Network integrity is protected (e.g., network segregation, network segmentation)"],
      ["PR.AC-6", "Identities are proofed and bound to credentials and asserted in interactions"],
      ["PR.AC-7", "Users, devices, and other assets are authenticated (e.g., single-factor, multi-factor) commensurate with the risk of the transaction"],
      // Awareness and Training (PR.AT)
      ["PR.AT-1", "All users are informed and trained"],
      ["PR.AT-2", "Privileged users understand their roles and responsibilities"],
      ["PR.AT-3", "Third-party stakeholders (e.g., suppliers, customers, partners) understand their roles and responsibilities"],
      ["PR.AT-4", "Senior executives understand their roles and responsibilities"],
      ["PR.AT-5", "Physical and cybersecurity personnel understand their roles and responsibilities"],
      // Data Security (PR.DS)
      ["PR.DS-1", "Data-at-rest is protected"],
      ["PR.DS-2", "Data-in-transit is protected"],
      ["PR.DS-3", "Assets are formally managed throughout removal, transfers, and disposition"],
      ["PR.DS-4", "Adequate capacity to ensure availability is maintained"],
      ["PR.DS-5", "Protections against data leaks are implemented"],
      ["PR.DS-6", "Integrity checking mechanisms are used to verify software, firmware, and information integrity"],
      ["PR.DS-7", "The development and testing environment(s) are separate from the production environment"],
      ["PR.DS-8", "Integrity checking mechanisms are used to verify hardware integrity"],
      // Information Protection Processes and Procedures (PR.IP)
      ["PR.IP-1", "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g., concept of least functionality)"],
      ["PR.IP-2", "A System Development Life Cycle to manage systems is implemented"],
      ["PR.IP-3", "Configuration change control processes are in place"],
      ["PR.IP-4", "Backups of information are conducted, maintained, and tested"],
      ["PR.IP-5", "Policy and regulations regarding the physical operating environment for organizational assets are met"],
      ["PR.IP-6", "Data is destroyed according to policy"],
      ["PR.IP-7", "Protection processes are improved"],
      ["PR.IP-8", "Effectiveness of protection technologies is shared"],
      ["PR.IP-9", "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed"],
      ["PR.IP-10", "Response and recovery plans are tested"],
      ["PR.IP-11", "Cybersecurity is included in human resources practices (e.g., deprovisioning, personnel screening)"],
      ["PR.IP-12", "A vulnerability management plan is developed and implemented"],
      // Maintenance (PR.MA)
      ["PR.MA-1", "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools"],
      ["PR.MA-2", "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access"],
      // Protective Technology (PR.PT)
      ["PR.PT-1", "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy"],
      ["PR.PT-2", "Removable media is protected and its use restricted according to policy"],
      ["PR.PT-3", "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities"],
      ["PR.PT-4", "Communications and control networks are protected"],
      ["PR.PT-5", "Mechanisms (e.g., failsafe, load balancing, hot swap) are implemented to achieve resilience requirements in normal and adverse situations"],

      // DETECT (DE)
      // Anomalies and Events (DE.AE)
      ["DE.AE-1", "A baseline of network operations and expected data flows for users and systems is established and managed"],
      ["DE.AE-2", "Detected events are analyzed to understand attack targets and methods"],
      ["DE.AE-3", "Event data are collected and correlated from multiple sources and sensors"],
      ["DE.AE-4", "Impact of events is determined"],
      ["DE.AE-5", "Incident alert thresholds are established"],
      // Security Continuous Monitoring (DE.CM)
      ["DE.CM-1", "The network is monitored to detect potential cybersecurity events"],
      ["DE.CM-2", "The physical environment is monitored to detect potential cybersecurity events"],
      ["DE.CM-3", "Personnel activity is monitored to detect potential cybersecurity events"],
      ["DE.CM-4", "Malicious code is detected"],
      ["DE.CM-5", "Unauthorized mobile code is detected"],
      ["DE.CM-6", "External service provider activity is monitored to detect potential cybersecurity events"],
      ["DE.CM-7", "Monitoring for unauthorized personnel, connections, devices, and software is performed"],
      ["DE.CM-8", "Vulnerability scans are performed"],
      // Detection Processes (DE.DP)
      ["DE.DP-1", "Roles and responsibilities for detection are well defined to ensure accountability"],
      ["DE.DP-2", "Detection activities comply with all applicable requirements"],
      ["DE.DP-3", "Detection processes are tested"],
      ["DE.DP-4", "Event detection information is communicated"],
      ["DE.DP-5", "Detection processes are continuously improved"],

      // RESPOND (RS)
      // Response Planning (RS.RP)
      ["RS.RP-1", "Response plan is executed during or after an incident"],
      // Communications (RS.CO)
      ["RS.CO-1", "Personnel know their roles and order of operations when a response is needed"],
      ["RS.CO-2", "Incidents are reported consistent with established criteria"],
      ["RS.CO-3", "Information is shared consistent with response plans"],
      ["RS.CO-4", "Coordination with stakeholders occurs consistent with response plans"],
      ["RS.CO-5", "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness"],
      // Analysis (RS.AN)
      ["RS.AN-1", "Notifications from detection systems are investigated"],
      ["RS.AN-2", "The impact of the incident is understood"],
      ["RS.AN-3", "Forensics are performed"],
      ["RS.AN-4", "Incidents are categorized consistent with response plans"],
      ["RS.AN-5", "Processes are established to receive, analyze and respond to vulnerabilities disclosed to the organization from internal and external sources"],
      // Mitigation (RS.MI)
      ["RS.MI-1", "Incidents are contained"],
      ["RS.MI-2", "Incidents are mitigated"],
      ["RS.MI-3", "Newly identified vulnerabilities are mitigated or documented as accepted risks"],
      // Improvements (RS.IM)
      ["RS.IM-1", "Response plans incorporate lessons learned"],
      ["RS.IM-2", "Response strategies are updated"],

      // RECOVER (RC)
      // Recovery Planning (RC.RP)
      ["RC.RP-1", "Recovery plan is executed during or after a cybersecurity incident"],
      // Improvements (RC.IM)
      ["RC.IM-1", "Recovery plans incorporate lessons learned"],
      ["RC.IM-2", "Recovery strategies are updated"],
      // Communications (RC.CO)
      ["RC.CO-1", "Public relations are managed"],
      ["RC.CO-2", "Reputation is repaired after an incident"],
      ["RC.CO-3", "Recovery activities are communicated to internal and external stakeholders as well as executive and management teams"]
    ]
  },

  "ISO 27001": {
    ref: "https://www.iso.org/standard/54534.html",
    controls: [
      // A.5 Information security policies
      ["A.5.1.1", "Policies for information security"],
      ["A.5.1.2", "Review of the policies for information security"],

      // A.6 Organization of information security
      ["A.6.1.1", "Information security roles and responsibilities"],
      ["A.6.1.2", "Segregation of duties"],
      ["A.6.1.3", "Contact with authorities"],
      ["A.6.1.4", "Contact with special interest groups"],
      ["A.6.1.5", "Information security in project management"],
      ["A.6.2.1", "Mobile device policy"],
      ["A.6.2.2", "Teleworking"],

      // A.7 Human resource security
      ["A.7.1.1", "Screening"],
      ["A.7.1.2", "Terms and conditions of employment"],
      ["A.7.2.1", "Management responsibilities"],
      ["A.7.2.2", "Information security awareness, education and training"],
      ["A.7.2.3", "Disciplinary process"],
      ["A.7.3.1", "Termination or change of employment responsibilities"],

      // A.8 Asset management
      ["A.8.1.1", "Inventory of assets"],
      ["A.8.1.2", "Ownership of assets"],
      ["A.8.1.3", "Acceptable use of assets"],
      ["A.8.1.4", "Return of assets"],
      ["A.8.2.1", "Classification of information"],
      ["A.8.2.2", "Labelling of information"],
      ["A.8.2.3", "Handling of assets"],
      ["A.8.3.1", "Management of removable media"],
      ["A.8.3.2", "Disposal of media"],
      ["A.8.3.3", "Physical media transfer"],

      // A.9 Access control
      ["A.9.1.1", "Access control policy"],
      ["A.9.1.2", "Access to networks and network services"],
      ["A.9.2.1", "User registration and de-registration"],
      ["A.9.2.2", "User access provisioning"],
      ["A.9.2.3", "Management of privileged access rights"],
      ["A.9.2.4", "Management of secret authentication information of users"],
      ["A.9.2.5", "Review of user access rights"],
      ["A.9.2.6", "Removal or adjustment of access rights"],
      ["A.9.3.1", "Use of secret authentication information"],
      ["A.9.4.1", "Information access restriction"],
      ["A.9.4.2", "Secure log-on procedures"],
      ["A.9.4.3", "Password management system"],
      ["A.9.4.4", "Use of privileged utility programs"],
      ["A.9.4.5", "Access control to program source code"],

      // A.10 Cryptography
      ["A.10.1.1", "Policy on the use of cryptographic controls"],
      ["A.10.1.2", "Key management"],

      // A.11 Physical and environmental security
      ["A.11.1.1", "Physical security perimeter"],
      ["A.11.1.2", "Physical entry controls"],
      ["A.11.1.3", "Securing offices, rooms and facilities"],
      ["A.11.1.4", "Protecting against external and environmental threats"],
      ["A.11.1.5", "Working in secure areas"],
      ["A.11.1.6", "Delivery and loading areas"],
      ["A.11.2.1", "Equipment siting and protection"],
      ["A.11.2.2", "Supporting utilities"],
      ["A.11.2.3", "Cabling security"],
      ["A.11.2.4", "Equipment maintenance"],
      ["A.11.2.5", "Removal of assets"],
      ["A.11.2.6", "Security of equipment and assets off-premises"],
      ["A.11.2.7", "Secure disposal or reuse of equipment"],
      ["A.11.2.8", "Unattended user equipment"],
      ["A.11.2.9", "Clear desk and clear screen policy"],

      // A.12 Operations security
      ["A.12.1.1", "Documented operating procedures"],
      ["A.12.1.2", "Change management"],
      ["A.12.1.3", "Capacity management"],
      ["A.12.1.4", "Separation of development, testing, and operational environments"],
      ["A.12.2.1", "Controls against malware"],
      ["A.12.3.1", "Information backup"],
      ["A.12.4.1", "Event logging"],
      ["A.12.4.2", "Protection of log information"],
      ["A.12.4.3", "Administrator and operator logs"],
      ["A.12.4.4", "Clock synchronisation"],
      ["A.12.5.1", "Installation of software on operational systems"],
      ["A.12.6.1", "Management of technical vulnerabilities"],
      ["A.12.6.2", "Restrictions on software installation"],
      ["A.12.7.1", "Information systems audit controls"],

      // A.13 Communications security
      ["A.13.1.1", "Network controls"],
      ["A.13.1.2", "Security of network services"],
      ["A.13.1.3", "Segregation in networks"],
      ["A.13.2.1", "Information transfer policies and procedures"],
      ["A.13.2.2", "Agreements on information transfer"],
      ["A.13.2.3", "Electronic messaging"],
      ["A.13.2.4", "Confidentiality or nondisclosure agreements"],

      // A.14 System acquisition, development and maintenance
      ["A.14.1.1", "Information security requirements analysis and specification"],
      ["A.14.1.2", "Securing application services on public networks"],
      ["A.14.1.3", "Protecting application services transactions"],
      ["A.14.2.1", "Secure development policy"],
      ["A.14.2.2", "System change control procedures"],
      ["A.14.2.3", "Technical review of applications after operating platform changes"],
      ["A.14.2.4", "Restrictions on changes to software packages"],
      ["A.14.2.5", "Secure system engineering principles"],
      ["A.14.2.6", "Secure development environment"],
      ["A.14.2.7", "Outsourced development"],
      ["A.14.2.8", "System security testing"],
      ["A.14.2.9", "System acceptance testing"],
      ["A.14.3.1", "Protection of test data"],

      // A.15 Supplier relationships
      ["A.15.1.1", "Information security policy for supplier relationships"],
      ["A.15.1.2", "Addressing security within supplier agreements"],
      ["A.15.1.3", "Information and communication technology supply chain"],
      ["A.15.2.1", "Monitoring and review of supplier services"],
      ["A.15.2.2", "Managing changes to supplier services"],

      // A.16 Information security incident management
      ["A.16.1.1", "Responsibilities and procedures"],
      ["A.16.1.2", "Reporting information security events"],
      ["A.16.1.3", "Reporting information security weaknesses"],
      ["A.16.1.4", "Assessment of and decision on information security events"],
      ["A.16.1.5", "Response to information security incidents"],
      ["A.16.1.6", "Learning from information security incidents"],
      ["A.16.1.7", "Collection of evidence"],

      // A.17 Information security aspects of business continuity management
      ["A.17.1.1", "Planning information security continuity"],
      ["A.17.1.2", "Implementing information security continuity"],
      ["A.17.1.3", "Verify, review and evaluate information security continuity"],
      ["A.17.2.1", "Availability of information processing facilities"],

      // A.18 Compliance
      ["A.18.1.1", "Identification of applicable legislation and contractual requirements"],
      ["A.18.1.2", "Intellectual property rights"],
      ["A.18.1.3", "Protection of records"],
      ["A.18.1.4", "Privacy and protection of personally identifiable information"],
      ["A.18.1.5", "Regulation of cryptographic controls"],
      ["A.18.2.1", "Independent review of information security"],
      ["A.18.2.2", "Compliance with security policies and standards"],
      ["A.18.2.3", "Technical compliance review"]
    ]
  },

  "SOC 2": {
    ref: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    controls: [
      // CC1 - Control Environment
      ["CC1.1", "The entity demonstrates a commitment to integrity and ethical values"],
      ["CC1.2", "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control"],
      ["CC1.3", "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives"],
      ["CC1.4", "The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives"],
      ["CC1.5", "The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives"],

      // CC2 - Communication and Information
      ["CC2.1", "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control"],
      ["CC2.2", "The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control"],
      ["CC2.3", "The entity communicates with external parties regarding matters affecting the functioning of internal control"],

      // CC3 - Risk Assessment
      ["CC3.1", "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives"],
      ["CC3.2", "The entity identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed"],
      ["CC3.3", "The entity considers the potential for fraud in assessing risks to the achievement of objectives"],
      ["CC3.4", "The entity identifies and assesses changes that could significantly impact the system of internal control"],

      // CC4 - Monitoring Activities
      ["CC4.1", "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning"],
      ["CC4.2", "The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action, including senior management and the board of directors, as appropriate"],

      // CC5 - Control Activities
      ["CC5.1", "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels"],
      ["CC5.2", "The entity also selects and develops general control activities over technology to support the achievement of objectives"],
      ["CC5.3", "The entity deploys control activities through policies that establish what is expected and in procedures that put policies into action"],

      // CC6 - Logical and Physical Access Controls
      ["CC6.1", "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives"],
      ["CC6.2", "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity"],
      ["CC6.3", "The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles, responsibilities, or the system design and changes"],
      ["CC6.4", "The entity restricts physical access to facilities and protected information assets to authorized personnel to meet the entity's objectives"],
      ["CC6.5", "The entity discontinues logical and physical protections over physical assets only after the ability to read or recover data and software from those assets has been diminished and is no longer required to meet the entity's objectives"],
      ["CC6.6", "The entity implements logical access security measures to protect against threats from sources outside its system boundaries"],
      ["CC6.7", "The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes, and protects it during transmission, movement, or removal to meet the entity's objectives"],
      ["CC6.8", "The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives"],

      // CC7 - System Operations
      ["CC7.1", "To meet its objectives, the entity uses detection and monitoring procedures to identify changes to configurations that result in the introduction of new vulnerabilities, and susceptibilities to newly discovered vulnerabilities"],
      ["CC7.2", "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives; anomalies are analyzed to determine whether they represent security events"],
      ["CC7.3", "The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents) and, if so, takes actions to prevent or address such failures"],
      ["CC7.4", "The entity responds to identified security incidents by executing a defined incident response program to understand, contain, remediate, and communicate security incidents, as appropriate"],
      ["CC7.5", "The entity identifies, develops, and implements activities to recover from identified security incidents"],

      // CC8 - Change Management
      ["CC8.1", "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives"],

      // CC9 - Risk Mitigation
      ["CC9.1", "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions"],
      ["CC9.2", "The entity assesses and manages risks associated with vendors and business partners"],

      // A1 - Availability
      ["A1.1", "The entity maintains, monitors, and evaluates current processing capacity and use of system components (infrastructure, data, and software) to manage capacity demand and to enable the implementation of additional capacity to help meet its objectives"],
      ["A1.2", "The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure to meet its objectives"],
      ["A1.3", "The entity tests recovery plan procedures supporting system recovery to meet its objectives"],

      // C1 - Confidentiality
      ["C1.1", "The entity identifies and maintains confidential information to meet the entity's objectives related to confidentiality"],
      ["C1.2", "The entity disposes of confidential information to meet the entity's objectives related to confidentiality"],

      // PI1 - Processing Integrity
      ["PI1.1", "The entity obtains or generates, uses, and communicates relevant, quality information regarding the objectives related to processing, including definitions of data processed and product and service specifications, to support the use of products and services"],
      ["PI1.2", "The entity implements policies and procedures over system inputs, including controls over completeness and accuracy, to result in products, services, and reporting to meet the entity's objectives"],
      ["PI1.3", "The entity implements policies and procedures over system processing to result in products, services, and reporting to meet the entity's objectives"],
      ["PI1.4", "The entity implements policies and procedures to make available or deliver output completely, accurately, and timely in accordance with specifications to meet the entity's objectives"],
      ["PI1.5", "The entity implements policies and procedures to store inputs, items in processing, and outputs completely, accurately, and timely in accordance with system specifications to meet the entity's objectives"],

      // P1 - Privacy
      ["P1.1", "The entity provides notice to data subjects about its privacy practices to meet the entity's objectives related to privacy"],
      ["P1.2", "The entity communicates choices available regarding the collection, use, retention, disclosure, and disposal of personal information to data subjects to meet the entity's objectives related to privacy"]
    ]
  },

  "HIPAA": {
    ref: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
    controls: [
      // Administrative Safeguards - §164.308
      ["§164.308(a)(1)(i)", "Security Management Process"],
      ["§164.308(a)(1)(ii)(A)", "Risk Analysis"],
      ["§164.308(a)(1)(ii)(B)", "Risk Management"],
      ["§164.308(a)(1)(ii)(C)", "Sanction Policy"],
      ["§164.308(a)(1)(ii)(D)", "Information System Activity Review"],
      ["§164.308(a)(2)", "Assigned Security Responsibility"],
      ["§164.308(a)(3)(i)", "Workforce Security"],
      ["§164.308(a)(3)(ii)(A)", "Authorization and/or Supervision"],
      ["§164.308(a)(3)(ii)(B)", "Workforce Clearance Procedure"],
      ["§164.308(a)(3)(ii)(C)", "Termination Procedures"],
      ["§164.308(a)(4)(i)", "Information Access Management"],
      ["§164.308(a)(4)(ii)(A)", "Isolating Healthcare Clearinghouse Functions"],
      ["§164.308(a)(4)(ii)(B)", "Access Authorization"],
      ["§164.308(a)(4)(ii)(C)", "Access Establishment and Modification"],
      ["§164.308(a)(5)(i)", "Security Awareness and Training"],
      ["§164.308(a)(5)(ii)(A)", "Security Reminders"],
      ["§164.308(a)(5)(ii)(B)", "Protection from Malicious Software"],
      ["§164.308(a)(5)(ii)(C)", "Log-in Monitoring"],
      ["§164.308(a)(5)(ii)(D)", "Password Management"],
      ["§164.308(a)(6)(i)", "Security Incident Procedures"],
      ["§164.308(a)(6)(ii)", "Response and Reporting"],
      ["§164.308(a)(7)(i)", "Contingency Plan"],
      ["§164.308(a)(7)(ii)(A)", "Data Backup Plan"],
      ["§164.308(a)(7)(ii)(B)", "Disaster Recovery Plan"],
      ["§164.308(a)(7)(ii)(C)", "Emergency Mode Operation Plan"],
      ["§164.308(a)(7)(ii)(D)", "Testing and Revision Procedures"],
      ["§164.308(a)(7)(ii)(E)", "Applications and Data Criticality Analysis"],
      ["§164.308(a)(8)", "Evaluation"],

      // Physical Safeguards - §164.310
      ["§164.310(a)(1)", "Facility Access Controls"],
      ["§164.310(a)(2)(i)", "Contingency Operations"],
      ["§164.310(a)(2)(ii)", "Facility Security Plan"],
      ["§164.310(a)(2)(iii)", "Access Control and Validation Procedures"],
      ["§164.310(a)(2)(iv)", "Maintenance Records"],
      ["§164.310(b)", "Workstation Use"],
      ["§164.310(c)", "Workstation Security"],
      ["§164.310(d)(1)", "Device and Media Controls"],
      ["§164.310(d)(2)(i)", "Disposal"],
      ["§164.310(d)(2)(ii)", "Media Re-use"],
      ["§164.310(d)(2)(iii)", "Accountability"],
      ["§164.310(d)(2)(iv)", "Data Backup and Storage"],

      // Technical Safeguards - §164.312
      ["§164.312(a)(1)", "Access Control"],
      ["§164.312(a)(2)(i)", "Unique User Identification"],
      ["§164.312(a)(2)(ii)", "Emergency Access Procedure"],
      ["§164.312(a)(2)(iii)", "Automatic Logoff"],
      ["§164.312(a)(2)(iv)", "Encryption and Decryption"],
      ["§164.312(b)", "Audit Controls"],
      ["§164.312(c)(1)", "Integrity"],
      ["§164.312(c)(2)", "Mechanism to Authenticate Electronic Protected Health Information"],
      ["§164.312(d)", "Person or Entity Authentication"],
      ["§164.312(e)(1)", "Transmission Security"],
      ["§164.312(e)(2)(i)", "Integrity Controls"],
      ["§164.312(e)(2)(ii)", "Encryption"]
    ]
  },

  "PCI DSS": {
    ref: "https://www.pcisecuritystandards.org/document_library/",
    controls: [
      // Requirement 1 - Network Security Controls
      ["1.1", "Processes and mechanisms for installing and maintaining network security controls are defined and understood"],
      ["1.2", "Network security controls are configured and maintained"],
      ["1.3", "Network access to and from the cardholder data environment is restricted"],
      ["1.4", "Network connections between trusted and untrusted networks are controlled"],
      ["1.5", "Risks to the CDE from computing devices that are able to connect to both untrusted networks and the CDE are mitigated"],

      // Requirement 2 - Secure Configurations
      ["2.1", "Processes and mechanisms for applying secure configurations to all system components are defined and understood"],
      ["2.2", "System components are configured and managed securely"],
      ["2.3", "Wireless environments are configured and managed securely"],

      // Requirement 3 - Protect Stored Account Data
      ["3.1", "Processes and mechanisms for protecting stored account data are defined and understood"],
      ["3.2", "Storage of account data is kept to a minimum"],
      ["3.3", "Sensitive authentication data (SAD) is not stored after authorization"],
      ["3.4", "Access to displays of full PAN and ability to copy cardholder data are restricted"],
      ["3.5", "Primary account number (PAN) is secured wherever it is stored"],
      ["3.6", "Cryptographic keys used to protect stored account data are secured"],
      ["3.7", "Where cryptography is used to protect stored account data, key management processes and procedures covering all aspects of the key lifecycle are defined and implemented"],

      // Requirement 4 - Strong Cryptography During Transmission
      ["4.1", "Processes and mechanisms for protecting cardholder data with strong cryptography during transmission over open, public networks are defined and documented"],
      ["4.2", "PAN is protected with strong cryptography during transmission"],

      // Requirement 5 - Protect from Malicious Software
      ["5.1", "Processes and mechanisms for protecting all systems and networks from malicious software are defined and understood"],
      ["5.2", "Malicious software (malware) is prevented, or detected and addressed"],
      ["5.3", "Anti-malware mechanisms and processes are active, maintained, and monitored"],
      ["5.4", "Anti-phishing mechanisms protect users against phishing attacks"],

      // Requirement 6 - Develop and Maintain Secure Systems
      ["6.1", "Processes and mechanisms for developing and maintaining secure systems and software are defined and understood"],
      ["6.2", "Bespoke and custom software are developed securely"],
      ["6.3", "Security vulnerabilities are identified and addressed"],
      ["6.4", "Public-facing web applications are protected against attacks"],
      ["6.5", "Changes to all system components are managed securely"],

      // Requirement 7 - Restrict Access by Business Need to Know
      ["7.1", "Processes and mechanisms for restricting access to system components and cardholder data by business need to know are defined and understood"],
      ["7.2", "Access to system components and data is appropriately defined and assigned"],
      ["7.3", "Access to system components and data is managed via an access control system(s)"],

      // Requirement 8 - Identify Users and Authenticate Access
      ["8.1", "Processes and mechanisms for identifying users and authenticating access to system components are defined and understood"],
      ["8.2", "User identification and related accounts for users and administrators are strictly managed throughout an account's lifecycle"],
      ["8.3", "Strong authentication for users and administrators is established and managed"],
      ["8.4", "Multi-factor authentication (MFA) is implemented to secure access into the CDE"],
      ["8.5", "Multi-factor authentication (MFA) systems are configured to prevent misuse"],
      ["8.6", "Use of application and system accounts and associated authentication factors is strictly managed"],

      // Requirement 9 - Restrict Physical Access
      ["9.1", "Processes and mechanisms for restricting physical access to cardholder data are defined and understood"],
      ["9.2", "Physical access controls manage entry into facilities and systems containing cardholder data"],
      ["9.3", "Physical access for personnel and visitors is authorized and managed"],
      ["9.4", "Media with cardholder data is securely stored, accessed, distributed, and destroyed"],
      ["9.5", "Point of interaction (POI) devices are protected from tampering and unauthorized substitution"],

      // Requirement 10 - Log and Monitor All Access
      ["10.1", "Processes and mechanisms for logging and monitoring all access to system components and cardholder data are defined and documented"],
      ["10.2", "Audit logs are implemented to support the detection of anomalies and suspicious activity"],
      ["10.3", "Audit logs are protected from destruction and unauthorized modifications"],
      ["10.4", "Audit logs are reviewed to identify anomalies or suspicious activity"],
      ["10.5", "Audit log history is retained and available for analysis"],
      ["10.6", "Time-synchronization mechanisms support consistent time settings across all systems"],
      ["10.7", "Failures of critical security control systems are detected, reported, and responded to promptly"],

      // Requirement 11 - Test Security Regularly
      ["11.1", "Processes and mechanisms for regularly testing security of systems and networks are defined and understood"],
      ["11.2", "Wireless access points are identified and monitored, and unauthorized wireless access points are addressed"],
      ["11.3", "External and internal vulnerabilities are regularly identified, prioritized, and addressed"],
      ["11.4", "External and internal penetration testing is regularly performed, and exploitable vulnerabilities and security weaknesses are corrected"],
      ["11.5", "Network intrusions and unexpected file changes are detected and responded to"],
      ["11.6", "Unauthorized changes on payment pages are detected and responded to"],

      // Requirement 12 - Support with Organizational Policies
      ["12.1", "A comprehensive information security policy that governs and provides direction for protection of the entity's information assets is known and current"],
      ["12.2", "Acceptable use policies for end-user technologies are defined and implemented"],
      ["12.3", "Risks to the cardholder data environment are formally identified, evaluated, and managed"],
      ["12.4", "PCI DSS compliance is managed"],
      ["12.5", "PCI DSS scope is documented and validated"],
      ["12.6", "Security awareness education is an ongoing activity"],
      ["12.7", "Personnel are screened to reduce risks from insider threats"],
      ["12.8", "Risk to information assets associated with third-party service provider (TPSP) relationships is managed"],
      ["12.9", "Third-party service providers (TPSPs) support their customers' PCI DSS compliance"],
      ["12.10", "Security incidents and vulnerabilities are responded to promptly"]
    ]
  },

  "GDPR": {
    ref: "https://gdpr-info.eu/",
    controls: [
      // Chapter II - Principles
      ["Art. 5", "Principles relating to processing of personal data"],
      ["Art. 6", "Lawfulness of processing"],
      ["Art. 7", "Conditions for consent"],
      ["Art. 8", "Conditions applicable to child's consent in relation to information society services"],
      ["Art. 9", "Processing of special categories of personal data"],

      // Chapter III - Rights of the data subject
      ["Art. 12", "Transparent information, communication and modalities for the exercise of the rights of the data subject"],
      ["Art. 13", "Information to be provided where personal data are collected from the data subject"],
      ["Art. 14", "Information to be provided where personal data have not been obtained from the data subject"],
      ["Art. 15", "Right of access by the data subject"],
      ["Art. 16", "Right to rectification"],
      ["Art. 17", "Right to erasure (right to be forgotten)"],
      ["Art. 18", "Right to restriction of processing"],
      ["Art. 19", "Notification obligation regarding rectification or erasure of personal data or restriction of processing"],
      ["Art. 20", "Right to data portability"],
      ["Art. 21", "Right to object"],
      ["Art. 22", "Automated individual decision-making, including profiling"],

      // Chapter IV - Controller and processor
      ["Art. 24", "Responsibility of the controller"],
      ["Art. 25", "Data protection by design and by default"],
      ["Art. 26", "Joint controllers"],
      ["Art. 27", "Representatives of controllers or processors not established in the Union"],
      ["Art. 28", "Processor"],
      ["Art. 30", "Records of processing activities"],
      ["Art. 32", "Security of processing"],
      ["Art. 33", "Notification of a personal data breach to the supervisory authority"],
      ["Art. 34", "Communication of a personal data breach to the data subject"],
      ["Art. 35", "Data protection impact assessment"],
      ["Art. 36", "Prior consultation"],
      ["Art. 37", "Designation of the data protection officer"],
      ["Art. 38", "Position of the data protection officer"],
      ["Art. 39", "Tasks of the data protection officer"],

      // Chapter V - Transfers of personal data to third countries
      ["Art. 44", "General principle for transfers"],
      ["Art. 45", "Transfers on the basis of an adequacy decision"],
      ["Art. 46", "Transfers subject to appropriate safeguards"]
    ]
  },

  "CMMC": {
    ref: "https://dodcio.defense.gov/CMMC/",
    controls: [
      // AC - Access Control
      ["AC.L2-3.1.1", "Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems)"],
      ["AC.L2-3.1.2", "Limit system access to the types of transactions and functions that authorized users are permitted to execute"],
      ["AC.L2-3.1.3", "Control the flow of CUI in accordance with approved authorizations"],
      ["AC.L2-3.1.4", "Separate the duties of individuals to reduce the risk of malevolent activity without collusion"],
      ["AC.L2-3.1.5", "Employ the principle of least privilege, including for specific security functions and privileged accounts"],
      ["AC.L2-3.1.6", "Use non-privileged accounts or roles when accessing nonsecurity functions"],
      ["AC.L2-3.1.7", "Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs"],
      ["AC.L2-3.1.8", "Limit unsuccessful logon attempts"],
      ["AC.L2-3.1.9", "Provide privacy and security notices consistent with applicable CUI rules"],
      ["AC.L2-3.1.10", "Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity"],
      ["AC.L2-3.1.11", "Terminate (automatically) a user session after a defined condition"],
      ["AC.L2-3.1.12", "Monitor and control remote access sessions"],
      ["AC.L2-3.1.13", "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions"],
      ["AC.L2-3.1.14", "Route remote access via managed access control points"],
      ["AC.L2-3.1.15", "Authorize remote execution of privileged commands and remote access to security-relevant information"],
      ["AC.L2-3.1.16", "Authorize wireless access prior to allowing such connections"],
      ["AC.L2-3.1.17", "Protect wireless access using authentication and encryption"],
      ["AC.L2-3.1.18", "Control connection of mobile devices"],
      ["AC.L2-3.1.19", "Encrypt CUI on mobile devices and mobile computing platforms"],
      ["AC.L2-3.1.20", "Verify and control/limit connections to and use of external systems"],
      ["AC.L2-3.1.21", "Limit use of portable storage devices on external systems"],
      ["AC.L2-3.1.22", "Control CUI posted or processed on publicly accessible systems"],

      // AT - Awareness & Training
      ["AT.L2-3.2.1", "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems"],
      ["AT.L2-3.2.2", "Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities"],
      ["AT.L2-3.2.3", "Provide security awareness training on recognizing and reporting potential indicators of insider threat"],

      // AU - Audit & Accountability
      ["AU.L2-3.3.1", "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity"],
      ["AU.L2-3.3.2", "Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions"],
      ["AU.L2-3.3.3", "Review and update logged events"],
      ["AU.L2-3.3.4", "Alert in the event of an audit logging process failure"],
      ["AU.L2-3.3.5", "Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity"],
      ["AU.L2-3.3.6", "Provide audit record reduction and report generation to support on-demand analysis and reporting"],
      ["AU.L2-3.3.7", "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records"],
      ["AU.L2-3.3.8", "Protect audit information and audit logging tools from unauthorized access, modification, and deletion"],
      ["AU.L2-3.3.9", "Limit management of audit logging functionality to a subset of privileged users"],

      // CM - Configuration Management
      ["CM.L2-3.4.1", "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles"],
      ["CM.L2-3.4.2", "Establish and enforce security configuration settings for information technology products employed in organizational systems"],
      ["CM.L2-3.4.3", "Track, review, approve or disapprove, and log changes to organizational systems"],
      ["CM.L2-3.4.4", "Analyze the security impact of changes prior to implementation"],
      ["CM.L2-3.4.5", "Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems"],
      ["CM.L2-3.4.6", "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities"],
      ["CM.L2-3.4.7", "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services"],
      ["CM.L2-3.4.8", "Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software"],
      ["CM.L2-3.4.9", "Control and monitor user-installed software"],

      // IA - Identification & Authentication
      ["IA.L2-3.5.1", "Identify system users, processes acting on behalf of users, and devices"],
      ["IA.L2-3.5.2", "Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational systems"],
      ["IA.L2-3.5.3", "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts"],
      ["IA.L2-3.5.4", "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts"],
      ["IA.L2-3.5.5", "Prevent reuse of identifiers for a defined period"],
      ["IA.L2-3.5.6", "Disable identifiers after a defined period of inactivity"],
      ["IA.L2-3.5.7", "Enforce a minimum password complexity and change of characters when new passwords are created"],
      ["IA.L2-3.5.8", "Prohibit password reuse for a specified number of generations"],
      ["IA.L2-3.5.9", "Allow temporary password use for system logons with an immediate change to a permanent password"],
      ["IA.L2-3.5.10", "Store and transmit only cryptographically-protected passwords"],
      ["IA.L2-3.5.11", "Obscure feedback of authentication information"],

      // IR - Incident Response
      ["IR.L2-3.6.1", "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities"],
      ["IR.L2-3.6.2", "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization"],
      ["IR.L2-3.6.3", "Test the organizational incident response capability"],

      // MA - Maintenance
      ["MA.L2-3.7.1", "Perform maintenance on organizational systems"],
      ["MA.L2-3.7.2", "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance"],
      ["MA.L2-3.7.3", "Ensure equipment removed for off-site maintenance is sanitized of any CUI"],
      ["MA.L2-3.7.4", "Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems"],
      ["MA.L2-3.7.5", "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete"],
      ["MA.L2-3.7.6", "Supervise the maintenance activities of maintenance personnel without required access authorization"],

      // MP - Media Protection
      ["MP.L2-3.8.1", "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital"],
      ["MP.L2-3.8.2", "Limit access to CUI on system media to authorized users"],
      ["MP.L2-3.8.3", "Sanitize or destroy system media containing CUI before disposal or release for reuse"],
      ["MP.L2-3.8.4", "Mark media with necessary CUI markings and distribution limitations"],
      ["MP.L2-3.8.5", "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas"],
      ["MP.L2-3.8.6", "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards"],
      ["MP.L2-3.8.7", "Control the use of removable media on system components"],
      ["MP.L2-3.8.8", "Prohibit the use of portable storage devices when such devices have no identifiable owner"],
      ["MP.L2-3.8.9", "Protect the confidentiality of backup CUI at storage locations"],

      // PE - Physical Protection
      ["PE.L2-3.10.1", "Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals"],
      ["PE.L2-3.10.2", "Protect and monitor the physical facility and support infrastructure for organizational systems"],
      ["PE.L2-3.10.3", "Escort visitors and monitor visitor activity"],
      ["PE.L2-3.10.4", "Maintain audit logs of physical access"],
      ["PE.L2-3.10.5", "Control and manage physical access devices"],
      ["PE.L2-3.10.6", "Enforce safeguarding measures for CUI at alternate work sites"],

      // PS - Personnel Security
      ["PS.L2-3.9.1", "Screen individuals prior to authorizing access to organizational systems containing CUI"],
      ["PS.L2-3.9.2", "Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers"],

      // RA - Risk Assessment
      ["RA.L2-3.11.1", "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI"],
      ["RA.L2-3.11.2", "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified"],
      ["RA.L2-3.11.3", "Remediate vulnerabilities in accordance with risk assessments"],

      // CA - Security Assessment
      ["CA.L2-3.12.1", "Periodically assess the security controls in organizational systems to determine if the controls are effective in their application"],
      ["CA.L2-3.12.2", "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems"],
      ["CA.L2-3.12.3", "Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls"],
      ["CA.L2-3.12.4", "Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems"],

      // SC - System & Communications Protection
      ["SC.L2-3.13.1", "Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems"],
      ["SC.L2-3.13.2", "Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems"],
      ["SC.L2-3.13.3", "Separate user functionality from system management functionality"],
      ["SC.L2-3.13.4", "Prevent unauthorized and unintended information transfer via shared system resources"],
      ["SC.L2-3.13.5", "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks"],
      ["SC.L2-3.13.6", "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception)"],
      ["SC.L2-3.13.7", "Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling)"],
      ["SC.L2-3.13.8", "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards"],
      ["SC.L2-3.13.9", "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity"],
      ["SC.L2-3.13.10", "Establish and manage cryptographic keys for cryptography employed in organizational systems"],
      ["SC.L2-3.13.11", "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI"],
      ["SC.L2-3.13.12", "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device"],
      ["SC.L2-3.13.13", "Control and monitor the use of mobile code"],
      ["SC.L2-3.13.14", "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies"],
      ["SC.L2-3.13.15", "Protect the authenticity of communications sessions"],
      ["SC.L2-3.13.16", "Protect the confidentiality of CUI at rest"],

      // SI - System & Information Integrity
      ["SI.L2-3.14.1", "Identify, report, and correct system flaws in a timely manner"],
      ["SI.L2-3.14.2", "Provide protection from malicious code at designated locations within organizational systems"],
      ["SI.L2-3.14.3", "Monitor system security alerts and advisories and take action in response"],
      ["SI.L2-3.14.4", "Update malicious code protection mechanisms when new releases are available"],
      ["SI.L2-3.14.5", "Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed"],
      ["SI.L2-3.14.6", "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks"],
      ["SI.L2-3.14.7", "Identify unauthorized use of organizational systems"]
    ]
  }
};

// ─── Required Governance Documents per Framework ─────────────────────────
// Each item: { t:title, type:document type, fw:{ framework: [controlIds] } }
const GOV_ITEMS = [
  // ── POLICIES ──────────────────────────────────────────────────────────
  {t:"Information Security Policy",type:"Policy",fw:{"NIST CSF":["ID.GV-1"],"ISO 27001":["A.5.1.1","A.5.1.2"],"SOC 2":["CC1.1"],"HIPAA":["§164.308(a)(1)(i)"],"PCI DSS":["Req 12.1"],"GDPR":["Art.24"],"CMMC":["CA.L2-3.12.1"]}},
  {t:"Access Control Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-1","PR.AC-4"],"ISO 27001":["A.9.1.1","A.9.1.2"],"SOC 2":["CC6.1","CC6.2"],"HIPAA":["§164.312(a)(1)"],"PCI DSS":["Req 7.1","Req 8.1"],"GDPR":["Art.32"],"CMMC":["AC.L2-3.1.1","AC.L2-3.1.2"]}},
  {t:"Data Classification Policy",type:"Policy",fw:{"ISO 27001":["A.8.2.1","A.8.2.2"],"SOC 2":["CC6.1"],"PCI DSS":["Req 3.1"],"GDPR":["Art.9"],"CMMC":["MP.L2-3.8.1"]}},
  {t:"Acceptable Use Policy",type:"Policy",fw:{"ISO 27001":["A.8.1.3"],"SOC 2":["CC1.1"],"PCI DSS":["Req 12.2"],"CMMC":["AT.L2-3.2.1"]}},
  {t:"Privacy Policy & Notice",type:"Policy",fw:{"GDPR":["Art.12","Art.13","Art.14"],"HIPAA":["§164.312(c)(1)"],"SOC 2":["P1.1","P1.2"]}},
  {t:"Encryption & Cryptography Policy",type:"Policy",fw:{"ISO 27001":["A.10.1.1","A.10.1.2"],"PCI DSS":["Req 3.5","Req 4.1"],"HIPAA":["§164.312(a)(2)(iv)","§164.312(e)(2)(ii)"],"GDPR":["Art.32"],"CMMC":["SC.L2-3.13.11"]}},
  {t:"Physical Security Policy",type:"Policy",fw:{"ISO 27001":["A.11.1.1","A.11.1.2"],"HIPAA":["§164.310(a)(1)","§164.310(a)(2)(ii)"],"PCI DSS":["Req 9.1"],"CMMC":["PE.L2-3.10.1","PE.L2-3.10.2"]}},
  {t:"Network Security Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-5","PR.PT-4"],"ISO 27001":["A.13.1.1","A.13.1.3"],"PCI DSS":["Req 1.1","Req 1.2"],"CMMC":["SC.L2-3.13.1","SC.L2-3.13.6"]}},
  {t:"Remote Access Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-3"],"ISO 27001":["A.6.2.2"],"PCI DSS":["Req 8.4"],"CMMC":["AC.L2-3.1.12","AC.L2-3.1.14"]}},
  {t:"Password & Authentication Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-1","PR.AC-7"],"ISO 27001":["A.9.3.1","A.9.4.3"],"HIPAA":["§164.308(a)(5)(ii)(D)"],"PCI DSS":["Req 8.2","Req 8.3"],"CMMC":["IA.L2-3.5.7","IA.L2-3.5.8"]}},
  {t:"Change Management Policy",type:"Policy",fw:{"ISO 27001":["A.12.1.2","A.14.2.2"],"SOC 2":["CC8.1"],"PCI DSS":["Req 6.5"],"CMMC":["CM.L2-3.4.3","CM.L2-3.4.4"]}},
  {t:"Vendor & Third-Party Management Policy",type:"Policy",fw:{"NIST CSF":["ID.SC-1","ID.SC-2"],"ISO 27001":["A.15.1.1","A.15.1.2"],"SOC 2":["CC9.1","CC9.2"],"GDPR":["Art.28"],"PCI DSS":["Req 12.8"]}},
  {t:"Data Retention & Disposal Policy",type:"Policy",fw:{"ISO 27001":["A.8.3.1","A.8.3.2"],"HIPAA":["§164.310(d)(2)(i)","§164.310(d)(2)(ii)"],"PCI DSS":["Req 3.1","Req 9.4"],"GDPR":["Art.5","Art.17"],"CMMC":["MP.L2-3.8.3"]}},
  {t:"Mobile Device & BYOD Policy",type:"Policy",fw:{"ISO 27001":["A.6.2.1"],"CMMC":["AC.L2-3.1.18","AC.L2-3.1.19"]}},
  {t:"Security Awareness & Training Policy",type:"Policy",fw:{"NIST CSF":["PR.AT-1","PR.AT-2"],"ISO 27001":["A.7.2.2"],"SOC 2":["CC1.4"],"HIPAA":["§164.308(a)(5)(i)"],"PCI DSS":["Req 12.6"],"CMMC":["AT.L2-3.2.1","AT.L2-3.2.2"]}},
  {t:"Vulnerability Management Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-12"],"ISO 27001":["A.12.6.1"],"PCI DSS":["Req 6.3","Req 11.3"],"CMMC":["SI.L2-3.14.1"]}},
  {t:"Audit Logging & Monitoring Policy",type:"Policy",fw:{"NIST CSF":["DE.CM-1","PR.PT-1"],"ISO 27001":["A.12.4.1","A.12.4.3"],"SOC 2":["CC7.1","CC7.2"],"HIPAA":["§164.312(b)"],"PCI DSS":["Req 10.1","Req 10.2"],"CMMC":["AU.L2-3.3.1","AU.L2-3.3.2"]}},
  {t:"Configuration Management Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-1"],"ISO 27001":["A.12.1.1"],"PCI DSS":["Req 2.1","Req 2.2"],"CMMC":["CM.L2-3.4.1","CM.L2-3.4.2"]}},
  {t:"System Maintenance Policy",type:"Policy",fw:{"NIST CSF":["PR.MA-1","PR.MA-2"],"ISO 27001":["A.11.2.4"],"CMMC":["MA.L2-3.7.1","MA.L2-3.7.2"]}},
  {t:"Supply Chain Risk Management Policy",type:"Policy",fw:{"NIST CSF":["ID.SC-1","ID.SC-3"],"ISO 27001":["A.15.1.3"],"CMMC":["PS.L2-3.9.1"]}},
  {t:"Personnel Security Policy",type:"Policy",fw:{"ISO 27001":["A.7.1.1","A.7.1.2","A.7.3.1"],"HIPAA":["§164.308(a)(3)(i)"],"PCI DSS":["Req 12.7"],"CMMC":["PS.L2-3.9.1","PS.L2-3.9.2"]}},
  {t:"Media Handling & Protection Policy",type:"Policy",fw:{"ISO 27001":["A.8.3.1","A.8.3.3"],"HIPAA":["§164.310(d)(1)"],"PCI DSS":["Req 9.4","Req 9.5"],"CMMC":["MP.L2-3.8.1","MP.L2-3.8.2"]}},
  {t:"Secure Development Lifecycle Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-2"],"ISO 27001":["A.14.2.1","A.14.2.5"],"SOC 2":["CC8.1"],"PCI DSS":["Req 6.1","Req 6.2"],"CMMC":["SI.L2-3.14.1"]}},
  // ── PROCEDURES ────────────────────────────────────────────────────────
  {t:"Incident Response Plan",type:"Procedure",fw:{"NIST CSF":["RS.RP-1","RS.CO-1"],"ISO 27001":["A.16.1.1","A.16.1.5"],"SOC 2":["CC7.3","CC7.4"],"HIPAA":["§164.308(a)(6)(i)","§164.308(a)(6)(ii)"],"PCI DSS":["Req 12.10"],"GDPR":["Art.33","Art.34"],"CMMC":["IR.L2-3.6.1","IR.L2-3.6.2"]}},
  {t:"Business Continuity & Disaster Recovery Plan",type:"Procedure",fw:{"NIST CSF":["RC.RP-1","PR.IP-9"],"ISO 27001":["A.17.1.1","A.17.1.2"],"SOC 2":["A1.2"],"HIPAA":["§164.308(a)(7)(i)","§164.308(a)(7)(ii)(B)"],"PCI DSS":["Req 12.10"],"CMMC":["IR.L2-3.6.1"]}},
  {t:"Risk Assessment Procedure",type:"Procedure",fw:{"NIST CSF":["ID.RA-1","ID.RA-5","ID.RA-6"],"ISO 27001":["A.12.6.1"],"SOC 2":["CC3.1","CC3.2"],"HIPAA":["§164.308(a)(1)(ii)(A)"],"PCI DSS":["Req 12.3"],"GDPR":["Art.35"],"CMMC":["RA.L2-3.11.1"]}},
  {t:"Backup & Recovery Procedure",type:"Procedure",fw:{"NIST CSF":["PR.IP-4"],"ISO 27001":["A.12.3.1"],"HIPAA":["§164.308(a)(7)(ii)(A)"],"PCI DSS":["Req 12.10"]}},
  {t:"Data Breach Notification Procedure",type:"Procedure",fw:{"GDPR":["Art.33","Art.34"],"HIPAA":["§164.308(a)(6)(ii)"],"PCI DSS":["Req 12.10"],"SOC 2":["CC7.4"]}},
  {t:"Data Subject Rights Procedure",type:"Procedure",fw:{"GDPR":["Art.15","Art.16","Art.17","Art.18","Art.20","Art.21"]}},
  {t:"Data Protection Impact Assessment Procedure",type:"Procedure",fw:{"GDPR":["Art.35","Art.36"]}},
  {t:"Security Incident Reporting Procedure",type:"Procedure",fw:{"ISO 27001":["A.16.1.2","A.16.1.3"],"HIPAA":["§164.308(a)(6)(ii)"],"PCI DSS":["Req 12.10"],"CMMC":["IR.L2-3.6.2"]}},
  {t:"User Access Review Procedure",type:"Procedure",fw:{"ISO 27001":["A.9.2.5","A.9.2.6"],"SOC 2":["CC6.2","CC6.3"],"PCI DSS":["Req 7.2"],"CMMC":["AC.L2-3.1.7"]}},
  {t:"Vulnerability Scanning & Penetration Testing Procedure",type:"Procedure",fw:{"ISO 27001":["A.12.6.1"],"PCI DSS":["Req 11.3","Req 11.4"],"CMMC":["RA.L2-3.11.2"]}},
  {t:"System Hardening Procedure",type:"Procedure",fw:{"ISO 27001":["A.12.1.1"],"PCI DSS":["Req 2.2"],"CMMC":["CM.L2-3.4.6","CM.L2-3.4.7"]}},
  {t:"Evidence Collection & Chain of Custody Procedure",type:"Procedure",fw:{"ISO 27001":["A.16.1.7"],"CMMC":["AU.L2-3.3.1"]}},
  {t:"User Registration & De-registration Procedure",type:"Procedure",fw:{"ISO 27001":["A.9.2.1","A.9.2.2"],"SOC 2":["CC6.2"],"HIPAA":["§164.308(a)(4)(ii)(C)"],"CMMC":["AC.L2-3.1.1"]}},
  {t:"Termination & Transfer Procedure",type:"Procedure",fw:{"ISO 27001":["A.7.3.1","A.9.2.6"],"HIPAA":["§164.308(a)(3)(ii)(C)"],"PCI DSS":["Req 8.1"],"CMMC":["PS.L2-3.9.2"]}},
  {t:"Emergency Access Procedure",type:"Procedure",fw:{"HIPAA":["§164.312(a)(2)(ii)"],"ISO 27001":["A.9.4.1"]}},
  {t:"Contingency Plan Testing Procedure",type:"Procedure",fw:{"NIST CSF":["PR.IP-10"],"HIPAA":["§164.308(a)(7)(ii)(D)"],"ISO 27001":["A.17.1.3"]}},
  // ── STANDARDS ─────────────────────────────────────────────────────────
  {t:"Encryption Standards",type:"Standard",fw:{"ISO 27001":["A.10.1.1"],"PCI DSS":["Req 3.5","Req 4.2"],"HIPAA":["§164.312(a)(2)(iv)","§164.312(e)(2)(ii)"],"CMMC":["SC.L2-3.13.11"]}},
  {t:"Secure Coding Standards",type:"Standard",fw:{"ISO 27001":["A.14.2.1","A.14.2.5"],"PCI DSS":["Req 6.2"],"CMMC":["SI.L2-3.14.1"]}},
  {t:"Network Segmentation Standards",type:"Standard",fw:{"PCI DSS":["Req 1.3","Req 1.4"],"ISO 27001":["A.13.1.3"],"CMMC":["SC.L2-3.13.1"]}},
  {t:"Logging & Monitoring Standards",type:"Standard",fw:{"NIST CSF":["DE.AE-3","DE.CM-1"],"ISO 27001":["A.12.4.1","A.12.4.4"],"SOC 2":["CC7.1"],"HIPAA":["§164.312(b)"],"PCI DSS":["Req 10.2","Req 10.3"],"CMMC":["AU.L2-3.3.1","AU.L2-3.3.2"]}},
  {t:"Baseline Configuration Standards",type:"Standard",fw:{"NIST CSF":["PR.IP-1"],"ISO 27001":["A.12.1.1"],"PCI DSS":["Req 2.2"],"CMMC":["CM.L2-3.4.1","CM.L2-3.4.2"]}},
  {t:"Wireless Security Standards",type:"Standard",fw:{"PCI DSS":["Req 2.3","Req 11.2"],"ISO 27001":["A.13.1.2"],"CMMC":["AC.L2-3.1.16","SC.L2-3.13.1"]}},
  // ── PLANS ─────────────────────────────────────────────────────────────
  {t:"Security Assessment Plan",type:"Plan",fw:{"CMMC":["CA.L2-3.12.1","CA.L2-3.12.3"],"NIST CSF":["DE.DP-1","DE.DP-3"],"ISO 27001":["A.18.2.1"]}},
  {t:"System Security Plan",type:"Plan",fw:{"CMMC":["CA.L2-3.12.4"],"NIST CSF":["ID.GV-1"]}},
  {t:"Contingency Plan",type:"Plan",fw:{"HIPAA":["§164.308(a)(7)(i)","§164.308(a)(7)(ii)(C)"],"NIST CSF":["PR.IP-9"]}},
  {t:"Risk Treatment Plan",type:"Plan",fw:{"ISO 27001":["A.5.1.1"],"NIST CSF":["ID.RA-6"],"SOC 2":["CC3.2"]}},
  // ── GUIDELINES ────────────────────────────────────────────────────────
  {t:"Data Handling Guidelines",type:"Guideline",fw:{"GDPR":["Art.5","Art.25"],"HIPAA":["§164.312(c)(1)"],"PCI DSS":["Req 3.1","Req 3.3"]}},
  {t:"Secure Disposal Guidelines",type:"Guideline",fw:{"ISO 27001":["A.11.2.7"],"HIPAA":["§164.310(d)(2)(i)"],"PCI DSS":["Req 9.4"],"CMMC":["MP.L2-3.8.3"]}},
  {t:"Visitor Management Guidelines",type:"Guideline",fw:{"ISO 27001":["A.11.1.2"],"PCI DSS":["Req 9.3"],"CMMC":["PE.L2-3.10.3","PE.L2-3.10.4"]}},
];
