import { motion } from "framer-motion";

export default function ConfidenceMeter({ value = 0, threshold = 70, active }) {
  const isLow = value < threshold;
  const color = isLow ? "#fb7185" : "#34d399";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 264 }}
            animate={{
              strokeDashoffset: active ? 264 - (264 * value) / 100 : 264,
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: active ? `drop-shadow(0 0 8px ${color})` : "none" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={value}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color }}
          >
            {active ? value : "—"}%
          </motion.span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
            confidence
          </span>
        </div>
      </div>
      {isLow && active && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-400 font-medium px-2 py-1 rounded bg-rose-500/20 border border-rose-500/30"
        >
          Escalation triggered
        </motion.span>
      )}
    </div>
  );
}
