export const systemMeta = {
  title: "CRM Email Automation System",
  tagline:
    "An intelligent, end-to-end pipeline that classifies, processes, and responds to customer emails — fully automated using dual AI models, Kafka-driven ingestion, and multi-turn conversation tracking.",
  stats: [
    { value: "2", label: "AI models", sub: "GPT + Gemini classification" },
    { value: "5", label: "Convo turns", sub: "Context tracked per ticket" },
    { value: "6", label: "Pipeline stages", sub: "Ingestion to resolution" },
    { value: "100%", label: "PII masked", sub: "Before any AI model" },
  ],
};

export const pipelineOverview = {
  title: "The complete pipeline at a glance",
  subtitle:
    "Six orchestrated stages take every customer email from raw input to a fully resolved, responded ticket.",
  stages: [
    { icon: "⚡", name: "Kafka / Salesforce", role: "Ingestion", highlight: true },
    { icon: "🧹", name: "Preprocessing", role: "Filter & mask" },
    { icon: "🤖", name: "Classification", role: "GPT + Gemini", highlight: true },
    { icon: "🔍", name: "NER Extraction", role: "User details" },
    { icon: "🔗", name: "API Integration", role: "CRM lookup" },
    { icon: "💬", name: "Response", role: "5-turn engine", highlight: true },
  ],
  highlights: [
    { label: "Conversation tracking", value: "Convo 1–5", sub: "Context-aware at every turn" },
    { label: "Dual AI consensus", value: "GPT × Gemini", sub: "Both must agree to proceed" },
    { label: "PII protection", value: "100% masked", sub: "Before any AI model sees it" },
    { label: "Auto-resolution", value: "0 manual steps", sub: "For fully resolved tickets" },
  ],
};

export const ingestion = {
  label: "Stage 1 — Ingestion",
  title: "Kafka-powered queue from Salesforce",
  upgrade: "Recent upgrade — Cases now pushed via Kafka from Salesforce",
  steps: [
    {
      title: "Salesforce Case Creation",
      text: "A new email-based case is created in Salesforce.",
    },
    {
      title: "Kafka pushes the event to the consumer",
      text: "Our automation service consumes the event from the Kafka queue, ensuring reliable, ordered, and scalable processing.",
    },
  ],
  pills: ["Kafka queue", "Salesforce CRM", "Email parser", "Attachment reader"],
  kafkaPayload: [
    { key: "topic", value: "crm.cases.inbound" },
    { key: "caseId", value: '"SF-2024-00891"' },
    { key: "channel", value: '"email"' },
    { key: "from", value: '"customer@domain.com"' },
    { key: "subject", value: '"Policy renewal query"' },
    { key: "convoCount", value: "1" },
    { key: "assignee", value: '"AI_BOT"' },
    { key: "hasAttachment", value: "false" },
  ],
  guarantees: ["Ordered delivery", "At-least-once", "Replay capable"],
};

export const preprocessing = {
  label: "Stage 2 — Preprocessing",
  title: "Filters, safety checks & data masking",
  subtitle:
    "Before any AI model sees the email, it passes through a series of filters. Failing any check stops the pipeline early.",
  filters: [
    {
      icon: "🚫",
      tone: "coral",
      title: "Junk / spam check",
      text: "The email is assessed for spam signals. Junk emails are discarded immediately — no further processing occurs.",
      outcomes: ["Pass → continue", "Fail → discard"],
    },
    {
      icon: "📏",
      tone: "blue",
      title: "Content length check",
      text: "If the email body is too long, it is summarised before being passed to AI models — preventing token overflows.",
      outcomes: ["Short → raw", "Long → summarise"],
    },
    {
      icon: "🏢",
      tone: "amber",
      title: "Internal domain check",
      text: "Emails from internal domains are flagged. Certain conversation stages handle internal emails differently (e.g. auto-close).",
      outcomes: ["Internal → special flow"],
    },
    {
      icon: "🔑",
      tone: "purple",
      title: "Keyword check",
      text: "Specific keywords in subject or body trigger routing rules or stop processing entirely before classification.",
      outcomes: ["No match → proceed", "Match → stop"],
    },
    {
      icon: "🛡️",
      tone: "green",
      title: "PII masking",
      text: "All sensitive personally identifiable information is masked in the email before it is sent to any AI model. The demasking key is stored securely.",
      outcomes: ["Always applied"],
      accent: true,
    },
    {
      icon: "📎",
      tone: "blue",
      title: "Attachment reading",
      text: "Attachments are read and their extracted text is appended to the email body for unified classification.",
      outcomes: ["Text appended"],
    },
  ],
};

