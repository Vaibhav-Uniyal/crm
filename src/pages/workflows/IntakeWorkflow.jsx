import WorkflowPageLayout from "../../components/workflow/WorkflowPageLayout";
import ReactFlowWorkflow from "../../components/workflow/ReactFlowWorkflow";
import { intakeSteps } from "../../data/workflows";

const flowNodes = [
  { id: "poll", label: "Email Poll", position: { x: 0, y: 80 } },
  { id: "parse", label: "HTML Strip", position: { x: 180, y: 80 } },
  { id: "attach", label: "Attachments", position: { x: 360, y: 80 } },
  { id: "junk", label: "Spam Filter", position: { x: 540, y: 80 } },
  { id: "length", label: "Summarize", position: { x: 720, y: 80 } },
  { id: "internal", label: "Internal Check", position: { x: 900, y: 80 } },
  { id: "mask", label: "PII Mask", position: { x: 1080, y: 80 } },
];

const flowEdges = flowNodes.slice(0, -1).map((n, i) => ({
  id: `e${i}`,
  source: n.id,
  target: flowNodes[i + 1].id,
}));

const pipelineSteps = intakeSteps.map((s, i) => ({
  id: s.id,
  label: s.label,
  icon: ["mail", "fileText", "fileText", "filter", "fileText", "filter", "shield"][i],
  color: ["#6366f1", "#818cf8", "#a78bfa", "#c4b5fd", "#22d3ee", "#34d399", "#10A37F"][i],
}));

export default function IntakeWorkflow() {
  return (
    <WorkflowPageLayout
      badge="Workflow · Intake"
      title="Email Intake Pipeline"
      subtitle="From CRM inbox to AI-ready — every email sanitized, filtered, and masked."
      steps={intakeSteps}
      pipelineSteps={pipelineSteps}
      sidePanel={({ activeIndex }) => {
        const activeId = intakeSteps[activeIndex]?.id;
        return (
          <div className="w-full">
            <ReactFlowWorkflow
              nodes={flowNodes}
              edges={flowEdges}
              activeNodeId={activeId}
              completedNodeIds={intakeSteps.slice(0, activeIndex).map((s) => s.id)}
              height={360}
            />
          </div>
        );
      }}
    />
  );
}
