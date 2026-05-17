import { useState, useEffect } from "react";
import ReactFlowWorkflow from "../workflow/ReactFlowWorkflow";

const nodes = [
  { id: "gpt", label: "GPT", sublabel: "Classification Result", position: { x: 0, y: -80 }, color: "#10A37F", targetPosition: "left", sourcePosition: "right" },
  { id: "gemini", label: "Gemini", sublabel: "Classification Result", position: { x: 0, y: 80 }, color: "#4285F4", targetPosition: "left", sourcePosition: "right" },
  
  { id: "match1", label: "Categories Match?", sublabel: "Initial check", position: { x: 280, y: 0 }, color: "#38bdf8", targetPosition: "left", sourcePosition: "right" },
  
  { id: "yes1", label: "Proceed to NER", sublabel: "YES Path", position: { x: 560, y: -100 }, color: "#10b981", targetPosition: "left", sourcePosition: "right" },
  
  { id: "no1", label: "Summarize & Retry", sublabel: "NO Path (Models re-evaluate)", position: { x: 560, y: 100 }, color: "#f59e0b", targetPosition: "left", sourcePosition: "right" },
  
  { id: "match2", label: "Match on Retry?", sublabel: "Secondary check", position: { x: 840, y: 100 }, color: "#38bdf8", targetPosition: "left", sourcePosition: "right" },
  
  { id: "yes2", label: "Proceed to NER", sublabel: "YES Path", position: { x: 1120, y: 0 }, color: "#10b981", targetPosition: "left", sourcePosition: "right" },
  
  { id: "no2", label: "Fallback: Gemini", sublabel: "NO Path (Final verdict)", position: { x: 1120, y: 200 }, color: "#a855f7", targetPosition: "left", sourcePosition: "right" },
];

const edges = [
  { id: "e1", source: "gpt", target: "match1" },
  { id: "e2", source: "gemini", target: "match1" },
  
  { id: "e3", source: "match1", target: "yes1" },
  { id: "e4", source: "match1", target: "no1" },
  
  { id: "e5", source: "no1", target: "match2" },
  
  { id: "e6", source: "match2", target: "yes2" },
  { id: "e7", source: "match2", target: "no2" },
];

const flowOrder = [
  "gpt,gemini",
  "match1",
  "no1",
  "match2",
  "no2",
  "done"
];

export default function RetryFlowDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % flowOrder.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const activeNodeId = flowOrder[activeIndex];
  const completedNodeIds = flowOrder.slice(0, activeIndex);

  return (
    <div className="w-full mt-8">
      <ReactFlowWorkflow
        nodes={nodes}
        edges={edges}
        activeNodeId={activeNodeId}
        completedNodeIds={completedNodeIds}
        height="45vh"
      />
    </div>
  );
}
