import { motion } from "framer-motion";

export default function WorkflowStepCard({
  step,
  index,
  isActive,
  isComplete,
  total,
}) {
  return (
    <div
      layout
      animate={{
        opacity: isActive || isComplete ? 1 : 0.35,
        x: isActive ? 8 : 0,
        borderColor: isActive ? "rgba(99, 102, 241, 0.6)" : "rgba(255,255,255,0.08)",
      }}
      className={`glass rounded-xl p-5 border-l-4 ${
        isActive ? "border-l-indigo-500" : isComplete ? "border-l-emerald-500" : "border-l-zinc-700"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            isActive
              ? "bg-indigo-500 text-white"
              : isComplete
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-zinc-800 text-zinc-500"
          }`}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        >
          {isComplete && !isActive ? "✓" : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-1 ${isActive ? "text-white" : "text-zinc-400"}`}>
            {step.label}
          </h3>
          <p className="text-sm text-zinc-500">{step.desc}</p>
          {isActive && (
            <div
              className="mt-3 h-1 rounded-full bg-zinc-800 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
          )}
        </div>
        <span className="text-xs text-zinc-600 font-mono">
          {index + 1}/{total}
        </span>
      </div>
    </div>
  );
}
