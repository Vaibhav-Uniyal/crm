import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import AnimatedBackground from "../layout/AnimatedBackground";
import FloatingParticles from "../layout/FloatingParticles";
import SectionHeader from "../layout/SectionHeader";
import PageTransition from "../layout/PageTransition";
import { useTicketSimulation } from "../../hooks/useTicketSimulation";
import WorkflowStepCard from "./WorkflowStepCard";
import PipelineVisualizer from "./PipelineVisualizer";

export default function WorkflowPageLayout({
  badge,
  title,
  subtitle,
  steps,
  pipelineSteps,
  variant = "default",
  sidePanel,
  stepDuration = 2500,
}) {
  const { activeIndex, completedSteps, isRunning, setIsRunning, reset } =
    useTicketSimulation(steps, { stepDuration, loop: true });

  const bgVariant =
    variant === "ai" ? "ai" : variant === "warning" ? "warning" : "default";

  return (
    <PageTransition className="min-h-screen pt-24 pb-20 px-4 relative">
      <AnimatedBackground variant={bgVariant} />
      <FloatingParticles count={25} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Pause" : "Play"} Simulation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-zinc-300 text-sm font-medium hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>

        {pipelineSteps && (
          <div className="mb-16">
            <PipelineVisualizer
              steps={pipelineSteps}
              activeIndex={activeIndex >= 0 ? Math.min(activeIndex, pipelineSteps.length - 1) : -1}
              completedSteps={completedSteps}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            {steps.map((step, i) => (
              <WorkflowStepCard
                key={step.id}
                step={step}
                index={i}
                isActive={i === activeIndex}
                isComplete={completedSteps.includes(i)}
                total={steps.length}
              />
            ))}
          </div>

          {sidePanel && (
            <div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8 min-h-[400px] flex items-center justify-center"
            >
              {typeof sidePanel === "function"
                ? sidePanel({ activeIndex, activeStep: steps[activeIndex], completedSteps })
                : sidePanel}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
