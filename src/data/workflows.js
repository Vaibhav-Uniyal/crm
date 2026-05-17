export const masterPipeline = [
  { id: "submit", label: "Email Received", icon: "mail", color: "#6366f1" },
  { id: "parse", label: "Parse & Preprocess", icon: "fileText", color: "#818cf8" },
  { id: "filter", label: "Junk & Filters", icon: "filter", color: "#a78bfa" },
  { id: "mask", label: "Data Masking", icon: "shield", color: "#c4b5fd" },
  { id: "classify", label: "GPT + Gemini", icon: "brain", color: "#22d3ee" },
  { id: "match", label: "Category Match", icon: "gitBranch", color: "#34d399" },
  { id: "ner", label: "NER Extraction", icon: "scan", color: "#2dd4bf" },
  { id: "api", label: "API Integration", icon: "plug", color: "#fbbf24" },
  { id: "respond", label: "Auto Response", icon: "send", color: "#34d399" },
  { id: "analytics", label: "Analytics Update", icon: "barChart", color: "#fb7185" },
];

export const intakeSteps = [
  { id: "poll", label: "Email Polling", desc: "Fetch from CRM inbox" },
  { id: "parse", label: "HTML Strip", desc: "Clean email content" },
  { id: "attach", label: "Attachments", desc: "Extract text from files" },
  { id: "junk", label: "Spam Check", desc: "Filter junk emails" },
  { id: "length", label: "Summarize", desc: "Optimize long content" },
  { id: "internal", label: "Internal Check", desc: "Domain & keyword filters" },
  { id: "mask", label: "PII Masking", desc: "Mask sensitive data" },
];

export const aiSteps = [
  { id: "gpt", label: "GPT Classification", desc: "Category & subcategory" },
  { id: "gemini", label: "Gemini Classification", desc: "Parallel validation" },
  { id: "match", label: "Dual Match", desc: "GPT ∩ Gemini agreement" },
  { id: "sub", label: "Subclassification", desc: "When categories align" },
  { id: "ner", label: "NER via GPT", desc: "Policy, enrollment IDs" },
  { id: "confidence", label: "Confidence Score", desc: "Routing decision weight" },
];

export const routingSteps = [
  { id: "folder", label: "Folder Mapping", desc: "Automation rules" },
  { id: "category", label: "Category Gate", desc: "Eligible categories only" },
  { id: "details", label: "Detail Validation", desc: "Required fields check" },
  { id: "api", label: "Module APIs", desc: "Hit service endpoints" },
  { id: "template", label: "Template Path", desc: "Insufficient details" },
  { id: "resolve", label: "Resolution", desc: "Final response sent" },
];

export const escalationSteps = [
  { id: "low", label: "Low Confidence", desc: "Below threshold" },
  { id: "mismatch", label: "GPT ≠ Gemini", desc: "Classification conflict" },
  { id: "incomplete", label: "Missing Details", desc: "After template reply" },
  { id: "api-fail", label: "API Failure", desc: "Integration error" },
  { id: "convo2", label: "Back-to-Back", desc: "Convo 2 external" },
  { id: "human", label: "Unassign Ticket", desc: "Human agent queue" },
];

export const analyticsSteps = [
  { id: "classify", label: "Classification Rate", desc: "GPT+Gemini success" },
  { id: "auto", label: "Automation %", desc: "Fully automated tickets" },
  { id: "response", label: "Response Time", desc: "Time to first reply" },
  { id: "escalation", label: "Escalation Rate", desc: "Human handoffs" },
  { id: "convo", label: "Conversation Depth", desc: "Multi-turn tracking" },
];

export const conversationFlow = [
  { convo: 1, action: "Full AI pipeline", outcome: "Classify → Extract → API → Respond" },
  { convo: 2, action: "Follow-up check", outcome: "Internal → Close | External → Unassign" },
  { convo: 3, action: "Template reply", outcome: "Complete details → API | Else → Unassign" },
  { convo: 4, action: "Persistence", outcome: "Complex queries → Specialized attention" },
  { convo: 5, action: "Final handling", outcome: "Thank you → Close | More queries → Unassign" },
];