export const classification = {
  label: "Stage 3 — Classification",
  title: "Dual-model consensus",
  upgrade: "Retry Mechanism Added",
  subtitle:
    "GPT and Gemini independently classify each email. Both must agree, or it triggers an intelligent Retry Mechanism for resolution.",
  models: [
    {
      icon: "🤖",
      name: "GPT",
      role: "Primary — Classification + NER",
      description:
        "Classifies the email into a category and subcategory. Also used downstream for named entity recognition to extract user details.",
      category: "Policy",
      subcategory: "Renewal Query",
      pills: ["OpenAI GPT-4", "Classification", "NER"],
    },
    {
      icon: "✨",
      name: "Gemini",
      role: "Validator — Independent classification",
      badge: "Replaced BERT",
      description:
        "Independently classifies the same email. Previously BERT was used for this role — now replaced with Google's Gemini for stronger validation.",
      category: "Policy",
      subcategory: "Renewal Query",
      pills: ["Google Gemini", "Classification", "Was: BERT"],
    },
  ],
  consensus: [
    {
      match: true,
      title: "Initial Match",
      text: "Both models agree on the first try → ticket immediately proceeds to NER extraction and API processing.",
    },
    {
      match: false,
      title: "Retry Mechanism",
      text: "Models disagree → email is summarized and re-classified. If they still disagree after retry, Gemini's output is used as the final verdict.",
    },
  ],
};

export const nerExtraction = {
  label: "Stage 4 — Detail extraction",
  title: "NER-based user detail extraction & API lookup",
  subtitle:
    "GPT extracts structured user identifiers from the email. These are cleaned, then used to fetch full user details via CRM APIs.",
  stages: [
    {
      icon: "🔍",
      tone: "purple",
      title: "NER via GPT",
      text: "Structured prompt + email content sent to GPT. Returns extracted entities as structured data.",
      tags: ["Policy number", "Enrollment ID", "Employee ID", "Customer name", "Date of birth"],
    },
    {
      icon: "🧹",
      tone: "amber",
      title: "Clean & filter",
      text: "Extracted values are validated, cleaned, and formatted to match expected API input formats.",
      note: "Policy → alphanumeric, ID → 10-digit, Name → fuzzy-matched",
    },
    {
      icon: "📡",
      tone: "blue",
      title: "getActiveLiveDetails",
      text: "Remaining user info is fetched using combinations of extracted fields.",
      note: "Policy # + fuzzy name match · Employee ID + name · Enrollment ID alone",
    },
    {
      icon: "✅",
      tone: "green",
      title: "Required fields check",
      text: "Are all required fields present to hit the module-specific API?",
      outcomes: ["All present → hit API", "Missing → send template"],
      accent: true,
    },
  ],
};

export const apiResponse = {
  label: "Stage 5 — API integration & response",
  title: "Decision logic & response dispatch",
  subtitle:
    "Based on whether required details are available and whether the API call succeeds, three outcomes are possible.",
  decisions: [
    {
      condition: "Are all required fields present?",
      outcomes: [
        { type: "ok", label: "Yes", text: "Hit module-specific APIs" },
        { type: "warn", label: "No", text: 'Send "Insufficient Details" template to user' },
      ],
    },
    {
      condition: "Did the API call succeed?",
      outcomes: [
        { type: "ok", label: "Yes", text: "Parse response, send final reply to customer" },
        { type: "fail", label: "No / Failed", text: "Unassign ticket → human agent picks it up" },
      ],
    },
    {
      condition: "User replied to template with details",
      outcomes: [
        { type: "ok", label: "Complete details", text: "Filter details → hit API → send response" },
        { type: "fail", label: "Still incomplete", text: "Unassign ticket to agent" },
      ],
    },
  ],
  cases: [
    {
      tone: "green",
      label: "Best case",
      title: "Auto-resolved",
      text: "Fields extracted → API hit → reply sent → ticket closed. Zero human intervention.",
    },
    {
      tone: "amber",
      label: "Partial case",
      title: "Template sent",
      text: "Missing fields → user prompted → re-processed on reply.",
    },
    {
      tone: "coral",
      label: "Fallback case",
      title: "Escalated to agent",
      text: "API failure or persistent missing info → unassigned.",
    },
  ],
};

