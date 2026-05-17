import { motion } from "framer-motion";
import WorkflowPageLayout from "../../components/workflow/WorkflowPageLayout";
import { escalationSteps, conversationFlow } from "../../data/workflows";

const pipelineSteps = escalationSteps.map((s, i) => ({
  id: s.id,
  label: s.label,
  icon: ["filter", "gitBranch", "fileText", "plug", "mail", "send"][i],
  color: ["#fb7185", "#fbbf24", "#fb7185", "#f97316", "#eab308", "#ef4444"][i],
}));

export default function EscalationWorkflow() {
  return (
    <WorkflowPageLayout
      badge="Workflow · Escalation"
      title="Escalation & Handoff"
      subtitle="When confidence drops, models disagree, or conversations escalate — tickets route to human agents."
      steps={escalationSteps}
      pipelineSteps={pipelineSteps}
      variant="warning"
      stepDuration={2600}
      sidePanel={({ activeIndex }) => (
        <div className="w-full">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4 text-center">
            Conversation state machine
          </p>
          <div className="space-y-2">
            {conversationFlow.map((c, i) => {
              const isActive = i === Math.min(activeIndex, conversationFlow.length - 1);
              return (
                <div
                  key={c.convo}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    x: isActive ? 4 : 0,
                    borderColor: isActive ? "rgba(251, 113, 133, 0.5)" : "rgba(255,255,255,0.08)",
                  }}
                  className="glass rounded-lg p-3 border-l-2 border-l-rose-500/50"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? "bg-rose-500 text-white" : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {c.convo}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${isActive ? "text-white" : "text-zinc-500"}`}>
                        {c.action}
                      </p>
                      <p className="text-xs text-zinc-600">{c.outcome}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {activeIndex >= 5 && (
            <div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-6 text-center py-4 rounded-xl bg-rose-500/20 border border-rose-500/40"
            >
              <p className="text-rose-300 font-semibold text-sm">Ticket Unassigned → Human Queue</p>
            </div>
          )}
        </div>
      )}
    />
  );
}
