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

  "PCI DSS v4.0": {
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
  },

  "NIST 800-53 Rev 5": {
    ref: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
    controls: [
      // AC – Access Control
      ["AC-1", "Policy and procedures for access control"],
      ["AC-2", "Account management"],
      ["AC-3", "Access enforcement"],
      ["AC-4", "Information flow enforcement"],
      ["AC-5", "Separation of duties"],
      ["AC-6", "Least privilege"],
      ["AC-7", "Unsuccessful logon attempts"],
      ["AC-8", "System use notification"],
      ["AC-9", "Previous logon notification"],
      ["AC-10", "Concurrent session control"],
      ["AC-11", "Device lock"],
      ["AC-12", "Session termination"],
      ["AC-14", "Permitted actions without identification or authentication"],
      ["AC-16", "Security and privacy attributes"],
      ["AC-17", "Remote access"],
      ["AC-18", "Wireless access"],
      ["AC-19", "Access control for mobile devices"],
      ["AC-20", "Use of external systems"],
      ["AC-21", "Information sharing"],
      ["AC-22", "Publicly accessible content"],
      ["AC-23", "Data mining protection"],
      ["AC-24", "Access control decisions"],
      ["AC-25", "Reference monitor"],

      // AT – Awareness and Training
      ["AT-1", "Policy and procedures for awareness and training"],
      ["AT-2", "Literacy training and awareness"],
      ["AT-3", "Role-based training"],
      ["AT-4", "Training records"],
      ["AT-6", "Training feedback"],

      // AU – Audit and Accountability
      ["AU-1", "Policy and procedures for audit and accountability"],
      ["AU-2", "Event logging"],
      ["AU-3", "Content of audit records"],
      ["AU-4", "Audit log storage capacity"],
      ["AU-5", "Response to audit logging process failures"],
      ["AU-6", "Audit record review, analysis, and reporting"],
      ["AU-7", "Audit record reduction and report generation"],
      ["AU-8", "Time stamps"],
      ["AU-9", "Protection of audit information"],
      ["AU-10", "Non-repudiation"],
      ["AU-11", "Audit record retention"],
      ["AU-12", "Audit record generation"],
      ["AU-13", "Monitoring for information disclosure"],
      ["AU-14", "Session audit"],
      ["AU-16", "Cross-organizational audit logging"],

      // CA – Assessment, Authorization, and Monitoring
      ["CA-1", "Policy and procedures for assessment, authorization, and monitoring"],
      ["CA-2", "Control assessments"],
      ["CA-3", "Information exchange"],
      ["CA-5", "Plan of action and milestones"],
      ["CA-6", "Authorization"],
      ["CA-7", "Continuous monitoring"],
      ["CA-8", "Penetration testing"],
      ["CA-9", "Internal system connections"],

      // CM – Configuration Management
      ["CM-1", "Policy and procedures for configuration management"],
      ["CM-2", "Baseline configuration"],
      ["CM-3", "Configuration change control"],
      ["CM-4", "Impact analyses"],
      ["CM-5", "Access restrictions for change"],
      ["CM-6", "Configuration settings"],
      ["CM-7", "Least functionality"],
      ["CM-8", "System component inventory"],
      ["CM-9", "Configuration management plan"],
      ["CM-10", "Software usage restrictions"],
      ["CM-11", "User-installed software"],
      ["CM-12", "Information location"],
      ["CM-13", "Data action mapping"],
      ["CM-14", "Signed components"],

      // CP – Contingency Planning
      ["CP-1", "Policy and procedures for contingency planning"],
      ["CP-2", "Contingency plan"],
      ["CP-3", "Contingency training"],
      ["CP-4", "Contingency plan testing"],
      ["CP-6", "Alternate storage site"],
      ["CP-7", "Alternate processing site"],
      ["CP-8", "Telecommunications services"],
      ["CP-9", "System backup"],
      ["CP-10", "System recovery and reconstitution"],
      ["CP-11", "Alternate communications protocols"],
      ["CP-12", "Safe mode"],
      ["CP-13", "Alternative security mechanisms"],

      // IA – Identification and Authentication
      ["IA-1", "Policy and procedures for identification and authentication"],
      ["IA-2", "Identification and authentication (organizational users)"],
      ["IA-3", "Device identification and authentication"],
      ["IA-4", "Identifier management"],
      ["IA-5", "Authenticator management"],
      ["IA-6", "Authentication feedback"],
      ["IA-7", "Cryptographic module authentication"],
      ["IA-8", "Identification and authentication (non-organizational users)"],
      ["IA-9", "Service identification and authentication"],
      ["IA-10", "Adaptive authentication"],
      ["IA-11", "Re-authentication"],
      ["IA-12", "Identity proofing"],

      // IR – Incident Response
      ["IR-1", "Policy and procedures for incident response"],
      ["IR-2", "Incident response training"],
      ["IR-3", "Incident response testing"],
      ["IR-4", "Incident handling"],
      ["IR-5", "Incident monitoring"],
      ["IR-6", "Incident reporting"],
      ["IR-7", "Incident response assistance"],
      ["IR-8", "Incident response plan"],
      ["IR-9", "Information spillage response"],
      ["IR-10", "Integrated information security analysis team"],

      // MA – Maintenance
      ["MA-1", "Policy and procedures for maintenance"],
      ["MA-2", "Controlled maintenance"],
      ["MA-3", "Maintenance tools"],
      ["MA-4", "Nonlocal maintenance"],
      ["MA-5", "Maintenance personnel"],
      ["MA-6", "Timely maintenance"],
      ["MA-7", "Field maintenance"],

      // MP – Media Protection
      ["MP-1", "Policy and procedures for media protection"],
      ["MP-2", "Media access"],
      ["MP-3", "Media marking"],
      ["MP-4", "Media storage"],
      ["MP-5", "Media transport"],
      ["MP-6", "Media sanitization"],
      ["MP-7", "Media use"],
      ["MP-8", "Media downgrading"],

      // PE – Physical and Environmental Protection
      ["PE-1", "Policy and procedures for physical and environmental protection"],
      ["PE-2", "Physical access authorizations"],
      ["PE-3", "Physical access control"],
      ["PE-4", "Access control for transmission"],
      ["PE-5", "Access control for output devices"],
      ["PE-6", "Monitoring physical access"],
      ["PE-8", "Visitor access records"],
      ["PE-9", "Power equipment and cabling"],
      ["PE-10", "Emergency shutoff"],
      ["PE-11", "Emergency power"],
      ["PE-12", "Emergency lighting"],
      ["PE-13", "Fire protection"],
      ["PE-14", "Environmental controls"],
      ["PE-15", "Water damage protection"],
      ["PE-16", "Delivery and removal"],
      ["PE-17", "Alternate work site"],
      ["PE-18", "Location of system components"],
      ["PE-19", "Information leakage"],
      ["PE-20", "Asset monitoring and tracking"],
      ["PE-21", "Electromagnetic pulse protection"],
      ["PE-22", "Component marking"],
      ["PE-23", "Facility location"],

      // PL – Planning
      ["PL-1", "Policy and procedures for planning"],
      ["PL-2", "System security and privacy plans"],
      ["PL-4", "Rules of behavior"],
      ["PL-7", "Concept of operations"],
      ["PL-8", "Security and privacy architectures"],
      ["PL-9", "Central management"],
      ["PL-10", "Baseline selection"],
      ["PL-11", "Baseline tailoring"],

      // PM – Program Management
      ["PM-1", "Information security program plan"],
      ["PM-2", "Information security program leadership role"],
      ["PM-3", "Information security and privacy resources"],
      ["PM-4", "Plan of action and milestones process"],
      ["PM-5", "System inventory"],
      ["PM-6", "Measures of performance"],
      ["PM-7", "Enterprise architecture"],
      ["PM-8", "Critical infrastructure plan"],
      ["PM-9", "Risk management strategy"],
      ["PM-10", "Authorization process"],
      ["PM-11", "Mission and business process definition"],
      ["PM-12", "Insider threat program"],
      ["PM-13", "Security and privacy workforce"],
      ["PM-14", "Testing, training, and monitoring"],
      ["PM-15", "Security and privacy groups and associations"],
      ["PM-16", "Threat awareness program"],
      ["PM-17", "Protecting controlled unclassified information on external systems"],
      ["PM-18", "Privacy program plan"],
      ["PM-19", "Privacy program leadership role"],
      ["PM-20", "Dissemination of privacy program information"],
      ["PM-21", "Accounting of disclosures"],
      ["PM-22", "Personally identifiable information quality management"],
      ["PM-23", "Data governance body"],
      ["PM-24", "Data integrity board"],
      ["PM-25", "Minimization of personally identifiable information used in testing, training, and research"],
      ["PM-26", "Complaint management"],
      ["PM-27", "Privacy reporting"],
      ["PM-28", "Risk framing"],
      ["PM-29", "Risk management program leadership roles"],
      ["PM-30", "Supply chain risk management strategy"],
      ["PM-31", "Continuous monitoring strategy"],
      ["PM-32", "Purposing"],

      // PS – Personnel Security
      ["PS-1", "Policy and procedures for personnel security"],
      ["PS-2", "Position risk designation"],
      ["PS-3", "Personnel screening"],
      ["PS-4", "Personnel termination"],
      ["PS-5", "Personnel transfer"],
      ["PS-6", "Access agreements"],
      ["PS-7", "External personnel security"],
      ["PS-8", "Personnel sanctions"],
      ["PS-9", "Position descriptions"],

      // PT – PII Processing and Transparency
      ["PT-1", "Policy and procedures for PII processing and transparency"],
      ["PT-2", "Authority to process personally identifiable information"],
      ["PT-3", "Personally identifiable information processing purposes"],
      ["PT-4", "Consent"],
      ["PT-5", "Privacy notice"],
      ["PT-6", "System of records notice"],
      ["PT-7", "Specific categories of personally identifiable information"],
      ["PT-8", "Computer matching requirements"],

      // RA – Risk Assessment
      ["RA-1", "Policy and procedures for risk assessment"],
      ["RA-2", "Security categorization"],
      ["RA-3", "Risk assessment"],
      ["RA-5", "Vulnerability monitoring and scanning"],
      ["RA-6", "Technical surveillance countermeasures survey"],
      ["RA-7", "Risk response"],
      ["RA-8", "Privacy impact assessments"],
      ["RA-9", "Criticality analysis"],
      ["RA-10", "Threat hunting"],

      // SA – System and Services Acquisition
      ["SA-1", "Policy and procedures for system and services acquisition"],
      ["SA-2", "Allocation of resources"],
      ["SA-3", "System development life cycle"],
      ["SA-4", "Acquisition process"],
      ["SA-5", "System documentation"],
      ["SA-8", "Security and privacy engineering principles"],
      ["SA-9", "External system services"],
      ["SA-10", "Developer configuration management"],
      ["SA-11", "Developer testing and evaluation"],
      ["SA-15", "Development process, standards, and tools"],
      ["SA-16", "Developer-provided training"],
      ["SA-17", "Developer security and privacy architecture and design"],
      ["SA-20", "Customized development of critical components"],
      ["SA-21", "Developer screening"],
      ["SA-22", "Unsupported system components"],
      ["SA-23", "Specialization"],

      // SC – System and Communications Protection
      ["SC-1", "Policy and procedures for system and communications protection"],
      ["SC-2", "Separation of system and user functionality"],
      ["SC-3", "Security function isolation"],
      ["SC-4", "Information in shared system resources"],
      ["SC-5", "Denial-of-service protection"],
      ["SC-6", "Resource availability"],
      ["SC-7", "Boundary protection"],
      ["SC-8", "Transmission confidentiality and integrity"],
      ["SC-10", "Network disconnect"],
      ["SC-11", "Trusted path"],
      ["SC-12", "Cryptographic key establishment and management"],
      ["SC-13", "Cryptographic protection"],
      ["SC-15", "Collaborative computing devices and applications"],
      ["SC-16", "Transmission of security and privacy attributes"],
      ["SC-17", "Public key infrastructure certificates"],
      ["SC-18", "Mobile code"],
      ["SC-20", "Secure name/address resolution service (authoritative source)"],
      ["SC-21", "Secure name/address resolution service (recursive or caching resolver)"],
      ["SC-22", "Architecture and provisioning for name/address resolution service"],
      ["SC-23", "Session authenticity"],
      ["SC-24", "Fail in known state"],
      ["SC-25", "Thin nodes"],
      ["SC-26", "Decoys"],
      ["SC-27", "Platform-independent applications"],
      ["SC-28", "Protection of information at rest"],
      ["SC-29", "Heterogeneity"],
      ["SC-30", "Concealment and misdirection"],
      ["SC-31", "Covert channel analysis"],
      ["SC-32", "System partitioning"],
      ["SC-34", "Non-modifiable executable programs"],
      ["SC-35", "External malicious code identification"],
      ["SC-36", "Distributed processing and storage"],
      ["SC-37", "Out-of-band channels"],
      ["SC-38", "Operations security"],
      ["SC-39", "Process isolation"],
      ["SC-40", "Wireless link protection"],
      ["SC-41", "Port and I/O device access"],
      ["SC-42", "Sensor capability and data"],
      ["SC-43", "Usage restrictions"],
      ["SC-44", "Detonation chambers"],
      ["SC-45", "System time synchronization"],
      ["SC-46", "Cross domain policy enforcement"],
      ["SC-47", "Alternate communications paths"],
      ["SC-48", "Sensor relocation"],
      ["SC-49", "Hardware-enforced separation and policy enforcement"],
      ["SC-50", "Software-enforced separation and policy enforcement"],
      ["SC-51", "Hardware-based protection"],

      // SI – System and Information Integrity
      ["SI-1", "Policy and procedures for system and information integrity"],
      ["SI-2", "Flaw remediation"],
      ["SI-3", "Malicious code protection"],
      ["SI-4", "System monitoring"],
      ["SI-5", "Security alerts, advisories, and directives"],
      ["SI-6", "Security and privacy function verification"],
      ["SI-7", "Software, firmware, and information integrity"],
      ["SI-8", "Spam protection"],
      ["SI-10", "Information input validation"],
      ["SI-11", "Error handling"],
      ["SI-12", "Information management and retention"],
      ["SI-13", "Predictable failure prevention"],
      ["SI-14", "Non-persistence"],
      ["SI-15", "Information output filtering"],
      ["SI-16", "Memory protection"],
      ["SI-17", "Fail-safe procedures"],
      ["SI-18", "Personally identifiable information quality operations"],
      ["SI-19", "De-identification"],
      ["SI-20", "Tainting"],
      ["SI-21", "Information refresh"],
      ["SI-22", "Information diversity"],
      ["SI-23", "Information fragmentation"],

      // SR – Supply Chain Risk Management
      ["SR-1", "Policy and procedures for supply chain risk management"],
      ["SR-2", "Supply chain risk management plan"],
      ["SR-3", "Supply chain controls and processes"],
      ["SR-4", "Provenance"],
      ["SR-5", "Acquisition strategies, tools, and methods"],
      ["SR-6", "Supplier assessments and reviews"],
      ["SR-7", "Supply chain operations security"],
      ["SR-8", "Notification agreements"],
      ["SR-9", "Tamper resistance and detection"],
      ["SR-10", "Inspection of systems or components"],
      ["SR-11", "Component authenticity"],
      ["SR-12", "Component disposal"]
    ]
  },

  "NIST CSF 2.0": {
    ref: "https://www.nist.gov/cyberframework",
    controls: [
      // GOVERN (GV) — new in CSF 2.0
      ["GV.OC", "Organizational Context — mission, stakeholders, legal/regulatory and contractual requirements understood"],
      ["GV.RM", "Risk Management Strategy — risk strategy, appetite, tolerance and statements established and communicated"],
      ["GV.RR", "Roles, Responsibilities, and Authorities — leadership accountability and oversight defined"],
      ["GV.PO", "Policy — organizational cybersecurity policy is established, communicated, and enforced"],
      ["GV.OV", "Oversight — strategy outcomes, performance, and risk are reviewed by leadership"],
      ["GV.SC", "Cybersecurity Supply Chain Risk Management — C-SCRM established, managed, and integrated"],
      // IDENTIFY (ID)
      ["ID.AM", "Asset Management — assets that enable the organization are identified and managed"],
      ["ID.RA", "Risk Assessment — cybersecurity risk to assets and operations is understood"],
      ["ID.IM", "Improvement — improvements to organizational cybersecurity practices are identified across all functions"],
      // PROTECT (PR)
      ["PR.AA", "Identity Management, Authentication, and Access Control"],
      ["PR.AT", "Awareness and Training — personnel provided with cybersecurity awareness and training"],
      ["PR.DS", "Data Security — data managed consistent with the org's risk strategy"],
      ["PR.PS", "Platform Security — hardware, software, and services are managed consistent with risk strategy"],
      ["PR.IR", "Technology Infrastructure Resilience — infrastructure managed to protect confidentiality, integrity, and availability and resilience"],
      // DETECT (DE)
      ["DE.CM", "Continuous Monitoring — assets are monitored to find anomalies, indicators of compromise, and other adverse events"],
      ["DE.AE", "Adverse Event Analysis — anomalies and indicators of compromise are analyzed to characterize events"],
      // RESPOND (RS)
      ["RS.MA", "Incident Management — responses to detected cybersecurity incidents are managed"],
      ["RS.AN", "Incident Analysis — investigations conducted to ensure effective response and support recovery"],
      ["RS.CO", "Incident Response Reporting and Communication"],
      ["RS.MI", "Incident Mitigation — activities performed to prevent expansion and resolve incident"],
      // RECOVER (RC)
      ["RC.RP", "Incident Recovery Plan Execution — restoration activities to ensure availability"],
      ["RC.CO", "Incident Recovery Communication — restoration coordinated with internal and external parties"]
    ]
  },

  "TISAX": {
    ref: "https://portal.enx.com/en-US/TISAX/",
    controls: [
      // 1. Information Security Policies and Organization
      ["1.1.1", "To what extent are information security policies available?"],
      ["1.2.1", "To what extent is information security managed within the organization?"],
      ["1.2.2", "To what extent are information security responsibilities organized?"],
      ["1.2.3", "To what extent are information security requirements taken into account in projects?"],
      ["1.2.4", "To what extent are the responsibilities between external IT service providers and the own organization defined?"],
      ["1.3.1", "To what extent is the ISMS scope defined?"],
      ["1.3.2", "To what extent is information security risk management implemented?"],
      ["1.3.3", "To what extent are assessments performed by independent bodies?"],
      ["1.4.1", "To what extent are information security incidents handled?"],
      // 2. Human Resources
      ["2.1.1", "To what extent is the qualification of employees for sensitive work fields ensured?"],
      ["2.1.2", "To what extent is staff bound to comply with information security?"],
      ["2.1.3", "To what extent is staff made aware of and trained on information security risks and topics?"],
      ["2.1.4", "To what extent is teleworking regulated?"],
      // 3. Physical Security and Business Continuity
      ["3.1.1", "To what extent are security zones managed to protect physical assets?"],
      ["3.1.2", "To what extent is mobile IT and mobile data storage protected?"],
      ["3.1.3", "To what extent are business-relevant IT systems protected?"],
      ["3.1.4", "To what extent is business continuity managed in case of failures, emergencies and crises?"],
      // 4. Identity and Access Management
      ["4.1.1", "To what extent is the use of identification means managed?"],
      ["4.1.2", "To what extent is user access to network services, IT systems and IT applications secured?"],
      ["4.1.3", "To what extent are user accounts and login information securely managed and applied?"],
      ["4.2.1", "To what extent are access rights assigned and managed?"],
      // 5. IT Security / Cyber Security
      ["5.1.1", "To what extent are changes managed?"],
      ["5.1.2", "To what extent are development and testing environments separated from production environments?"],
      ["5.2.1", "To what extent is the network of the organization managed?"],
      ["5.2.2", "To what extent are IT systems protected against malware?"],
      ["5.2.3", "To what extent are event logs recorded and analyzed?"],
      ["5.2.4", "To what extent are vulnerabilities identified and addressed?"],
      ["5.2.5", "To what extent are IT systems technically checked (system audit)?"],
      ["5.2.6", "To what extent is the network of the organization protected against attacks from the network?"],
      ["5.2.7", "To what extent is encryption used to protect information?"],
      ["5.3.1", "To what extent is information protected during transfer?"],
      // 6. Supplier Relationships
      ["6.1.1", "To what extent is information security ensured among contractors and cooperation partners?"],
      ["6.1.2", "To what extent is non-disclosure agreement contractually agreed upon?"],
      // 7. Compliance
      ["7.1.1", "To what extent is compliance with regulatory and contractual provisions ensured?"],
      ["7.1.2", "To what extent is the protection of data with special protection requirements ensured?"],
      // 8. Prototype Protection
      ["8.1.1", "To what extent is prototype protection ensured (physical and environmental security)?"],
      ["8.1.2", "To what extent is the handling of vehicles, components and parts containing prototype protection regulated?"],
      ["8.2.1", "To what extent is the protection ensured during testing of vehicles, components, and parts?"],
      ["8.2.2", "To what extent are events (presentations, film and photo shootings) handled with vehicles, components and parts containing prototype information?"],
      // 9. Data Protection
      ["9.1.1", "To what extent are the legal and contractual requirements for processing personal data complied with?"]
    ]
  },

  "HITRUST CSF": {
    ref: "https://hitrustalliance.net/product-tool/hitrust-csf/",
    controls: [
      // 0. Information Security Management Program
      ["00.a", "Information Security Management Program"],
      // 01. Access Control
      ["01.a", "Access Control Policy"],
      ["01.b", "User Registration and De-registration"],
      ["01.c", "Privilege Management"],
      ["01.d", "User Password Management"],
      ["01.e", "Review of User Access Rights"],
      ["01.f", "Password Use"],
      ["01.g", "Unattended User Equipment"],
      ["01.h", "Clear Desk and Clear Screen Policy"],
      ["01.i", "Policy on the Use of Network Services"],
      ["01.j", "User Authentication for External Connections"],
      ["01.k", "Equipment Identification in Networks"],
      ["01.l", "Remote Diagnostic and Configuration Port Protection"],
      ["01.m", "Segregation in Networks"],
      ["01.n", "Network Connection Control"],
      ["01.o", "Network Routing Control"],
      ["01.p", "Secure Log-on Procedures"],
      ["01.q", "User Identification and Authentication"],
      ["01.r", "Password Management System"],
      ["01.s", "Use of System Utilities"],
      ["01.t", "Session Time-out"],
      ["01.u", "Limitation of Connection Time"],
      ["01.v", "Information Access Restriction"],
      ["01.w", "Sensitive System Isolation"],
      ["01.x", "Mobile Computing and Communications"],
      ["01.y", "Teleworking"],
      // 02. Human Resources Security
      ["02.a", "Roles and Responsibilities"],
      ["02.b", "Screening"],
      ["02.c", "Terms and Conditions of Employment"],
      ["02.d", "Management Responsibilities"],
      ["02.e", "Information Security Awareness, Education, and Training"],
      ["02.f", "Disciplinary Process"],
      ["02.g", "Termination or Change of Employment Responsibilities"],
      ["02.h", "Return of Assets"],
      ["02.i", "Removal of Access Rights"],
      // 03. Risk Management
      ["03.a", "Risk Management Program Development"],
      ["03.b", "Performing Risk Assessments"],
      ["03.c", "Risk Mitigation"],
      ["03.d", "Risk Evaluation"],
      // 04. Security Policy
      ["04.a", "Information Security Policy Document"],
      ["04.b", "Review of the Information Security Policy"],
      // 05. Organization of Information Security
      ["05.a", "Management Commitment to Information Security"],
      ["05.b", "Information Security Coordination"],
      ["05.c", "Allocation of Information Security Responsibilities"],
      ["05.d", "Authorization Process for Information Assets and Facilities"],
      ["05.e", "Confidentiality Agreements"],
      ["05.f", "Contact with Authorities"],
      ["05.g", "Contact with Special Interest Groups"],
      ["05.h", "Independent Review of Information Security"],
      ["05.i", "Identification of Risks Related to External Parties"],
      ["05.j", "Addressing Security When Dealing with Customers"],
      ["05.k", "Addressing Security in Third Party Agreements"],
      // 06. Compliance
      ["06.a", "Identification of Applicable Legislation"],
      ["06.b", "Intellectual Property Rights"],
      ["06.c", "Protection of Organizational Records"],
      ["06.d", "Data Protection and Privacy of Covered Information"],
      ["06.e", "Prevention of Misuse of Information Assets"],
      ["06.f", "Regulation of Cryptographic Controls"],
      ["06.g", "Compliance with Security Policies and Standards"],
      ["06.h", "Technical Compliance Checking"],
      ["06.i", "Information Systems Audit Controls"],
      ["06.j", "Protection of Information Systems Audit Tools"],
      // 07. Asset Management
      ["07.a", "Inventory of Assets"],
      ["07.b", "Ownership of Assets"],
      ["07.c", "Acceptable Use of Assets"],
      ["07.d", "Classification Guidelines"],
      ["07.e", "Information Labeling and Handling"],
      // 08. Physical and Environmental Security
      ["08.a", "Physical Security Perimeter"],
      ["08.b", "Physical Entry Controls"],
      ["08.c", "Securing Offices, Rooms, and Facilities"],
      ["08.d", "Protecting Against External and Environmental Threats"],
      ["08.e", "Working in Secure Areas"],
      ["08.f", "Public Access, Delivery, and Loading Areas"],
      ["08.g", "Equipment Siting and Protection"],
      ["08.h", "Supporting Utilities"],
      ["08.i", "Cabling Security"],
      ["08.j", "Equipment Maintenance"],
      ["08.k", "Security of Equipment Off-Premises"],
      ["08.l", "Secure Disposal or Re-use of Equipment"],
      ["08.m", "Removal of Property"],
      // 09. Communications and Operations Management
      ["09.a", "Documented Operating Procedures"],
      ["09.b", "Change Management"],
      ["09.c", "Segregation of Duties"],
      ["09.d", "Separation of Development, Test, and Operational Environments"],
      ["09.e", "Service Delivery"],
      ["09.f", "Monitoring and Review of Third Party Services"],
      ["09.g", "Managing Changes to Third Party Services"],
      ["09.h", "Capacity Management"],
      ["09.i", "System Acceptance"],
      ["09.j", "Controls Against Malicious Code"],
      ["09.k", "Controls Against Mobile Code"],
      ["09.l", "Back-up"],
      ["09.m", "Network Controls"],
      ["09.n", "Security of Network Services"],
      ["09.o", "Management of Removable Media"],
      ["09.p", "Disposal of Media"],
      ["09.q", "Information Handling Procedures"],
      ["09.r", "Security of System Documentation"],
      ["09.s", "Information Exchange Policies and Procedures"],
      ["09.t", "Exchange Agreements"],
      ["09.u", "Physical Media in Transit"],
      ["09.v", "Electronic Messaging"],
      ["09.w", "Interconnected Business Information Systems"],
      ["09.x", "Electronic Commerce Services"],
      ["09.y", "On-line Transactions"],
      ["09.z", "Publicly Available Information"],
      ["09.aa", "Audit Logging"],
      ["09.ab", "Monitoring System Use"],
      ["09.ac", "Protection of Log Information"],
      ["09.ad", "Administrator and Operator Logs"],
      ["09.ae", "Fault Logging"],
      ["09.af", "Clock Synchronization"],
      // 10. Information Systems Acquisition, Development, and Maintenance
      ["10.a", "Security Requirements Analysis and Specification"],
      ["10.b", "Input Data Validation"],
      ["10.c", "Control of Internal Processing"],
      ["10.d", "Message Integrity"],
      ["10.e", "Output Data Validation"],
      ["10.f", "Policy on the Use of Cryptographic Controls"],
      ["10.g", "Key Management"],
      ["10.h", "Control of Operational Software"],
      ["10.i", "Protection of System Test Data"],
      ["10.j", "Access Control to Program Source Code"],
      ["10.k", "Change Control Procedures"],
      ["10.l", "Outsourced Software Development"],
      ["10.m", "Control of Technical Vulnerabilities"],
      // 11. Information Security Incident Management
      ["11.a", "Reporting Information Security Events"],
      ["11.b", "Reporting Security Weaknesses"],
      ["11.c", "Responsibilities and Procedures"],
      ["11.d", "Learning from Information Security Incidents"],
      ["11.e", "Collection of Evidence"],
      // 12. Business Continuity Management
      ["12.a", "Including Information Security in the Business Continuity Management Process"],
      ["12.b", "Business Continuity and Risk Assessment"],
      ["12.c", "Developing and Implementing Continuity Plans Including Information Security"],
      ["12.d", "Business Continuity Planning Framework"],
      ["12.e", "Testing, Maintaining, and Re-assessing Business Continuity Plans"],
      // 13. Privacy Practices
      ["13.a", "Privacy Notice"],
      ["13.b", "Openness and Transparency"],
      ["13.c", "Choice and Consent"],
      ["13.d", "Collection"],
      ["13.e", "Use and Disclosure"],
      ["13.f", "Retention and Disposal"],
      ["13.g", "Quality"],
      ["13.h", "Access by Individuals"],
      ["13.i", "Correction"],
      ["13.j", "Privacy Monitoring and Enforcement"],
      ["13.k", "Privacy Incident Management"]
    ]
  },

  "CCPA": {
    ref: "https://oag.ca.gov/privacy/ccpa",
    controls: [
      // CCPA / CPRA — California Consumer Privacy Act
      ["§1798.100", "General Duties of Businesses That Collect Personal Information"],
      ["§1798.105", "Consumer's Right to Delete Personal Information"],
      ["§1798.106", "Consumer's Right to Correct Inaccurate Personal Information"],
      ["§1798.110", "Consumer's Right to Know What Personal Information Is Being Collected"],
      ["§1798.115", "Consumer's Right to Know What Personal Information Is Sold or Shared and to Whom"],
      ["§1798.120", "Consumer's Right to Opt-Out of Sale or Sharing of Personal Information"],
      ["§1798.121", "Consumer's Right to Limit Use and Disclosure of Sensitive Personal Information"],
      ["§1798.125", "Consumer's Right of No Retaliation Following Opt-Out or Exercise of Other Rights"],
      ["§1798.130", "Notice, Disclosure, Correction, and Deletion Requirements"],
      ["§1798.135", "Methods of Limiting Sale, Sharing, and Use of Personal Information and Use of Sensitive Personal Information"],
      ["§1798.140", "Definitions"],
      ["§1798.145", "Exemptions"],
      ["§1798.150", "Personal Information Security Breaches — Private Right of Action"],
      ["§1798.155", "Administrative Enforcement"],
      ["§1798.185", "Regulations / CPPA Rulemaking"],
      // CPRA additions
      ["CPRA.1", "Establish and maintain a Data Minimization Program"],
      ["CPRA.2", "Implement Purpose Limitation controls for personal information processing"],
      ["CPRA.3", "Conduct annual cybersecurity audits (for high-risk processing)"],
      ["CPRA.4", "Conduct risk assessments for processing that presents significant risk"],
      ["CPRA.5", "Provide opt-out preference signal handling (Global Privacy Control)"],
      ["CPRA.6", "Maintain contracts with service providers, contractors, and third parties"],
      ["CPRA.7", "Honor consumer rights requests within statutory deadlines (45 days, +45 day extension)"],
      ["CPRA.8", "Implement reasonable security procedures and practices"],
      ["CPRA.9", "Provide privacy policy disclosures including categories collected, sold, shared, and retention periods"],
      ["CPRA.10", "Train employees handling consumer requests on CCPA/CPRA requirements"]
    ]
  },

  "NYDFS 500": {
    ref: "https://www.dfs.ny.gov/industry_guidance/cybersecurity",
    controls: [
      // 23 NYCRR Part 500 — Cybersecurity Requirements for Financial Services Companies
      ["500.2", "Cybersecurity Program — Maintain a documented program based on risk assessment"],
      ["500.3", "Cybersecurity Policy — Written policy approved by senior officer or board"],
      ["500.4", "Chief Information Security Officer (CISO) — Designation and reporting"],
      ["500.5", "Vulnerability Management — Penetration testing and vulnerability assessments"],
      ["500.6", "Audit Trail — Maintain systems for reconstruction and detection"],
      ["500.7", "Access Privileges and Management"],
      ["500.8", "Application Security — Secure development practices"],
      ["500.9", "Risk Assessment — Periodic written risk assessments"],
      ["500.10", "Cybersecurity Personnel and Intelligence — Qualified personnel"],
      ["500.11", "Third Party Service Provider Security Policy"],
      ["500.12", "Multi-Factor Authentication — MFA for all individuals accessing internal networks"],
      ["500.13", "Asset Management and Data Retention Requirements"],
      ["500.14", "Monitoring and Training — Monitoring of authorized users; cybersecurity awareness training"],
      ["500.15", "Encryption of Nonpublic Information — In transit and at rest"],
      ["500.16", "Incident Response Plan — Written plan addressing internal processes, communications, recovery"],
      ["500.17", "Notices to Superintendent — 72-hour breach notification; annual certification"],
      ["500.18", "Confidentiality"],
      ["500.19", "Exemptions"],
      ["500.20", "Enforcement"],
      ["500.21", "Effective Date"],
      ["500.22", "Transitional Periods"],
      ["500.23", "Severability"]
    ]
  }
};

