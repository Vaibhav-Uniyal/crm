import { motion } from "framer-motion";
import WorkflowPageLayout from "../../components/workflow/WorkflowPageLayout";
import ConfidenceMeter from "../../components/workflow/ConfidenceMeter";
import ReactFlowWorkflow from "../../components/workflow/ReactFlowWorkflow";
import { aiSteps } from "../../data/workflows";

const flowNodes = [
  { id: "gpt", label: "GPT Classify", position: { x: 0, y: 100 } },
  { id: "gemini", label: "Gemini Classify", position: { x: 0, y: 220 } },
  { id: "match", label: "Match Gate", position: { x: 250, y: 160 } },
  { id: "sub", label: "Subclassify", position: { x: 450, y: 160 } },
  { id: "ner", label: "NER Extract", position: { x: 650, y: 160 } },
  { id: "confidence", label: "Confidence", position: { x: 850, y: 160 } },
];

const flowEdges = [
  { id: "e1", source: "gpt", target: "match" },
  { id: "e2", source: "gemini", target: "match" },
  { id: "e3", source: "match", target: "sub" },
  { id: "e4", source: "sub", target: "ner" },
  { id: "e5", source: "ner", target: "confidence" },
];

const pipelineSteps = aiSteps.map((s, i) => ({
  id: s.id,
  label: s.label,
  icon: ["brain", "brain", "gitBranch", "brain", "scan", "brain"][i],
  color: ["#10A37F", "#4285F4", "#6366f1", "#22d3ee", "#a78bfa", "#34d399"][i],
}));

const confidenceByStep = { gpt: 45, gemini: 52, match: 68, sub: 78, ner: 88, confidence: 94 };

export default function AIWorkflow() {
  return (
    <WorkflowPageLayout
      badge="Workflow · AI"
      title="Dual-Model AI Processing"
      subtitle="GPT and Gemini classify in parallel. Agreement unlocks NER extraction and routing."
      steps={aiSteps}
      pipelineSteps={pipelineSteps}
      variant="ai"
      stepDuration={2800}
      sidePanel={({ activeIndex }) => {
        const step = aiSteps[activeIndex];
        const confidence = step ? confidenceByStep[step.id] ?? 50 : 0;
        const activeId = step?.id;

        return (
          <div className="w-full space-y-8">
            <ConfidenceMeter
              value={confidence}
              threshold={70}
              active={activeIndex >= 0}
            />
            <div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {step?.id === "match" && (
                <div className="flex justify-center gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    GPT ✓
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Gemini ✓
                  </span>
                </div>
              )}
              {step?.id === "gpt" && (
                <p className="text-xs text-zinc-500 font-mono">category: policy_inquiry</p>
              )}
              {step?.id === "ner" && (
                <div className="flex flex-wrap justify-center gap-2">
                  {["policy_no", "enrollment_id", "name"].map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-1 text-xs font-mono rounded bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
            <ReactFlowWorkflow
              nodes={flowNodes}
              edges={flowEdges}
              activeNodeId={activeId}
              completedNodeIds={aiSteps.slice(0, activeIndex).map((s) => s.id)}
              height={320}
            />
          </div>
        );
      }}
    />
  );
}
