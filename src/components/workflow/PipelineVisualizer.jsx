import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  FileText,
  Filter,
  Shield,
  Brain,
  GitBranch,
  Scan,
  Plug,
  Send,
  BarChart3,
  Check,
} from "lucide-react";
import TicketCapsule from "./TicketCapsule";

const iconMap = {
  mail: Mail,
  fileText: FileText,
  filter: Filter,
  shield: Shield,
  brain: Brain,
  gitBranch: GitBranch,
  scan: Scan,
  plug: Plug,
  send: Send,
  barChart: BarChart3,
};

export default function PipelineVisualizer({
  steps,
  activeIndex,
  completedSteps = [],
  showTicket = true,
  compact = false,
  home = false,
}) {
  if (home) {
    return (
      <div className="relative w-full max-w-full px-1">
        {showTicket && activeIndex >= 0 && (
          <div
            key={activeIndex}
            className="flex justify-center mb-2"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TicketCapsule active label={`Step ${activeIndex + 1}/${steps.length}`} />
          </div>
        )}

        <div className="flex flex-nowrap items-stretch justify-center gap-1 sm:gap-1.5 md:gap-2 w-full">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || Mail;
            const isActive = i === activeIndex;
            const isComplete = completedSteps.includes(i);
            const color = step.color || "#6366f1";

            return (
              <div
                key={step.id}
                className="relative z-10 flex-1 min-w-0 max-w-[8.5rem] basis-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div
                  animate={
                    isActive
                      ? {
                          scale: 1.04,
                          boxShadow: `0 0 20px ${color}45`,
                          borderColor: color,
                        }
                      : isComplete
                        ? { scale: 1, borderColor: `${color}55` }
                        : { scale: 1, opacity: 0.5 }
                  }
                  className={`glass rounded-lg p-2 sm:p-2.5 border h-full ${
                    isActive ? "border-2" : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-1 sm:gap-1.5">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background:
                          isActive || isComplete ? `${color}30` : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {isComplete && !isActive ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      ) : (
                        <Icon
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          style={{ color: isActive || isComplete ? color : "#71717a" }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[9px] sm:text-[10px] md:text-[11px] font-medium leading-tight line-clamp-2 w-full ${
                        isActive ? "text-white" : isComplete ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <div className="w-full h-0.5 rounded-full overflow-hidden bg-zinc-800">
                        <div
                          className="h-full rounded-full"
                          style={{ background: color }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.8, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {showTicket && (
        <AnimatePresence mode="wait">
          <div
            key={activeIndex}
            className="absolute -top-4 left-0 right-0 flex justify-center z-20 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              left: `${((activeIndex + 0.5) / steps.length) * 100}%`,
              x: "-50%",
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ position: "absolute" }}
          >
            {activeIndex >= 0 && (
              <TicketCapsule active label={`Step ${activeIndex + 1}/${steps.length}`} />
            )}
          </div>
        </AnimatePresence>
      )}

      <div
        className={`flex ${
          compact ? "flex-wrap justify-center gap-3" : "flex-col md:flex-row items-stretch gap-2 md:gap-0"
        } relative mt-12`}
      >
        {!compact && (
          <div
            className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-zinc-800"
            style={{ zIndex: 0 }}
          >
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
              initial={{ width: "0%" }}
              animate={{
                width: `${Math.max(0, (activeIndex / (steps.length - 1)) * 100)}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {steps.map((step, i) => {
          const Icon = iconMap[step.icon] || Mail;
          const isActive = i === activeIndex;
          const isComplete = completedSteps.includes(i);
          const color = step.color || "#6366f1";

          return (
            <div
              key={step.id}
              className={`relative z-10 flex-1 min-w-0 ${compact ? "w-[140px]" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                animate={
                  isActive
                    ? {
                        scale: 1.05,
                        boxShadow: `0 0 30px ${color}50`,
                        borderColor: color,
                      }
                    : isComplete
                      ? { scale: 1, borderColor: `${color}60` }
                      : { scale: 1, opacity: 0.5 }
                }
                className={`glass rounded-xl p-4 mx-1 border transition-colors ${
                  isActive ? "border-2" : "border-white/10"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: isActive || isComplete ? `${color}30` : "rgba(255,255,255,0.05)",
                    }}
                    animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                  >
                    {isComplete && !isActive ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Icon className="w-5 h-5" style={{ color: isActive || isComplete ? color : "#71717a" }} />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium leading-tight ${
                      isActive ? "text-white" : isComplete ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <div
                      className="w-full h-1 rounded-full overflow-hidden bg-zinc-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {i < steps.length - 1 && !compact && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-1 w-2 h-2 -translate-y-1/2 z-20"
                  animate={{
                    opacity: isComplete ? 1 : 0.2,
                    scale: isActive ? [1, 1.5, 1] : 1,
                  }}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 1 }}
                >
                  <div
                    className="w-2 h-2 rotate-45 border-t-2 border-r-2"
                    style={{ borderColor: isComplete ? color : "#3f3f46" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
