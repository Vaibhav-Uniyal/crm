import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactFlowWorkflow from "../workflow/ReactFlowWorkflow";

const nodes = [
  { id: "crm", label: "Salesforce", sublabel: "Case creation", position: { x: 0, y: 0 }, color: "#22d3ee", targetPosition: "left", sourcePosition: "right" },
  { id: "kafka", label: "Kafka", sublabel: "Fetch cases", position: { x: 260, y: 0 }, color: "#38bdf8", targetPosition: "left", sourcePosition: "right" },
  
  { id: "pod1", label: "Pod 1", position: { x: 520, y: -160 }, color: "#818cf8", targetPosition: "left", sourcePosition: "right" },
  { id: "pod2", label: "Pod 2", position: { x: 520, y: -80 }, color: "#818cf8", targetPosition: "left", sourcePosition: "right" },
  { id: "pod3", label: "Pod 3", position: { x: 520, y: 0 }, color: "#818cf8", targetPosition: "left", sourcePosition: "right" },
  { id: "pod4", label: "Pod 4", position: { x: 520, y: 80 }, color: "#818cf8", targetPosition: "left", sourcePosition: "right" },
  { id: "pod5", label: "Pod 5", position: { x: 520, y: 160 }, color: "#818cf8", targetPosition: "left", sourcePosition: "right" },

  { id: "pre", label: "Preprocessor", sublabel: "Junk processing", position: { x: 780, y: 0 }, color: "#8b5cf6", targetPosition: "left", sourcePosition: "right" },
  { id: "orch", label: "Summarization", sublabel: "Summarize email", position: { x: 1040, y: 0 }, color: "#6366f1", targetPosition: "left", sourcePosition: "bottom" },
  
  { id: "gpt", label: "GPT", sublabel: "Classify + NER", position: { x: 920, y: 140 }, color: "#10A37F", targetPosition: "top", sourcePosition: "bottom" },
  { id: "gemini", label: "Gemini", sublabel: "Validation", position: { x: 1160, y: 140 }, color: "#4285F4", targetPosition: "top", sourcePosition: "bottom" },
  
  { id: "router", label: "Router", sublabel: "Auto-routing", position: { x: 1040, y: 310 }, color: "#34d399", targetPosition: "top", sourcePosition: "left" },
  
  { id: "api", label: "Module APIs", sublabel: "User Verification", position: { x: 730, y: 250 }, color: "#fbbf24", targetPosition: "right", sourcePosition: "left" },
  { id: "template", label: "Templates", sublabel: "Re-engage", position: { x: 730, y: 380 }, color: "#a78bfa", targetPosition: "right", sourcePosition: "left" },
  
  { id: "analytics", label: "User Response", sublabel: "Template Sent to User", position: { x: 450, y: 320 }, color: "#22d3ee", targetPosition: "right", sourcePosition: "left" },
];

const edges = [
  { id: "e1", source: "crm", target: "kafka" },
  
  { id: "eq1", source: "kafka", target: "pod1" },
  { id: "eq2", source: "kafka", target: "pod2" },
  { id: "eq3", source: "kafka", target: "pod3" },
  { id: "eq4", source: "kafka", target: "pod4" },
  { id: "eq5", source: "kafka", target: "pod5" },

  { id: "ep1", source: "pod1", target: "pre" },
  { id: "ep2", source: "pod2", target: "pre" },
  { id: "ep3", source: "pod3", target: "pre" },
  { id: "ep4", source: "pod4", target: "pre" },
  { id: "ep5", source: "pod5", target: "pre" },

  { id: "e3", source: "pre", target: "orch" },
  { id: "e4", source: "orch", target: "gpt" },
  { id: "e5", source: "orch", target: "gemini" },
  { id: "e6", source: "gpt", target: "router" },
  { id: "e7", source: "gemini", target: "router" },
  { id: "e8", source: "router", target: "api" },
  { id: "e9", source: "router", target: "template" },
  { id: "e10", source: "api", target: "analytics" },
  { id: "e11", source: "template", target: "analytics" },
];

const flowOrder = [
  "crm",
  "kafka",
  "pod1,pod2,pod3,pod4,pod5",
  "pre",
  "orch",
  "gpt,gemini",
  "router",
  "api,template",
  "analytics",
  "done"
];

export default function ArchitectureDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % flowOrder.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [running]);

  const activeNodeId = flowOrder[activeIndex];
  const completedNodeIds = flowOrder.slice(0, activeIndex);

  return (
    <div>
      <ReactFlowWorkflow
        nodes={nodes}
        edges={edges}
        activeNodeId={activeNodeId}
        completedNodeIds={completedNodeIds}
        height="65vh"
      />
      <div
        className="flex justify-center gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => setRunning(!running)}
          className="text-sm px-4 py-2 rounded-full glass text-zinc-300 hover:text-white"
        >
          {running ? "Pause flow" : "Resume flow"}
        </button>
      </div>
    </div>
  );
}
