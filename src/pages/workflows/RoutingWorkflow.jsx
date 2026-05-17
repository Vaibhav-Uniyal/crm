import { motion } from "framer-motion";
import WorkflowPageLayout from "../../components/workflow/WorkflowPageLayout";
import ReactFlowWorkflow from "../../components/workflow/ReactFlowWorkflow";
import { routingSteps } from "../../data/workflows";

const flowNodes = [
  { id: "folder", label: "Folder Map", position: { x: 0, y: 120 } },
  { id: "category", label: "Category Gate", position: { x: 200, y: 120 } },
  { id: "details", label: "Validate", position: { x: 400, y: 120 } },
  { id: "api", label: "Module API", position: { x: 600, y: 40 } },
  { id: "template", label: "Template", position: { x: 600, y: 200 } },
  { id: "resolve", label: "Resolve", position: { x: 800, y: 120 } },
];

const flowEdges = [
  { id: "e1", source: "folder", target: "category" },
  { id: "e2", source: "category", target: "details" },
  { id: "e3", source: "details", target: "api" },
  { id: "e4", source: "details", target: "template" },
  { id: "e5", source: "api", target: "resolve" },
  { id: "e6", source: "template", target: "resolve" },
];

const pipelineSteps = routingSteps.map((s, i) => ({
  id: s.id,
  label: s.label,
  icon: ["gitBranch", "filter", "scan", "plug", "mail", "send"][i],
  color: ["#6366f1", "#34d399", "#22d3ee", "#fbbf24", "#a78bfa", "#10A37F"][i],
}));

export default function RoutingWorkflow() {
  return (
    <WorkflowPageLayout
      badge="Workflow · Routing"
      title="Intelligent Auto-Routing"
      subtitle="Folder automation maps categories to modules. Complete details hit APIs; gaps trigger templates."
      steps={routingSteps}
      pipelineSteps={pipelineSteps}
      sidePanel={({ activeIndex }) => {
        const activeId = routingSteps[activeIndex]?.id;
        const branch = activeId === "template" ? "template" : activeId === "api" ? "api" : null;

        return (
          <div className="w-full space-y-6">
            {branch && (
              <div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center py-3 rounded-xl border ${
                  branch === "api"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                }`}
              >
                {branch === "api" ? "→ API path active" : "→ Template path active"}
              </div>
            )}
            <ReactFlowWorkflow
              nodes={flowNodes}
              edges={flowEdges}
              activeNodeId={activeId}
              completedNodeIds={routingSteps.slice(0, activeIndex).map((s) => s.id)}
              height={380}
            />
          </div>
        );
      }}
    />
  );
}
