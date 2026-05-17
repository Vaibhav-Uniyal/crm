import { motion } from "framer-motion";
import WorkflowPageLayout from "../../components/workflow/WorkflowPageLayout";
import AnimatedCounter from "../../components/metrics/AnimatedCounter";
import { analyticsSteps } from "../../data/workflows";

const pipelineSteps = analyticsSteps.map((s, i) => ({
  id: s.id,
  label: s.label,
  icon: "barChart",
  color: ["#6366f1", "#22d3ee", "#34d399", "#fb7185", "#a78bfa"][i],
}));

const metricValues = { classify: 94, auto: 78, response: 42, escalation: 12, convo: 61 };

export default function AnalyticsWorkflow() {
  return (
    <WorkflowPageLayout
      badge="Workflow · Analytics"
      title="Live Analytics Pipeline"
      subtitle="Every resolution feeds metrics — classification rates, automation %, and escalation tracking."
      steps={analyticsSteps}
      pipelineSteps={pipelineSteps}
      sidePanel={({ activeIndex }) => {
        const step = analyticsSteps[activeIndex];
        const value = step ? metricValues[step.id] ?? 0 : 0;

        return (
          <div className="w-full flex flex-col items-center justify-center min-h-[300px]">
            <AnimatedCounter
              value={value}
              suffix={step?.id === "escalation" ? "% escalated" : "%"}
              color={
                step?.id === "escalation" ? "#fb7185" : "#6366f1"
              }
            />
            <motion.p
              key={step?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-zinc-500 text-center"
            >
              {step?.desc}
            </motion.p>
            <div className="mt-8 w-full space-y-2">
              {analyticsSteps.map((s, i) => (
                <div
                  key={s.id}
                  className="h-2 rounded-full bg-zinc-800 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{
                      width: i <= activeIndex ? `${metricValues[s.id]}%` : "0%",
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}