export const conversationEngine = {
  label: "Stage 6 — Conversation engine",
  title: "5-turn context-aware dialogue tracking",
  subtitle:
    "Every ticket tracks how many conversation turns have happened. Each stage is handled differently based on content and email origin.",
  turns: [
    {
      num: 1,
      label: "Initial email",
      desc: "Full pipeline runs. Classify, extract, API, respond.",
      pills: ["Process", "Template"],
    },
    {
      num: 2,
      label: "Back-to-back",
      desc: "Same user emails again consecutively.",
      pills: ["Internal → close", "External → unassign"],
    },
    {
      num: 3,
      label: "User reply",
      desc: "Reply to template or AI response.",
      pills: ["Complete → process", "Thanks → close", "Incomplete → unassign"],
    },
    {
      num: 4,
      label: "Persisting query",
      desc: "Ongoing dissatisfaction or complexity.",
      pills: ["Internal → close", "External → unassign"],
    },
    {
      num: 5,
      label: "Final follow-up",
      desc: "Last handled turn before full escalation.",
      pills: ["Positive → close", "Further query → unassign"],
    },
  ],
  details: [
    {
      tone: "green",
      title: "Auto-close triggers",
      text: 'Affirmative replies like "thank you", "got it", "resolved" at Convo 3 & 5 automatically close the ticket.',
    },
    {
      tone: "blue",
      title: "Internal domain logic",
      text: "Emails from internal domains at Convo 2 & 4 are treated as agent intervention and closed immediately.",
    },
    {
      tone: "amber",
      title: "Template re-processing",
      text: "At Convo 3, if the user filled in the template correctly, the full API flow runs again from scratch.",
    },
    {
      tone: "coral",
      title: "Escalation triggers",
      text: "Back-to-back external emails, persistent queries, or API failures all result in unassignment to a human agent.",
    },
    {
      tone: "purple",
      title: "Assignee tracking",
      text: 'The system only processes tickets where assignee = "AI_BOT", ensuring it never overrides human agent work.',
    },
  ],
};