// ─── Required Governance Documents per Framework ─────────────────────────
// Each item: { t:title, type:document type, fw:{ framework: [controlIds] } }
const GOV_ITEMS = [
  // ── POLICIES ──────────────────────────────────────────────────────────
  {t:"Information Security Policy",type:"Policy",fw:{"NIST CSF":["ID.GV-1"],"ISO 27001":["A.5.1.1","A.5.1.2"],"SOC 2":["CC1.1"],"HIPAA":["§164.308(a)(1)(i)"],"PCI DSS v4.0":["Req 12.1"],"GDPR":["Art.24"],"CMMC":["CA.L2-3.12.1"],"NIST 800-53 Rev 5":["PM-1","PL-1"]},reqs:["Management-approved information security policy document exists","Policy defines scope, objectives, and principles of information security","Roles and responsibilities for information security are defined","Policy is communicated to all employees and relevant external parties","Policy is reviewed at least annually or after significant changes"]},
  {t:"Access Control Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-1","PR.AC-4"],"ISO 27001":["A.9.1.1","A.9.1.2"],"SOC 2":["CC6.1","CC6.2"],"HIPAA":["§164.312(a)(1)"],"PCI DSS v4.0":["Req 7.1","Req 8.1"],"GDPR":["Art.32"],"CMMC":["AC.L2-3.1.1","AC.L2-3.1.2"],"NIST 800-53 Rev 5":["AC-1","AC-2","AC-3","AC-5","AC-6"]},reqs:["Least privilege principle is documented and enforced","Access provisioning and de-provisioning processes are defined","Periodic access reviews are conducted and documented","Privileged account management procedures are specified","Separation of duties requirements are documented"]},
  {t:"Data Classification Policy",type:"Policy",fw:{"ISO 27001":["A.8.2.1","A.8.2.2"],"SOC 2":["CC6.1"],"PCI DSS v4.0":["Req 3.1"],"GDPR":["Art.9"],"CMMC":["MP.L2-3.8.1"],"NIST 800-53 Rev 5":["RA-2","MP-3"]},reqs:["Data classification levels are defined with clear criteria","Labeling and handling requirements exist for each classification level","Data owners are assigned and documented for all data assets","Classification review process is defined and performed periodically","Procedures for reclassification and declassification are documented"]},
  {t:"Acceptable Use Policy",type:"Policy",fw:{"ISO 27001":["A.8.1.3"],"SOC 2":["CC1.1"],"PCI DSS v4.0":["Req 12.2"],"CMMC":["AT.L2-3.2.1"],"NIST 800-53 Rev 5":["PL-4"]},reqs:["Permitted and prohibited uses of organizational assets are defined","Employee acknowledgment records are maintained","Policy covers internet, email, social media, and personal device usage","Consequences for policy violations are specified","Policy is reviewed and updated at least annually"]},
  {t:"Privacy Policy & Notice",type:"Policy",fw:{"GDPR":["Art.12","Art.13","Art.14"],"HIPAA":["§164.312(c)(1)"],"SOC 2":["P1.1","P1.2"],"NIST 800-53 Rev 5":["PT-5","PT-1"]},reqs:["Privacy notice is publicly accessible and written in clear language","Legal basis for each data processing activity is documented","Data subject rights and how to exercise them are described","Data retention periods are specified for each data category","Contact details of the data protection officer or privacy team are provided"]},
  {t:"Encryption & Cryptography Policy",type:"Policy",fw:{"ISO 27001":["A.10.1.1","A.10.1.2"],"PCI DSS v4.0":["Req 3.5","Req 4.1"],"HIPAA":["§164.312(a)(2)(iv)","§164.312(e)(2)(ii)"],"GDPR":["Art.32"],"CMMC":["SC.L2-3.13.11"],"NIST 800-53 Rev 5":["SC-12","SC-13"]},reqs:["Approved cryptographic algorithms and minimum key lengths are specified","Key management lifecycle procedures are documented","Encryption requirements for data at rest and in transit are defined","Crypto key custodian roles and responsibilities are assigned","Policy mandates use of FIPS-validated or equivalent cryptographic modules"]},
  {t:"Physical Security Policy",type:"Policy",fw:{"ISO 27001":["A.11.1.1","A.11.1.2"],"HIPAA":["§164.310(a)(1)","§164.310(a)(2)(ii)"],"PCI DSS v4.0":["Req 9.1"],"CMMC":["PE.L2-3.10.1","PE.L2-3.10.2"],"NIST 800-53 Rev 5":["PE-1","PE-2","PE-3"]},reqs:["Physical security perimeters and secure areas are defined","Physical access control mechanisms are documented","Visitor management procedures are specified","Physical access logs are maintained and reviewed","Environmental controls for server rooms and data centers are documented"]},
  {t:"Network Security Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-5","PR.PT-4"],"ISO 27001":["A.13.1.1","A.13.1.3"],"PCI DSS v4.0":["Req 1.1","Req 1.2"],"CMMC":["SC.L2-3.13.1","SC.L2-3.13.6"],"NIST 800-53 Rev 5":["SC-7","SC-1","AC-4"]},reqs:["Network architecture diagram exists and is current","Firewall and router rule sets are documented and reviewed","Network segmentation requirements are defined","Default-deny rules are implemented at network boundaries","Network security controls are tested at least annually"]},
  {t:"Remote Access Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-3"],"ISO 27001":["A.6.2.2"],"PCI DSS v4.0":["Req 8.4"],"CMMC":["AC.L2-3.1.12","AC.L2-3.1.14"],"NIST 800-53 Rev 5":["AC-17","AC-1"]},reqs:["Approved remote access methods and technologies are specified","Multi-factor authentication is required for all remote access","VPN or encrypted tunnel requirements are documented","Remote session timeout and monitoring requirements are defined","Remote access authorization and revocation process is documented"]},
  {t:"Password & Authentication Policy",type:"Policy",fw:{"NIST CSF":["PR.AC-1","PR.AC-7"],"ISO 27001":["A.9.3.1","A.9.4.3"],"HIPAA":["§164.308(a)(5)(ii)(D)"],"PCI DSS v4.0":["Req 8.2","Req 8.3"],"CMMC":["IA.L2-3.5.7","IA.L2-3.5.8"],"NIST 800-53 Rev 5":["IA-1","IA-5","IA-2"]},reqs:["Minimum password complexity and length requirements are specified","Account lockout thresholds and duration are defined","Multi-factor authentication requirements are documented","Password history and expiration rules are specified","Service account and shared credential management procedures exist"]},
  {t:"Change Management Policy",type:"Policy",fw:{"ISO 27001":["A.12.1.2","A.14.2.2"],"SOC 2":["CC8.1"],"PCI DSS v4.0":["Req 6.5"],"CMMC":["CM.L2-3.4.3","CM.L2-3.4.4"],"NIST 800-53 Rev 5":["CM-3","CM-4"]},reqs:["Change request, approval, and documentation process is defined","Impact analysis is required before changes are implemented","Rollback procedures are documented for all changes","Emergency change process is defined with post-implementation review","Change log is maintained with approver, date, and description"]},
  {t:"Vendor & Third-Party Management Policy",type:"Policy",fw:{"NIST CSF":["ID.SC-1","ID.SC-2"],"ISO 27001":["A.15.1.1","A.15.1.2"],"SOC 2":["CC9.1","CC9.2"],"GDPR":["Art.28"],"PCI DSS v4.0":["Req 12.8"],"NIST 800-53 Rev 5":["SR-1","SR-6","SA-9"]},reqs:["Vendor risk assessment process is documented","Security requirements are included in vendor contracts","Periodic vendor security reviews are conducted and documented","Vendor inventory with risk ratings is maintained","Data processing agreements exist for all vendors handling sensitive data"]},
  {t:"Data Retention & Disposal Policy",type:"Policy",fw:{"ISO 27001":["A.8.3.1","A.8.3.2"],"HIPAA":["§164.310(d)(2)(i)","§164.310(d)(2)(ii)"],"PCI DSS v4.0":["Req 3.1","Req 9.4"],"GDPR":["Art.5","Art.17"],"CMMC":["MP.L2-3.8.3"],"NIST 800-53 Rev 5":["SI-12","MP-6"]},reqs:["Retention periods are defined for each data type and legal basis","Approved data destruction methods are specified for each media type","Disposal certificates or proof of destruction are maintained","Automated retention enforcement mechanisms are documented","Exceptions process for extended retention is defined"]},
  {t:"Mobile Device & BYOD Policy",type:"Policy",fw:{"ISO 27001":["A.6.2.1"],"CMMC":["AC.L2-3.1.18","AC.L2-3.1.19"],"NIST 800-53 Rev 5":["AC-19","AC-18"]},reqs:["Approved mobile device types and operating systems are specified","Mobile device management (MDM) enrollment is required","Encryption requirements for mobile devices are defined","Remote wipe capability is documented and tested","BYOD acceptable use and data separation requirements are specified"]},
  {t:"Security Awareness & Training Policy",type:"Policy",fw:{"NIST CSF":["PR.AT-1","PR.AT-2"],"ISO 27001":["A.7.2.2"],"SOC 2":["CC1.4"],"HIPAA":["§164.308(a)(5)(i)"],"PCI DSS v4.0":["Req 12.6"],"CMMC":["AT.L2-3.2.1","AT.L2-3.2.2"],"NIST 800-53 Rev 5":["AT-1","AT-2","AT-3"]},reqs:["Annual security awareness training is mandatory for all employees","Training completion records are tracked and maintained","Role-based training is provided for privileged and technical staff","Phishing simulation exercises are conducted periodically","New hire security training is completed within 30 days of start date"]},
  {t:"Vulnerability Management Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-12"],"ISO 27001":["A.12.6.1"],"PCI DSS v4.0":["Req 6.3","Req 11.3"],"CMMC":["SI.L2-3.14.1"],"NIST 800-53 Rev 5":["RA-5","SI-2"]},reqs:["Vulnerability scanning frequency and scope are defined","Risk-based remediation timelines are specified by severity level","Patch management process and SLAs are documented","Exception and risk acceptance process for unpatched vulnerabilities exists","Vulnerability scan results and remediation tracking are maintained"]},
  {t:"Audit Logging & Monitoring Policy",type:"Policy",fw:{"NIST CSF":["DE.CM-1","PR.PT-1"],"ISO 27001":["A.12.4.1","A.12.4.3"],"SOC 2":["CC7.1","CC7.2"],"HIPAA":["§164.312(b)"],"PCI DSS v4.0":["Req 10.1","Req 10.2"],"CMMC":["AU.L2-3.3.1","AU.L2-3.3.2"],"NIST 800-53 Rev 5":["AU-1","AU-2","AU-3","AU-12"]},reqs:["Auditable events and log contents are defined","Log retention periods and storage requirements are specified","Log integrity protection and tamper-detection mechanisms are defined","Log review frequency and responsible roles are assigned","Alerting thresholds and escalation procedures are documented"]},
  {t:"Configuration Management Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-1"],"ISO 27001":["A.12.1.1"],"PCI DSS v4.0":["Req 2.1","Req 2.2"],"CMMC":["CM.L2-3.4.1","CM.L2-3.4.2"],"NIST 800-53 Rev 5":["CM-1","CM-2","CM-6"]},reqs:["Baseline configurations are established for all system types","Default credentials and unnecessary services must be removed or disabled","Configuration drift detection and remediation process is defined","Approved software and hardware inventories are maintained","Configuration change approval workflow is documented"]},
  {t:"System Maintenance Policy",type:"Policy",fw:{"NIST CSF":["PR.MA-1","PR.MA-2"],"ISO 27001":["A.11.2.4"],"CMMC":["MA.L2-3.7.1","MA.L2-3.7.2"],"NIST 800-53 Rev 5":["MA-1","MA-2","MA-4"]},reqs:["Scheduled maintenance windows and approval process are defined","Maintenance activities are logged with date, personnel, and actions taken","Remote maintenance requires multi-factor authentication","Maintenance tools and media are controlled and inspected","Maintenance personnel without access authorization are supervised"]},
  {t:"Supply Chain Risk Management Policy",type:"Policy",fw:{"NIST CSF":["ID.SC-1","ID.SC-3"],"ISO 27001":["A.15.1.3"],"CMMC":["PS.L2-3.9.1"],"NIST 800-53 Rev 5":["SR-1","SR-2","SR-3"]},reqs:["Supply chain risk assessment methodology is documented","Critical suppliers and components are identified and prioritized","Security requirements are included in supplier contracts","Supply chain incident response and notification procedures exist","Periodic supply chain risk reviews are conducted and documented"]},
  {t:"Personnel Security Policy",type:"Policy",fw:{"ISO 27001":["A.7.1.1","A.7.1.2","A.7.3.1"],"HIPAA":["§164.308(a)(3)(i)"],"PCI DSS v4.0":["Req 12.7"],"CMMC":["PS.L2-3.9.1","PS.L2-3.9.2"],"NIST 800-53 Rev 5":["PS-1","PS-3","PS-4"]},reqs:["Background screening requirements are defined for all roles","Security responsibilities are included in employment terms","Termination and transfer procedures address access revocation","Disciplinary process for security violations is documented","Security obligations that remain valid after employment are specified"]},
  {t:"Media Handling & Protection Policy",type:"Policy",fw:{"ISO 27001":["A.8.3.1","A.8.3.3"],"HIPAA":["§164.310(d)(1)"],"PCI DSS v4.0":["Req 9.4","Req 9.5"],"CMMC":["MP.L2-3.8.1","MP.L2-3.8.2"],"NIST 800-53 Rev 5":["MP-1","MP-2","MP-6"]},reqs:["Approved media types and handling procedures are defined","Media transport and storage security requirements are specified","Removable media usage restrictions are documented","Media sanitization procedures are defined for each media type","Media inventory and chain of custody tracking is maintained"]},
  {t:"Secure Development Lifecycle Policy",type:"Policy",fw:{"NIST CSF":["PR.IP-2"],"ISO 27001":["A.14.2.1","A.14.2.5"],"SOC 2":["CC8.1"],"PCI DSS v4.0":["Req 6.1","Req 6.2"],"CMMC":["SI.L2-3.14.1"],"NIST 800-53 Rev 5":["SA-3","SA-8","SA-11"]},reqs:["Secure SDLC phases and security gates are defined","Code review and static analysis requirements are specified","Security testing is required before production deployment","Separation of development, testing, and production environments is enforced","Developer security training requirements are documented"]},
  // ── PROCEDURES ────────────────────────────────────────────────────────
  {t:"Incident Response Plan",type:"Procedure",fw:{"NIST CSF":["RS.RP-1","RS.CO-1"],"ISO 27001":["A.16.1.1","A.16.1.5"],"SOC 2":["CC7.3","CC7.4"],"HIPAA":["§164.308(a)(6)(i)","§164.308(a)(6)(ii)"],"PCI DSS v4.0":["Req 12.10"],"GDPR":["Art.33","Art.34"],"CMMC":["IR.L2-3.6.1","IR.L2-3.6.2"],"NIST 800-53 Rev 5":["IR-1","IR-4","IR-8"]},reqs:["Incident classification and severity levels are defined","Escalation procedures and contact lists are documented","Communication plan for internal and external stakeholders exists","Post-incident review and lessons-learned process is defined","Plan has been tested via tabletop or simulation within the last 12 months","Roles and responsibilities for incident response team are assigned"]},
  {t:"Business Continuity & Disaster Recovery Plan",type:"Procedure",fw:{"NIST CSF":["RC.RP-1","PR.IP-9"],"ISO 27001":["A.17.1.1","A.17.1.2"],"SOC 2":["A1.2"],"HIPAA":["§164.308(a)(7)(i)","§164.308(a)(7)(ii)(B)"],"PCI DSS v4.0":["Req 12.10"],"CMMC":["IR.L2-3.6.1"],"NIST 800-53 Rev 5":["CP-1","CP-2","CP-10"]},reqs:["Recovery time objectives (RTO) and recovery point objectives (RPO) are defined","Critical business functions and dependencies are identified","Plan has been tested within the last 12 months with documented results","Alternate processing site and communication procedures are documented","Plan includes roles, responsibilities, and emergency contact information","Plan is reviewed and updated at least annually"]},
  {t:"Risk Assessment Procedure",type:"Procedure",fw:{"NIST CSF":["ID.RA-1","ID.RA-5","ID.RA-6"],"ISO 27001":["A.12.6.1"],"SOC 2":["CC3.1","CC3.2"],"HIPAA":["§164.308(a)(1)(ii)(A)"],"PCI DSS v4.0":["Req 12.3"],"GDPR":["Art.35"],"CMMC":["RA.L2-3.11.1"],"NIST 800-53 Rev 5":["RA-1","RA-3","RA-5"]},reqs:["Risk assessment methodology with scoring criteria is documented","Asset inventory used for scoping is current and complete","Threat identification and vulnerability analysis steps are defined","Risk scoring considers both likelihood and impact","Risk register is maintained and reviewed at least annually","Risk treatment options and residual risk acceptance process are documented"]},
  {t:"Backup & Recovery Procedure",type:"Procedure",fw:{"NIST CSF":["PR.IP-4"],"ISO 27001":["A.12.3.1"],"HIPAA":["§164.308(a)(7)(ii)(A)"],"PCI DSS v4.0":["Req 12.10"],"NIST 800-53 Rev 5":["CP-9","CP-10"]},reqs:["Backup frequency and scope for each system are defined","Backup media is stored securely at an offsite or separate location","Backup restoration tests are performed and documented periodically","Backup encryption requirements are specified","Backup monitoring and failure alerting procedures are in place"]},
  {t:"Data Breach Notification Procedure",type:"Procedure",fw:{"GDPR":["Art.33","Art.34"],"HIPAA":["§164.308(a)(6)(ii)"],"PCI DSS v4.0":["Req 12.10"],"SOC 2":["CC7.4"],"NIST 800-53 Rev 5":["IR-6","IR-8"]},reqs:["Breach assessment criteria and severity classification are defined","Notification timelines for regulators and affected individuals are specified","Notification templates and communication channels are prepared","Roles responsible for breach assessment and notification are assigned","Breach log documenting all incidents and notifications is maintained"]},
  {t:"Data Subject Rights Procedure",type:"Procedure",fw:{"GDPR":["Art.15","Art.16","Art.17","Art.18","Art.20","Art.21"],"NIST 800-53 Rev 5":["PT-4","PT-5"]},reqs:["Process for receiving and verifying data subject requests is documented","Response timelines for each right type are specified","Procedures for access, rectification, erasure, and portability are defined","Request tracking log with status and completion dates is maintained","Escalation process for complex or denied requests is documented"]},
  {t:"Data Protection Impact Assessment Procedure",type:"Procedure",fw:{"GDPR":["Art.35","Art.36"],"NIST 800-53 Rev 5":["RA-8"]},reqs:["Criteria for when a DPIA is required are defined","DPIA template with risk assessment methodology exists","Consultation process with the DPO is documented","Prior consultation triggers with supervisory authority are specified","Completed DPIAs are archived with mitigation actions tracked"]},
  {t:"Security Incident Reporting Procedure",type:"Procedure",fw:{"ISO 27001":["A.16.1.2","A.16.1.3"],"HIPAA":["§164.308(a)(6)(ii)"],"PCI DSS v4.0":["Req 12.10"],"CMMC":["IR.L2-3.6.2"],"NIST 800-53 Rev 5":["IR-6","IR-7"]},reqs:["Reporting channels and contact points are defined and accessible","Incident reporting form or template is available to all staff","Timelines for initial reporting are specified","Procedure covers both security events and suspected weaknesses","Whistleblower and anonymous reporting options are documented"]},
  {t:"User Access Review Procedure",type:"Procedure",fw:{"ISO 27001":["A.9.2.5","A.9.2.6"],"SOC 2":["CC6.2","CC6.3"],"PCI DSS v4.0":["Req 7.2"],"CMMC":["AC.L2-3.1.7"],"NIST 800-53 Rev 5":["AC-2","AC-6"]},reqs:["Access review frequency is defined for each system and role type","Reviewers and approvers for each system are assigned","Orphaned and dormant account detection process is documented","Review results and remediation actions are recorded","Privileged access is reviewed more frequently than standard access"]},
  {t:"Vulnerability Scanning & Penetration Testing Procedure",type:"Procedure",fw:{"ISO 27001":["A.12.6.1"],"PCI DSS v4.0":["Req 11.3","Req 11.4"],"CMMC":["RA.L2-3.11.2"],"NIST 800-53 Rev 5":["RA-5","CA-8"]},reqs:["Scanning scope, frequency, and tools are defined","Internal and external scan schedules are documented","Penetration test scope and rules of engagement are defined","Findings are risk-ranked and remediation timelines are assigned","Rescan or retest validates remediation of critical findings","Reports are retained and shared with relevant stakeholders"]},
  {t:"System Hardening Procedure",type:"Procedure",fw:{"ISO 27001":["A.12.1.1"],"PCI DSS v4.0":["Req 2.2"],"CMMC":["CM.L2-3.4.6","CM.L2-3.4.7"],"NIST 800-53 Rev 5":["CM-2","CM-6","CM-7"]},reqs:["Hardening checklists or benchmarks are defined for each OS and platform","Unnecessary services, ports, and protocols are disabled","Default accounts and passwords are changed or removed","Hardening compliance is verified before production deployment","Hardening standards are reviewed and updated at least annually"]},
  {t:"Evidence Collection & Chain of Custody Procedure",type:"Procedure",fw:{"ISO 27001":["A.16.1.7"],"CMMC":["AU.L2-3.3.1"],"NIST 800-53 Rev 5":["AU-9","IR-4"]},reqs:["Evidence collection methods and tools are specified","Chain of custody log template with required fields exists","Evidence storage and integrity protection requirements are defined","Roles authorized to collect and handle evidence are designated","Procedure aligns with legal and regulatory admissibility requirements"]},
  {t:"User Registration & De-registration Procedure",type:"Procedure",fw:{"ISO 27001":["A.9.2.1","A.9.2.2"],"SOC 2":["CC6.2"],"HIPAA":["§164.308(a)(4)(ii)(C)"],"CMMC":["AC.L2-3.1.1"],"NIST 800-53 Rev 5":["AC-2","IA-4"]},reqs:["Step-by-step account creation and approval workflow is documented","Unique user ID assignment process is defined","Account de-registration triggers and timelines are specified","Manager or data owner approval is required before access is granted","Account provisioning and de-provisioning logs are maintained"]},
  {t:"Termination & Transfer Procedure",type:"Procedure",fw:{"ISO 27001":["A.7.3.1","A.9.2.6"],"HIPAA":["§164.308(a)(3)(ii)(C)"],"PCI DSS v4.0":["Req 8.1"],"CMMC":["PS.L2-3.9.2"],"NIST 800-53 Rev 5":["PS-4","PS-5"]},reqs:["Access revocation checklist and timeline for terminations is documented","Asset return process including devices and badges is defined","Transfer procedure addresses role-based access changes","HR and IT coordination workflow is documented","Termination completion records with sign-off are maintained"]},
  {t:"Emergency Access Procedure",type:"Procedure",fw:{"HIPAA":["§164.312(a)(2)(ii)"],"ISO 27001":["A.9.4.1"],"NIST 800-53 Rev 5":["AC-14","AC-2"]},reqs:["Emergency access triggers and authorization criteria are defined","Break-glass account procedures and credentials are documented","All emergency access usage is logged and reviewed post-event","Emergency access is revoked immediately after the emergency ends","Post-event review and documentation process is specified"]},
  {t:"Contingency Plan Testing Procedure",type:"Procedure",fw:{"NIST CSF":["PR.IP-10"],"HIPAA":["§164.308(a)(7)(ii)(D)"],"ISO 27001":["A.17.1.3"],"NIST 800-53 Rev 5":["CP-4","CP-3"]},reqs:["Testing schedule and frequency are defined","Test scenarios and success criteria are documented","Test results and findings are recorded","Lessons learned are incorporated into plan updates","Roles and participants for each test exercise are assigned"]},
  // ── STANDARDS ─────────────────────────────────────────────────────────
  {t:"Encryption Standards",type:"Standard",fw:{"ISO 27001":["A.10.1.1"],"PCI DSS v4.0":["Req 3.5","Req 4.2"],"HIPAA":["§164.312(a)(2)(iv)","§164.312(e)(2)(ii)"],"CMMC":["SC.L2-3.13.11"],"NIST 800-53 Rev 5":["SC-12","SC-13"]},reqs:["Approved encryption algorithms and minimum key lengths are listed","Key management procedures including generation and rotation are defined","TLS/SSL minimum version requirements are specified","Exceptions process for legacy or non-compliant systems is documented","Standards are reviewed when new cryptographic advisories are issued"]},
  {t:"Secure Coding Standards",type:"Standard",fw:{"ISO 27001":["A.14.2.1","A.14.2.5"],"PCI DSS v4.0":["Req 6.2"],"CMMC":["SI.L2-3.14.1"],"NIST 800-53 Rev 5":["SA-8","SA-11","SI-10"]},reqs:["OWASP Top 10 or equivalent vulnerability categories are addressed","Input validation and output encoding requirements are specified","Secure dependency management and third-party library policies exist","Code review checklists with security criteria are documented","Secrets management and credential handling rules are defined"]},
  {t:"Network Segmentation Standards",type:"Standard",fw:{"PCI DSS v4.0":["Req 1.3","Req 1.4"],"ISO 27001":["A.13.1.3"],"CMMC":["SC.L2-3.13.1"],"NIST 800-53 Rev 5":["SC-7","SC-32"]},reqs:["Network zones and trust boundaries are defined and documented","Segmentation rules between zones are specified","Segmentation effectiveness is tested at least annually","DMZ requirements for public-facing systems are documented","Inter-zone traffic monitoring and logging requirements are specified"]},
  {t:"Logging & Monitoring Standards",type:"Standard",fw:{"NIST CSF":["DE.AE-3","DE.CM-1"],"ISO 27001":["A.12.4.1","A.12.4.4"],"SOC 2":["CC7.1"],"HIPAA":["§164.312(b)"],"PCI DSS v4.0":["Req 10.2","Req 10.3"],"CMMC":["AU.L2-3.3.1","AU.L2-3.3.2"],"NIST 800-53 Rev 5":["AU-2","AU-3","AU-8","AU-12"]},reqs:["Required log event types and fields are specified per system type","Log aggregation and centralized SIEM requirements are defined","Time synchronization standards (NTP) for all systems are specified","Log retention periods meet regulatory and business requirements","Alert rules and thresholds for anomalous activity are documented"]},
  {t:"Baseline Configuration Standards",type:"Standard",fw:{"NIST CSF":["PR.IP-1"],"ISO 27001":["A.12.1.1"],"PCI DSS v4.0":["Req 2.2"],"CMMC":["CM.L2-3.4.1","CM.L2-3.4.2"],"NIST 800-53 Rev 5":["CM-2","CM-6"]},reqs:["Approved baseline configurations exist for each OS and platform type","Minimum security settings and hardening parameters are specified","Deviation from baseline requires documented approval","Baseline compliance scanning frequency and tools are defined","Baselines are updated when new patches or versions are released"]},
  {t:"Wireless Security Standards",type:"Standard",fw:{"PCI DSS v4.0":["Req 2.3","Req 11.2"],"ISO 27001":["A.13.1.2"],"CMMC":["AC.L2-3.1.16","SC.L2-3.13.1"],"NIST 800-53 Rev 5":["AC-18","SC-40"]},reqs:["Approved wireless protocols and encryption standards are specified","Rogue access point detection and scanning procedures are defined","Wireless network authentication requirements are documented","Guest wireless is segmented from corporate networks","Wireless access point inventory is maintained and current"]},
  // ── PLANS ─────────────────────────────────────────────────────────────
  {t:"Security Assessment Plan",type:"Plan",fw:{"CMMC":["CA.L2-3.12.1","CA.L2-3.12.3"],"NIST CSF":["DE.DP-1","DE.DP-3"],"ISO 27001":["A.18.2.1"],"NIST 800-53 Rev 5":["CA-1","CA-2","CA-8"]},reqs:["Assessment scope, objectives, and methodology are documented","Assessment schedule and frequency are defined","Assessor qualifications and independence requirements are specified","Findings tracking and remediation timelines are documented","Plan is reviewed and updated at least annually"]},
  {t:"System Security Plan",type:"Plan",fw:{"CMMC":["CA.L2-3.12.4"],"NIST CSF":["ID.GV-1"],"NIST 800-53 Rev 5":["PL-2"]},reqs:["System boundaries and environment of operation are described","Security controls implemented for the system are documented","Interconnections with other systems are identified","Roles and responsibilities for system security are assigned","Plan is reviewed and updated at least annually or after significant changes"]},
  {t:"Contingency Plan",type:"Plan",fw:{"HIPAA":["§164.308(a)(7)(i)","§164.308(a)(7)(ii)(C)"],"NIST CSF":["PR.IP-9"],"NIST 800-53 Rev 5":["CP-1","CP-2"]},reqs:["Plan document exists and is current","Emergency mode operations procedures are defined","Critical system and data recovery priorities are documented","Plan has been tested within the last 12 months","Plan includes defined roles, responsibilities, and contact information"]},
  {t:"Risk Treatment Plan",type:"Plan",fw:{"ISO 27001":["A.5.1.1"],"NIST CSF":["ID.RA-6"],"SOC 2":["CC3.2"],"NIST 800-53 Rev 5":["RA-7","PM-4"]},reqs:["Risk treatment options for each identified risk are documented","Responsible owners are assigned for each risk treatment action","Implementation timelines and milestones are specified","Residual risk levels are documented and accepted by management","Plan is reviewed and updated after each risk assessment cycle"]},
  // ── GUIDELINES ────────────────────────────────────────────────────────
  {t:"Data Handling Guidelines",type:"Guideline",fw:{"GDPR":["Art.5","Art.25"],"HIPAA":["§164.312(c)(1)"],"PCI DSS v4.0":["Req 3.1","Req 3.3"],"NIST 800-53 Rev 5":["MP-2","MP-4","SI-12"]},reqs:["Guidelines document exists and is accessible to relevant staff","Practical examples for handling each data classification level are included","Data masking and redaction requirements are specified","Secure file transfer and sharing methods are documented","Guidelines cover both physical and electronic data handling"]},
  {t:"Secure Disposal Guidelines",type:"Guideline",fw:{"ISO 27001":["A.11.2.7"],"HIPAA":["§164.310(d)(2)(i)"],"PCI DSS v4.0":["Req 9.4"],"CMMC":["MP.L2-3.8.3"],"NIST 800-53 Rev 5":["MP-6"]},reqs:["Approved disposal methods are listed for each media and equipment type","Guidelines document is accessible to relevant staff","Certificates of destruction or sanitization are required","Third-party disposal vendor requirements are specified","Examples of compliant vs non-compliant disposal are provided"]},
  {t:"Visitor Management Guidelines",type:"Guideline",fw:{"ISO 27001":["A.11.1.2"],"PCI DSS v4.0":["Req 9.3"],"CMMC":["PE.L2-3.10.3","PE.L2-3.10.4"],"NIST 800-53 Rev 5":["PE-8","PE-2","PE-3"]},reqs:["Visitor sign-in and sign-out process is documented","Visitor badge or identification requirements are specified","Escort requirements for visitors in secure areas are defined","Visitor access logs are maintained and retained","Guidelines are posted or accessible at reception and entry points"]},
  // ── NETWORK & ARCHITECTURE DIAGRAMS ─────────────────────────────────
  {t:"Network Architecture Diagram",type:"Diagram",fw:{"PCI DSS v4.0":["Req 1.2"],"ISO 27001":["A.13.1.1"],"NIST CSF":["ID.AM-3"],"CMMC":["SC.L2-3.13.1"],"NIST 800-53 Rev 5":["PL-2","SC-7"]},reqs:["Diagram is current and dated within the last 12 months","All network connections and data flows are shown","CDE and sensitive network segments are clearly labeled","Diagram is reviewed and updated at least annually","Diagram includes all ingress and egress points"]},
  {t:"Data Flow Diagram",type:"Diagram",fw:{"PCI DSS v4.0":["Req 1.2"],"GDPR":["Art.30"],"HIPAA":["§164.308(a)(1)(ii)(A)"],"NIST CSF":["ID.AM-3"],"CMMC":["SC.L2-3.13.1"],"NIST 800-53 Rev 5":["CM-13","PL-2"]},reqs:["Data types and classifications are labeled on each flow","Transmission methods and protocols are shown","Encryption points are clearly marked on the diagram","Storage locations for each data type are identified","Diagram is updated when systems or data flows change"]},
  {t:"Cloud Architecture Diagram",type:"Diagram",fw:{"ISO 27001":["A.13.1.1"],"SOC 2":["CC6.1"],"NIST CSF":["PR.AC-5"],"NIST 800-53 Rev 5":["PL-8","SC-7"]},reqs:["Cloud provider boundaries and regions are clearly depicted","Shared responsibility model is documented alongside the diagram","Security controls placement is shown at each layer","Inter-cloud and on-premises connections are documented","Diagram is reviewed when cloud infrastructure changes"]},
  {t:"System Boundary & Scope Document",type:"Diagram",fw:{"PCI DSS v4.0":["Req 12.5"],"CMMC":["CA.L2-3.12.4"],"SOC 2":["CC6.1"],"NIST 800-53 Rev 5":["PL-2","CA-9"]},reqs:["All in-scope systems and components are listed","Boundary justification and exclusion rationale are documented","Document is reviewed and approved at least annually","Connected third-party systems are identified","Scope changes trigger a re-evaluation and update"]},
  // ── ASSET INVENTORIES ───────────────────────────────────────────────
  {t:"Hardware Asset Inventory",type:"Inventory",fw:{"NIST CSF":["ID.AM-1"],"ISO 27001":["A.8.1.1"],"PCI DSS v4.0":["Req 2.1"],"CMMC":["CM.L2-3.4.1"],"NIST 800-53 Rev 5":["CM-8","PM-5"]},reqs:["All hardware assets listed with owner and physical location","Serial numbers and asset tags are recorded for each item","Inventory is updated when assets are added, moved, or decommissioned","Asset classification and criticality ratings are assigned","Inventory is reconciled at least quarterly"]},
  {t:"Software Asset Inventory",type:"Inventory",fw:{"NIST CSF":["ID.AM-2"],"ISO 27001":["A.8.1.1"],"PCI DSS v4.0":["Req 2.1"],"CMMC":["CM.L2-3.4.1"],"NIST 800-53 Rev 5":["CM-8","CM-10","PM-5"]},reqs:["All software listed with version numbers and vendor details","License status and entitlements are tracked for each application","Unauthorized or unapproved software is identified and flagged","Inventory is updated when software is installed or removed","Software end-of-life and support status is tracked"]},
  {t:"Data Asset Inventory & Data Map",type:"Inventory",fw:{"GDPR":["Art.30"],"HIPAA":["§164.308(a)(1)(ii)(A)"],"ISO 27001":["A.8.1.1"],"NIST CSF":["ID.AM-5"],"NIST 800-53 Rev 5":["CM-12","CM-13","RA-2"]},reqs:["All data types are catalogued with classification levels","Storage locations and repositories are documented for each data type","Data owners are assigned and documented","Data flows between systems and external parties are mapped","Inventory is reviewed and updated at least annually"]},
  {t:"Encryption Key Inventory",type:"Inventory",fw:{"PCI DSS v4.0":["Req 3.6"],"ISO 27001":["A.10.1.2"],"CMMC":["SC.L2-3.13.11"],"NIST 800-53 Rev 5":["SC-12"]},reqs:["All cryptographic keys listed with purpose and algorithm","Expiration and rotation dates are tracked for each key","Key custodians are assigned and documented","Rotation schedule is defined and followed","Key inventory is reviewed at least quarterly"]},
  {t:"Authorized User List",type:"Inventory",fw:{"CMMC":["AC.L2-3.1.1"],"HIPAA":["§164.312(a)(1)"],"PCI DSS v4.0":["Req 8.1"],"NIST 800-53 Rev 5":["AC-2","IA-4"]},reqs:["All authorized users listed with role and access level","List is reviewed and approved at least quarterly","Terminated users are removed within 24 hours","Access level changes are reflected promptly in the list","List includes both internal users and external/vendor accounts"]},
  // ── CONTRACTS & LEGAL AGREEMENTS ────────────────────────────────────
  {t:"Business Associate Agreements (BAAs)",type:"Agreement",fw:{"HIPAA":["§164.308(b)(1)"]},reqs:["BAA exists for every vendor that creates, receives, or transmits PHI","Each BAA includes all HIPAA-required provisions","BAAs are signed, dated, and current","BAAs are reviewed and renewed when contracts change","Inventory of all BAAs is maintained with expiration dates"]},
  {t:"Data Processing Agreements (DPAs)",type:"Agreement",fw:{"GDPR":["Art.28"]},reqs:["DPA is in place for all data processors handling personal data","Each DPA includes Art.28 required clauses","Data transfer mechanisms (e.g., SCCs) are documented","DPAs specify sub-processor approval requirements","DPA inventory is maintained and reviewed annually"]},
  {t:"Non-Disclosure Agreements (NDAs)",type:"Agreement",fw:{"ISO 27001":["A.13.2.4"],"CMMC":["PS.L2-3.9.2"]},reqs:["NDAs are signed by all employees before accessing confidential data","NDAs cover CUI and all confidential information categories","Contractor and third-party NDAs are executed before engagement","NDAs are renewed or reviewed as needed","Signed NDA records are securely stored and retrievable"]},
  {t:"Vendor Security Assessments",type:"Agreement",fw:{"ISO 27001":["A.15.2.1"],"SOC 2":["CC9.2"],"NIST CSF":["ID.SC-4"],"PCI DSS v4.0":["Req 12.8"],"NIST 800-53 Rev 5":["SR-6","SA-9"]},reqs:["Annual risk assessment is conducted for all critical vendors","Security questionnaires or assessments are completed and on file","Identified risks are tracked with remediation actions","Vendor risk ratings are assigned and reviewed periodically","Assessment results are reported to management"]},
  {t:"Service Level Agreements (SLAs)",type:"Agreement",fw:{"ISO 27001":["A.15.1.2"],"SOC 2":["A1.1"]},reqs:["SLAs define availability and security requirements","Uptime targets and performance metrics are specified","Breach notification timelines are included in SLAs","Penalties or remedies for SLA violations are documented","SLAs are reviewed and updated at contract renewal"]},
  // ── ASSESSMENT & TESTING REPORTS ────────────────────────────────────
  {t:"Annual Risk Assessment Report",type:"Report",fw:{"NIST CSF":["ID.RA-5"],"ISO 27001":["A.12.6.1"],"SOC 2":["CC3.2"],"HIPAA":["§164.308(a)(1)(ii)(A)"],"PCI DSS v4.0":["Req 12.3"],"CMMC":["RA.L2-3.11.1"],"NIST 800-53 Rev 5":["RA-3","RA-5"]},reqs:["Assessment conducted within the last 12 months","All in-scope assets and systems are covered","Threats and vulnerabilities are identified and documented","Risk scores are calculated using defined methodology","Remediation recommendations are prioritized by risk level"]},
  {t:"Internal Vulnerability Scan Reports",type:"Report",fw:{"PCI DSS v4.0":["Req 11.3"],"ISO 27001":["A.12.6.1"],"CMMC":["RA.L2-3.11.2"],"NIST CSF":["DE.CM-8"],"NIST 800-53 Rev 5":["RA-5"]},reqs:["Internal scans conducted at least quarterly","Critical and high findings are remediated and rescanned","Scan tool, scope, and methodology are documented","Trend analysis of findings over time is maintained","Scan reports are retained for audit review"]},
  {t:"External Vulnerability Scan Reports (ASV)",type:"Report",fw:{"PCI DSS v4.0":["Req 11.3"]},reqs:["Quarterly ASV scans performed by PCI-approved vendor","Passing scan results are on file for each quarter","Failed scans are remediated and rescanned until passing","ASV attestation of scan compliance is current","Scan scope covers all external-facing IP addresses"]},
  {t:"Penetration Test Report",type:"Report",fw:{"PCI DSS v4.0":["Req 11.4"],"ISO 27001":["A.12.6.1"],"CMMC":["CA.L2-3.12.1"],"NIST 800-53 Rev 5":["CA-8"]},reqs:["Annual penetration test conducted by qualified tester","Both internal and external testing scopes are covered","Findings include severity ratings and exploitation evidence","Remediation evidence is documented for critical findings","Retest validates remediation of exploitable vulnerabilities"]},
  {t:"Business Impact Analysis (BIA)",type:"Report",fw:{"ISO 27001":["A.17.1.1"],"HIPAA":["§164.308(a)(7)(ii)(E)"],"NIST CSF":["ID.BE-4"],"NIST 800-53 Rev 5":["RA-9","CP-2"]},reqs:["Critical business functions are identified and prioritized","RTO and RPO are defined for each critical function","Dependencies between systems and processes are documented","Financial and operational impact estimates are included","BIA is reviewed and updated at least annually"]},
  {t:"Gap Analysis / Maturity Assessment Report",type:"Report",fw:{"ISO 27001":["A.18.2.1"],"NIST CSF":["ID.GV-4"],"CMMC":["CA.L2-3.12.1"],"NIST 800-53 Rev 5":["CA-2","PM-6"]},reqs:["Current state assessed against target framework requirements","Gaps identified with severity and priority ratings","Remediation roadmap with timelines is created","Responsible owners are assigned for each gap item","Assessment is refreshed at least annually"]},
  {t:"Internal Audit Report",type:"Report",fw:{"ISO 27001":["A.18.2.1"],"SOC 2":["CC4.1"],"CMMC":["CA.L2-3.12.3"],"NIST 800-53 Rev 5":["CA-2","CA-7"]},reqs:["Annual internal audit conducted by qualified personnel","Audit scope covers all relevant security domains","Findings are documented with severity and evidence","Corrective actions are tracked to closure","Audit report is reviewed by senior management"]},
  {t:"Third-Party / SOC Audit Reports from Vendors",type:"Report",fw:{"SOC 2":["CC9.2"],"ISO 27001":["A.15.2.1"],"PCI DSS v4.0":["Req 12.8"],"NIST 800-53 Rev 5":["SR-6","SA-9"]},reqs:["SOC 2 or equivalent reports collected from critical vendors annually","Reports reviewed for exceptions and qualified opinions","Complementary user entity controls are assessed","Gaps in vendor controls are tracked with mitigations","Report collection and review records are maintained"]},
  {t:"Wireless Network Assessment Report",type:"Report",fw:{"PCI DSS v4.0":["Req 11.2"],"ISO 27001":["A.13.1.2"],"CMMC":["AC.L2-3.1.16"]},reqs:["Quarterly wireless scans are conducted","Rogue access points are identified and remediated","Authorized wireless access point inventory is maintained","Scan methodology and tools are documented","Assessment results are reviewed by network security team"]},
  // ── TRAINING RECORDS ────────────────────────────────────────────────
  {t:"Security Awareness Training Records",type:"Record",fw:{"NIST CSF":["PR.AT-1"],"ISO 27001":["A.7.2.2"],"SOC 2":["CC1.4"],"HIPAA":["§164.308(a)(5)(i)"],"PCI DSS v4.0":["Req 12.6"],"CMMC":["AT.L2-3.2.1"],"NIST 800-53 Rev 5":["AT-2","AT-4"]},reqs:["All employees completed training within the last 12 months","Completion rates are tracked and reported to management","Training includes phishing and social engineering awareness","New hires complete training within 30 days of start date","Training content is updated at least annually"]},
  {t:"Role-Based Security Training Records",type:"Record",fw:{"NIST CSF":["PR.AT-2"],"ISO 27001":["A.7.2.2"],"PCI DSS v4.0":["Req 12.6"],"CMMC":["AT.L2-3.2.2"],"NIST 800-53 Rev 5":["AT-3","AT-4"]},reqs:["Developers receive secure coding training annually","Admins receive privileged access and system security training","Training content is specific to each job function","Completion records are maintained with dates and scores","Training is updated when roles or technologies change"]},
  {t:"Phishing Simulation Results",type:"Record",fw:{"NIST CSF":["PR.AT-1"],"SOC 2":["CC1.4"],"CMMC":["AT.L2-3.2.3"],"NIST 800-53 Rev 5":["AT-2"]},reqs:["Phishing simulations conducted at least quarterly","Click and report rates are tracked over time","Repeat offenders receive additional targeted training","Simulation scenarios are varied and realistic","Results are reported to management with trend analysis"]},
  {t:"New Hire Security Acknowledgment Records",type:"Record",fw:{"ISO 27001":["A.7.1.2"],"HIPAA":["§164.308(a)(5)(i)"],"PCI DSS v4.0":["Req 12.6"]},reqs:["Signed acknowledgment of security policies on file for each hire","Acknowledgment completed within first week of employment","Covers acceptable use, data handling, and incident reporting","Records are securely stored and retrievable for audit","Acknowledgment is renewed annually or upon policy changes"]},
  // ── OPERATIONAL RECORDS ─────────────────────────────────────────────
  {t:"Access Review Records",type:"Record",fw:{"ISO 27001":["A.9.2.5"],"SOC 2":["CC6.2"],"PCI DSS v4.0":["Req 7.2"],"HIPAA":["§164.308(a)(4)(ii)(C)"],"CMMC":["AC.L2-3.1.7"],"NIST 800-53 Rev 5":["AC-2","AC-6"]},reqs:["Access reviews conducted at least quarterly","All user accounts and privileges are reviewed per system","Excessive or inappropriate privileges are revoked promptly","Review sign-off by system owner or manager is documented","Remediation actions and exceptions are tracked"]},
  {t:"Change Management Records",type:"Record",fw:{"ISO 27001":["A.12.1.2"],"SOC 2":["CC8.1"],"PCI DSS v4.0":["Req 6.5"],"NIST 800-53 Rev 5":["CM-3","CM-4"]},reqs:["All changes logged with requestor, approver, and date","Impact assessment is documented for each change","Rollback plan is included in the change record","Post-implementation review is conducted and recorded","Emergency changes are documented with retroactive approval"]},
  {t:"Patch Management Records",type:"Record",fw:{"ISO 27001":["A.12.6.1"],"PCI DSS v4.0":["Req 6.3"],"CMMC":["SI.L2-3.14.1"],"NIST CSF":["PR.IP-12"],"NIST 800-53 Rev 5":["SI-2"]},reqs:["Critical patches applied within 30 days of release","Patch compliance rate is tracked across all systems","Exceptions are documented with compensating controls","Patch testing is performed before production deployment","Patch deployment records include date, systems, and results"]},
  {t:"Backup Verification & Restoration Test Records",type:"Record",fw:{"ISO 27001":["A.12.3.1"],"HIPAA":["§164.308(a)(7)(ii)(A)"],"PCI DSS v4.0":["Req 12.10"],"NIST CSF":["PR.IP-4"],"NIST 800-53 Rev 5":["CP-9","CP-4"]},reqs:["Backup restoration tests performed at least quarterly","Successful restoration is documented with date and scope","Recovery time is measured and compared against RTO","Offsite or secondary storage is verified as accessible","Failed restoration tests trigger immediate remediation"]},
  {t:"DR/BCP Test Results",type:"Record",fw:{"ISO 27001":["A.17.1.3"],"HIPAA":["§164.308(a)(7)(ii)(D)"],"SOC 2":["A1.3"],"NIST CSF":["PR.IP-10"],"NIST 800-53 Rev 5":["CP-4"]},reqs:["DR/BCP test conducted at least annually","Test scenario, scope, and participants are documented","Results measured against success criteria and RTO/RPO","Lessons learned are recorded and plan is updated","Test report is reviewed and approved by management"]},
  {t:"Terminated User Access Removal Evidence",type:"Record",fw:{"ISO 27001":["A.7.3.1"],"HIPAA":["§164.308(a)(3)(ii)(C)"],"PCI DSS v4.0":["Req 8.1"],"CMMC":["PS.L2-3.9.2"],"NIST 800-53 Rev 5":["PS-4","AC-2"]},reqs:["Access removed within 24 hours of termination date","All systems, applications, and physical access are revoked","Removal is verified and documented with timestamps","Shared or service account password changes are triggered","Removal records are retained for audit review"]},
  {t:"Security Metrics & KPI Reports",type:"Record",fw:{"ISO 27001":["A.18.2.2"],"SOC 2":["CC4.1"],"NIST CSF":["DE.DP-5"],"NIST 800-53 Rev 5":["PM-6","PM-14"]},reqs:["Metrics collected and reported at least quarterly","Key areas covered include incidents, vulnerabilities, and compliance","Trends are tracked over time with visual dashboards","Reports are distributed to senior management","Targets and thresholds are defined for each KPI"]},
  // ── LOGS & MONITORING EVIDENCE ──────────────────────────────────────
  {t:"Audit Log Samples",type:"Evidence",fw:{"PCI DSS v4.0":["Req 10.2"],"ISO 27001":["A.12.4.1"],"HIPAA":["§164.312(b)"],"CMMC":["AU.L2-3.3.1"],"NIST 800-53 Rev 5":["AU-2","AU-3","AU-9"]},reqs:["Logs capture user activity, access events, and system changes","Log entries include timestamp, user ID, action, and result","Logs retained for minimum of 1 year (3 months immediately available)","Log integrity protection mechanisms are in place","Sample logs are available for the full audit period"]},
  {t:"SIEM / Security Monitoring Evidence",type:"Evidence",fw:{"PCI DSS v4.0":["Req 10.4"],"ISO 27001":["A.12.4.1"],"SOC 2":["CC7.2"],"NIST CSF":["DE.AE-3"],"NIST 800-53 Rev 5":["SI-4","AU-6"]},reqs:["Centralized log management or SIEM solution is deployed","Alerting rules are configured for key security events","Alerts are reviewed and triaged within defined timeframes","24/7 monitoring or after-hours coverage is documented","SIEM dashboards and correlation rules are maintained"]},
  {t:"Firewall Rule Review Evidence",type:"Evidence",fw:{"PCI DSS v4.0":["Req 1.2"],"ISO 27001":["A.13.1.1"],"CMMC":["SC.L2-3.13.1"],"NIST 800-53 Rev 5":["SC-7","AC-4"]},reqs:["Firewall rules reviewed at least every 6 months","Unused, expired, or overly permissive rules are removed","Default deny-all rule is in place on all firewalls","Review sign-off by network security owner is documented","Rule change history is maintained and auditable"]},
  {t:"Access Log Samples",type:"Evidence",fw:{"HIPAA":["§164.312(b)"],"PCI DSS v4.0":["Req 10.2"],"ISO 27001":["A.12.4.1"],"CMMC":["AU.L2-3.3.1"],"NIST 800-53 Rev 5":["AU-2","AU-3"]},reqs:["Successful and failed login attempts are captured","Privileged access activity is logged separately","Log samples are available for the complete audit period","Logs include source IP, timestamp, and user identity","Anomalous access patterns are flagged for review"]},
  // ── TECHNICAL CONFIGURATION EVIDENCE ────────────────────────────────
  {t:"System Hardening Evidence (CIS Benchmarks)",type:"Evidence",fw:{"PCI DSS v4.0":["Req 2.2"],"ISO 27001":["A.12.1.1"],"CMMC":["CM.L2-3.4.6"],"NIST 800-53 Rev 5":["CM-6","CM-7"]},reqs:["Hardening standards applied to all in-scope systems","CIS Benchmark or equivalent standard is used as baseline","Compliance scan results are available for audit review","Deviations are documented and approved by management","Hardening evidence is refreshed at least quarterly"]},
  {t:"MFA Configuration Evidence",type:"Evidence",fw:{"PCI DSS v4.0":["Req 8.4"],"NIST CSF":["PR.AC-7"],"CMMC":["IA.L2-3.5.3"],"ISO 27001":["A.9.4.2"],"NIST 800-53 Rev 5":["IA-2"]},reqs:["MFA enabled for all remote access connections","MFA required for all admin and privileged accounts","MFA technology and supported methods are documented","Configuration screenshots or exports are available","MFA bypass or exception processes are documented"]},
  {t:"Encryption-at-Rest Configuration Evidence",type:"Evidence",fw:{"PCI DSS v4.0":["Req 3.5"],"HIPAA":["§164.312(a)(2)(iv)"],"ISO 27001":["A.10.1.1"],"CMMC":["SC.L2-3.13.11"],"NIST 800-53 Rev 5":["SC-28","SC-12"]},reqs:["Encryption enabled for all sensitive data stores","AES-256 or equivalent algorithm is used","Key management procedures are followed and documented","Configuration screenshots or audit exports are available","Unencrypted sensitive data stores are documented as exceptions"]},
  {t:"Encryption-in-Transit Configuration Evidence",type:"Evidence",fw:{"PCI DSS v4.0":["Req 4.2"],"HIPAA":["§164.312(e)(2)(ii)"],"ISO 27001":["A.10.1.1"],"CMMC":["SC.L2-3.13.8"],"NIST 800-53 Rev 5":["SC-8","SC-12"]},reqs:["TLS 1.2 or higher enforced on all connections","SSL/TLS certificate inventory is maintained","Weak ciphers and protocols are disabled","Configuration evidence from servers and load balancers is available","Certificate expiration monitoring is in place"]},
  {t:"Endpoint Protection Configuration Evidence",type:"Evidence",fw:{"ISO 27001":["A.12.2.1"],"PCI DSS v4.0":["Req 5.2"],"CMMC":["SI.L2-3.14.2"],"NIST 800-53 Rev 5":["SI-3"]},reqs:["Antivirus or EDR deployed on all endpoints","Real-time scanning is enabled and active","Signature and definition updates are automated","Central management console screenshots are available","Unprotected endpoints are documented as exceptions with mitigations"]},
  {t:"Account Lockout & Password Configuration",type:"Evidence",fw:{"PCI DSS v4.0":["Req 8.3"],"HIPAA":["§164.308(a)(5)(ii)(D)"],"ISO 27001":["A.9.4.3"],"CMMC":["IA.L2-3.5.7"],"NIST 800-53 Rev 5":["AC-7","IA-5"]},reqs:["Account lockout after defined number of failed attempts","Minimum password complexity requirements are enforced","Password expiration or rotation policy is configured","Configuration screenshots from directory services are available","Password history prevents reuse of recent passwords"]},
  // ── MANAGEMENT & GOVERNANCE RECORDS ─────────────────────────────────
  {t:"Management Review Meeting Minutes",type:"Record",fw:{"ISO 27001":["A.5.1.2"],"SOC 2":["CC1.2"]},reqs:["Security review conducted at least annually by senior management","Agenda covers risk posture, incidents, and compliance status","Decisions and action items are documented with owners","Attendance and quorum are recorded","Follow-up on previous action items is documented"]},
  {t:"Risk Committee / Security Steering Minutes",type:"Record",fw:{"ISO 27001":["A.5.1.1"],"NIST CSF":["ID.GV-4"],"SOC 2":["CC1.2"]},reqs:["Meetings held at least quarterly with documented agenda","Risk decisions and approvals are recorded","Attendees and quorum are documented for each meeting","Open risk items and treatment progress are reviewed","Minutes are distributed and archived"]},
  {t:"Board Security Briefing Records",type:"Record",fw:{"SOC 2":["CC1.2"],"NIST CSF":["ID.GV-1"]},reqs:["Board briefed on security posture at least annually","Briefing materials and presentation slides are on file","Key risks, incidents, and investment needs are communicated","Board questions and directives are documented","Briefing records are retained for audit review"]},
  // ── REGISTERS & LOGS ────────────────────────────────────────────────
  {t:"Incident Register / Security Incident Log",type:"Register",fw:{"ISO 27001":["A.16.1.5"],"SOC 2":["CC7.3"],"HIPAA":["§164.308(a)(6)(i)"],"PCI DSS v4.0":["Req 12.10"],"NIST CSF":["RS.AN-4"],"CMMC":["IR.L2-3.6.2"],"NIST 800-53 Rev 5":["IR-5","IR-6"]},reqs:["All security incidents logged with date, description, and severity","Response actions and timelines are documented per incident","Root cause analysis is performed for significant incidents","Lessons learned are recorded and fed back into controls","Incident register is reviewed by management at least quarterly"]},
  {t:"Security Exception Register",type:"Register",fw:{"ISO 27001":["A.18.1.1"],"SOC 2":["CC5.2"],"NIST CSF":["ID.GV-3"]},reqs:["All security exceptions formally documented with justification","Risk acceptance approved and signed by appropriate management","Expiration dates are set for each exception","Compensating controls are documented and validated","Register is reviewed at least quarterly for expired exceptions"]},
  {t:"Risk Register (Current)",type:"Register",fw:{"ISO 27001":["A.12.6.1"],"NIST CSF":["ID.RA-5"],"SOC 2":["CC3.2"],"CMMC":["RA.L2-3.11.1"],"NIST 800-53 Rev 5":["RA-3","PM-4"]},reqs:["All identified risks documented with likelihood and impact scores","Risk owners are assigned for each risk entry","Treatment plans are defined with target dates","Register is reviewed and updated at least quarterly","Residual risk levels are documented after treatment"]},
  {t:"Data Breach Register",type:"Register",fw:{"GDPR":["Art.33"],"HIPAA":["§164.308(a)(6)(i)"]},reqs:["All breaches logged regardless of notification threshold","Investigation details and root cause are documented","Notification decisions and rationale are recorded","Corrective actions are tracked to completion","Register is reviewed by privacy and legal teams"]},
  {t:"Data Subject Access Request (DSAR) Log",type:"Register",fw:{"GDPR":["Art.15"]},reqs:["All DSARs logged with date received and requester details","Response provided within 30 days of verified request","Identity verification steps are documented per request","Response records and correspondence are retained","Escalation and denial rationale are documented when applicable"]},
  {t:"Plan of Action & Milestones (POA&M)",type:"Register",fw:{"CMMC":["CA.L2-3.12.2"],"NIST CSF":["ID.RA-6"],"NIST 800-53 Rev 5":["CA-5","PM-4"]},reqs:["All open findings tracked with responsible party assigned","Planned completion dates are set for each item","Milestones defined for long-term remediation items","POA&M is reviewed and updated at least monthly","Status and progress are reported to management"]},
  // ── PRIVACY-SPECIFIC ARTIFACTS ──────────────────────────────────────
  {t:"Records of Processing Activities (ROPA)",type:"Record",fw:{"GDPR":["Art.30"]},reqs:["All processing activities documented with purposes","Legal basis specified for each processing activity","Categories of data subjects and data types are listed","Retention periods defined for each processing activity","ROPA is reviewed and updated at least annually"]},
  {t:"Consent Records & Consent Management Evidence",type:"Record",fw:{"GDPR":["Art.7"]},reqs:["Consent capture mechanism is documented and auditable","Withdrawal mechanism is available and easy to use","Consent records stored with timestamp and scope","Granular consent options provided for each purpose","Consent records are retained for the life of the processing"]},
  {t:"PHI Inventory & Flow Documentation",type:"Record",fw:{"HIPAA":["§164.308(a)(1)(ii)(A)"]},reqs:["All PHI types are inventoried with sensitivity levels","Storage and transmission locations are documented","Access points and authorized roles are identified","PHI flows are reviewed when systems or processes change","Inventory includes both electronic and physical PHI"]},
  // ── PCI-SPECIFIC ARTIFACTS ──────────────────────────────────────────
  {t:"PCI DSS Scope Documentation",type:"Evidence",fw:{"PCI DSS v4.0":["Req 12.5"]},reqs:["Cardholder data environment (CDE) boundaries are defined","All in-scope systems, networks, and personnel are listed","Scope validated at least annually and after significant changes","Scope reduction efforts and segmentation are documented","Scope documentation is approved by qualified assessor or QSA"]},
  {t:"Cardholder Data Flow Diagram",type:"Evidence",fw:{"PCI DSS v4.0":["Req 1.2"]},reqs:["All cardholder data flows are documented end-to-end","Entry and exit points for cardholder data are marked","Encryption points within the flow are identified","Diagram is reviewed and updated when the environment changes","Third-party connections handling cardholder data are shown"]},
  {t:"ASV Quarterly Scan Results",type:"Evidence",fw:{"PCI DSS v4.0":["Req 11.3"]},reqs:["Quarterly scans conducted by a PCI-approved ASV","Four consecutive quarters of passing scans are on file","Failed scans are remediated and rescanned until passing","Current ASV attestation of scan compliance is available","Scan scope covers all external-facing IP addresses and domains"]},
  {t:"PCI Self-Assessment Questionnaire (SAQ) or ROC",type:"Evidence",fw:{"PCI DSS v4.0":["Req 12.4"]},reqs:["Annual SAQ or ROC completed for the applicable SAQ type","All applicable requirements are addressed in the assessment","Remediation items are tracked in an action plan","Signed attestation of compliance (AOC) is on file","Assessment is completed by qualified personnel or QSA"]},
  // ── CMMC / FEDERAL SPECIFIC ─────────────────────────────────────────
  {t:"CUI Marking & Handling Evidence",type:"Evidence",fw:{"CMMC":["MP.L2-3.8.1","MP.L2-3.8.4"],"NIST 800-53 Rev 5":["MP-3","PM-17"]},reqs:["CUI markings applied to all controlled unclassified documents","Handling procedures are followed per NIST 800-171 requirements","Distribution limited to authorized personnel only","Marking compliance is verified through periodic spot checks","Training on CUI marking and handling is provided to staff"]},
  {t:"Federal Contract Security Requirements Matrix",type:"Evidence",fw:{"CMMC":["CA.L2-3.12.4"],"NIST 800-53 Rev 5":["PL-2","CA-2"]},reqs:["DFARS and NIST 800-171 requirements mapped to implemented controls","Compliance status tracked per requirement with evidence references","Gaps are documented in POA&M with remediation timelines","Matrix is updated when contract requirements change","Matrix is reviewed by security and compliance leadership"]},
  // ── CERTIFICATIONS & ATTESTATIONS ───────────────────────────────────
  {t:"Employee Background Check Records",type:"Record",fw:{"ISO 27001":["A.7.1.1"],"HIPAA":["§164.308(a)(3)(ii)(B)"],"PCI DSS v4.0":["Req 12.7"],"CMMC":["PS.L2-3.9.1"],"NIST 800-53 Rev 5":["PS-3"]},reqs:["Background checks completed for all employees before access granted","Checks include criminal history and reference verification","Records are securely stored with restricted access","Background check scope meets regulatory and policy requirements","Periodic re-screening is conducted for high-risk roles"]},
  {t:"Annual Compliance Attestation",type:"Record",fw:{"SOC 2":["CC1.1"],"PCI DSS v4.0":["Req 12.4"]},reqs:["Annual attestation signed by responsible executive","Covers all applicable compliance frameworks and requirements","Gaps or exceptions are noted with remediation plans","Attestation is distributed to relevant stakeholders","Supporting evidence is referenced and available for audit"]},
  {t:"Insurance Certificates (Cyber Liability)",type:"Record",fw:{"SOC 2":["CC9.1"],"ISO 27001":["A.15.1.1"]},reqs:["Cyber liability insurance policy is in force and current","Coverage limits are appropriate for organization size and risk","Policy is reviewed at least annually at renewal","Certificates of insurance are on file and accessible","Coverage scope includes breach response and regulatory fines"]},
];
