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

export const systemSummary = {
  label: "Summary",
  title: "What we've built",
  subtitle:
    "A fully automated, AI-powered CRM email processing system with enterprise-grade reliability, dual-model validation, and multi-turn dialogue awareness.",
  cards: [
    {
      icon: "⚡",
      tone: "green",
      title: "Kafka + Salesforce ingestion",
      text: "Cases are pushed in real-time from Salesforce via Kafka — scalable, ordered, and replay-capable. No polling lag.",
    },
    {
      icon: "🤖",
      tone: "purple",
      title: "GPT + Gemini dual classification",
      text: "Two independent AI models must agree on the subcategory before any ticket is processed — reducing misclassification.",
    },
    {
      icon: "🔍",
      tone: "blue",
      title: "Automated NER & API resolution",
      text: "User identifiers are extracted, cleaned, and used to fetch full CRM data — then module APIs are hit automatically.",
    },
    {
      icon: "💬",
      tone: "amber",
      title: "5-turn conversation engine",
      text: "Context is tracked across up to 5 email turns per ticket, with intelligent escalation, closure, and template follow-ups.",
    },
  ],
  stats: [
    { value: "6", label: "Pipeline stages" },
    { value: "2", label: "AI models" },
    { value: "5", label: "Convo turns tracked" },
    { value: "0", label: "Manual steps (best case)" },
    { value: "100%", label: "PII masked" },
  ],
};

export const myImpact = {
  label: "My contribution",
  title: "Impact, Testing & Outcomes",
  subtitle:
    "Key deliverables focusing on ground truth robustness, prompt optimization, and rigorous flow testing to ensure enterprise-grade reliability.",
  
  stats: [
    { value: "Ground Truth", label: "Dataset optimization", sub: "Built robust test sets" },
    { value: "Prompts", label: "Iterative testing", sub: "High accuracy consensus" },
    { value: "10+", label: "Test flows", sub: "Rigorous branch validation" },
    { value: "Metrics", label: "Measurable impact", sub: "Clear month-over-month growth" },
  ],

  detailedImpacts: [
    {
      title: "Prompt Engineering & Ground Truth Optimization",
      text: "Iteratively refined classification prompts and established robust ground truth datasets to help the model better understand email summaries. This drastically reduced misclassification rates and improved overall AI consensus reliability.",
      percentage: "+15%",
      metricLabel: "Accuracy increase",
      tone: "green",
      image: "/assets/metrices/Feb.png",
      imageCaption: "February Accuracy vs January baseline"
    },
    {
      title: "Portal Issues Pipeline Creation",
      text: "Engineered an entirely new automation pipeline dedicated to handling 'portal issues'. This included error fixing in ticket processing and runtime calculations, directly increasing the system's accuracy by 5-10%.",
      percentage: "+8%",
      metricLabel: "Portal processing accuracy",
      tone: "purple",
      image: "/assets/metrices/feb_portal_effect.png",
      imageCaption: "Impact of portal routing updates"
    },
    {
      title: "Claim & Branch Details Integration",
      text: "Engineered the complete automation logic and pipeline integration for handling 'claim' and 'branch details' intents, significantly minimizing manual fallback rates for these specific queries.",
      percentage: "-22%",
      metricLabel: "Reduction in manual triage",
      tone: "blue",
      image: "/assets/metrices/feb_claim.png",
      imageCaption: "Claim automation success rate (Feb)"
    },
    {
      title: "Complex Preauth & Deduction Flows",
      text: "Developed sophisticated new intent flows, including 'Preauth Clarification Deduction'. This involved writing logic to cross-reference approved preauths with Vings data over a 7-day expectation to summarize remaining deductions.",
      percentage: "New",
      metricLabel: "Feature Delivery",
      tone: "amber",
      image: null
    },
    {
      title: "Document Returns & Rejection Intents",
      text: "Designed and implemented multiple new conversational flows, including a dedicated intent for 'Original Documents Return Request' and handling 'Rejection' scenarios.",
      percentage: "New",
      metricLabel: "Intent Expansion",
      tone: "coral",
      image: null
    },
    {
      title: "API Timing & Security Enhancements",
      text: "Analyzed API timing calls across the system, optimized database interactions for single-ticket runtime, migrated system secrets to MongoDB, and updated cron monitoring for 30-minute STP response thresholds.",
      percentage: "Opt",
      metricLabel: "System Performance",
      tone: "green",
      image: null
    },
    {
      title: "Enhanced Reporting & Queue Monitoring Efficiency",
      text: "Optimized automated reporting deployments and queue monitoring processes to deliver faster insights and smoother issue resolution.",
      percentage: "TBD",
      metricLabel: "Reporting Efficiency",
      tone: "purple",
      image: null
    }
  ],
};