export const myImpact = {
  label: "My contribution",
  title: "Impact, Testing & Outcomes",
  subtitle:
    "Measurable engineering impact driven by expanded API coverage, complex intent pipelines, and zero-downtime deployment strategies to ensure enterprise-grade reliability.",

  stats: [
    { value: "+10%", label: "Auto-closure" },
    { value: "+50%", label: "NFTR Assistance" },
    { value: "7+", label: "New Intents" },
    { value: "Hourly Logs", label: "Real-time Monitoring" },
  ],

  problemsBefore: [
    {
      title: "Low Intent Identification Rate",
      text: "The system struggled to accurately identify the customer's intent from raw email text, leading to frequent misrouting and manual fallbacks.",
      tone: "coral",
      icon: "TrendingDown"
    },
    {
      title: "Low Auto-closure Percentage",
      text: "Due to missing API coverage and incomplete end-to-end automation logic, the majority of tickets required an agent to manually review and close.",
      tone: "amber",
      icon: "XCircle"
    },
    {
      title: "Low NFTR Rate",
      text: "Net First Time Resolution was suboptimal because the pipeline frequently failed to extract all necessary structured data on the initial interaction.",
      tone: "purple",
      icon: "AlertTriangle"
    },
    {
      title: "Lack of Error Logs & Monitoring",
      text: "With no robust error tracking or proactive queue monitoring, debugging failures was reactive and time-consuming, affecting SLA response times.",
      tone: "blue",
      icon: "SearchX"
    },
    {
      title: "Security & Deployment Bottlenecks",
      text: "System secrets were previously exposed, and even minor disposition updates required prolonged, full-system deployments.",
      tone: "coral",
      icon: "ShieldAlert"
    },
    {
      title: "Manual & Time-Intensive Testing",
      text: "Testing new routing logic and intents relied heavily on manual, time-consuming methods, slowing down release cycles and increasing regression risks.",
      tone: "purple",
      icon: "Beaker"
    }
  ],

  detailedImpacts: [
    {
      sectionHeading: "Solutions for Auto-Closure & NFTR Assistance",
      title: "Dedicated 'Portal Issues' Pipeline",
      text: "Designed and launched a specialized automation pipeline for high-volume 'Portal Issues'. By resolving ticket processing bugs and optimizing runtime calculations, we drastically reduced agent escalations, accelerating turnaround times and driving significant operational cost savings.",

      metricLabel: "Auto-resolution for portal issues",
      tone: "purple",
      image: "/assets/metrices/feb_portal_effect.png",
      imageCaption: "Business impact of portal routing updates",
      extraMetrics: [
        { value: "+8%", label: "Auto-Closure\nIncrease" },
        { value: "+50%", label: "NFTR\nAuto-Closure" }
      ]
    },
    {
      title: "Claim Intents",
      text: "Engineered the complete automation logic and pipeline integration for multiple new claim intents, including 'Original Document Return Request', 'Remaining Document Submission Request', and 'Vidal Branch Details'. This minimized manual fallbacks and expanded overall automation coverage.",
      metricLabel: "Claim Flows Auto-resolution",
      tone: "blue",
      image: "/assets/metrices/feb_claim.png",
      imageCaption: "Claim automation success rate (Feb)",
      extraMetrics: [
        { value: "+3%", label: "Total\nAutoclosure" },
        { value: "+4%", label: "Claims\nAutoclosure" }
      ]
    },
    {
      title: "Preauth Intents",
      text: "Developed sophisticated new intent flows including 'Preauth Rejected Reconsideration', 'Deduction Reconsideration', and 'Preauth Deduction Clarification'. This involved writing complex logic to cross-reference approved preauths with internal Vings data over a 7-day expectation window to accurately summarize remaining deductions.",
      metricLabel: "Preauth Automation",
      tone: "amber",
      image: ["/assets/metrices/preauth_1.png", "/assets/metrices/preauth_2.png"],
      imageCaption: "Preauth Automation Impact",
      extraMetrics: [
        { value: "+2%", label: "Total\nAutoclosure" },
        { value: "+5%", label: "Preauth\nAutoclosure" },
        { value: "+2%", label: "Total NFTR\nAutoclosure" }
      ]
    },
    {
      title: "Escalation Fixes & System Upgrades",
      text: "Identified and resolved critical escalation bugs and deployed a series of miscellaneous system upgrades to streamline edge-case handling. This comprehensive stabilization effort directly contributed to a further increase in overall system automation.",
      metricLabel: "System Stabilization",
      tone: "coral",
      image: null,
      extraMetrics: [
        { value: "+2%", label: "Total Autoclosure" }
      ]
    },
    {
      sectionHeading: "Solutions for Testing, Security & Error Logging",
      layout: "stress_test",
      title: "Testing Branches for Kafka & Production Cases",
      text: "Created dedicated testing branches for Kafka and Salesforce load testing to evaluate load balancing and system stability under heavy concurrent processing.",
      scenario: "Simulated 80,000 ticket events to validate load distribution across Kafka and Salesforce integrations.",
      tags: ["Kafka Streams", "Load Balancing", "Salesforce API", "Concurrency Testing", "Production Simulation"],
      keyFinding: "Kafka can handle 80,000 events concurrently, while Salesforce API maintains stability up to 10,000 events.",
      metricLabel: "System Stress Testing",
      tone: "purple",
      results: [
        { name: "Kafka", label: "Load Capacity", value: "80,000", max: 80000, actual: 80000, color: "#b69cf8", statusText: "Successfully processed 80,000 concurrent tickets", statusColor: "#22c55e", icon: "kafka" },
        { name: "Salesforce", label: "Load Capacity", value: "10,000", max: 80000, actual: 10000, color: "#3b82f6", statusText: "API limits allow processing of 10,000 tickets at once", statusColor: "#f97316", icon: "salesforce" }
      ]
    },
    {
      layout: "automated_testing",
      title: "Dedicated Production Case Testing Branch",
      text: "Built a dedicated testing branch capable of automatically executing production-like testing scenarios using real support cases and attachments.",
      scenario: "The system automatically fetches production case details, attachments, metadata, and workflow context using only a case number. It then creates a UAT case and executes the complete testing flow without requiring repeated manual email coordination.",
      keyFinding: "Testing new intents now only need a case number to execute complete end-to-end validation flows automatically, eliminating repetitive email coordination and manual setup work.",
      metricLabel: "Automated Testing Workflow",
      tone: "blue",

      results: [
        { value: "100%", label: "Manual Testing Effort Reduced", icon: "trending", color: "#22c55e", statusText: "Significant improvement in productivity" },
        { value: "1 Case ID", label: "Required To Execute Full Flow", icon: "document", color: "#3b82f6", statusText: "All details fetched automatically" },
        { value: "Auto", label: "Case Fetching & UAT Generation", icon: "zap", color: "#a855f7", statusText: "End-to-end flow executed automatically" }
      ],
      workflowSteps: [
        { text: "Fetch Case Details", icon: "file" },
        { text: "Sync Attachments", icon: "paperclip" },
        { text: "Create UAT Case", icon: "plus" },
        { text: "Execute Flow", icon: "play" }
      ]
    },
    {
      layout: "platform_security",
      metricLabel: "Platform Security",
      title: "Azure Key Vault & Dynamic Runtime Configs",
      text: "Centralized sensitive secrets using Azure Key Vault and migrated refresh configurations to MongoDB-driven runtime updates to eliminate deployment dependency and reduce configuration propagation delays.",
      features: [
        {
          title: "Azure Key Vault",
          text: "Moved API secrets, credentials, and environment configurations to Azure Key Vault for secure centralized runtime access.",
          icon: "Lock",
        },
        {
          title: "MongoDB Runtime Configs",
          text: "Enabled near real-time disposition updates by shifting refresh configurations to MongoDB runtime synchronization.",
          icon: "Database",
        }
      ],
      tags: [
        "Secrets Encryption",
        "Runtime Sync",
        "MongoDB Configs",
        "Zero Hardcoded Secrets",
        "Real-time Refresh"
      ],
      metrics: [
        {
          value: "25 min",
          secondary: "3 min",
          label: "Configuration Refresh Optimization",
          icon: "Clock",
        },
        {
          value: "100%",
          secondary: "Centralized Secrets",
          label: "Azure Key Vault Migration",
          icon: "Shield",
        }
      ]
    },
    {
      layout: "reporting_dashboard",
      sectionHeading: "Automated Reporting & Error Monitoring",
      images: {
        hourly: "/assets/reports/hourly_overview.png",
        daily: "/assets/reports/tpa_metrics.png",
        delayed: "/assets/reports/delayed_tickets.png",
        scoped: "/assets/reports/bot_cannot_handle.png"
      }
    },
  ],
};

export const stellarSquadAward = {
  sectionHeading: "Achievements", 
  layout: "stellar_squad_award",
  badge: "RECOGNITION & ACHIEVEMENTS",
  title: "Stellar Squad",
  titleAccent: "Award",
  description:
    "Recognized for driving impactful enterprise-scale customer service automation initiatives across Vidal through AI-powered workflow optimization and operational transformation.",
  metrics: [
    {
      value: "50%+",
      label: "Headcount Reduction",
      icon: "users",
    },
    {
      value: "68%",
      label: "Auto-answer Rate",
      icon: "message",
    },
    {
      value: "94%",
      label: "Automation Accuracy",
      icon: "target",
    },
    {
      value: "100+",
      label: "SFDC IDs Transitioned",
      icon: "cloud",
    },
  ],
  insight: "Awarded for collaboration, execution speed, automation impact, and successful large-scale AI workflow deployment.",
  certificatePath: "/assets/metrices/Stellar_Squad_Award.png",
};

