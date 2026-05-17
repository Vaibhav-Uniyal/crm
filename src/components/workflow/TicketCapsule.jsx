import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function TicketCapsule({ label = "TKT-2847", active = false }) {
  return (
    <div
      layout
      animate={
        active
          ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 20px rgba(99,102,241,0.4)",
                "0 0 40px rgba(34,211,238,0.6)",
                "0 0 20px rgba(99,102,241,0.4)",
              ],
            }
          : { scale: 1 }
      }
      transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/40 bg-indigo-500/10"
    >
      <Mail className="w-4 h-4 text-indigo-400" />
      <span className="text-xs font-mono text-indigo-200">{label}</span>
      {active && (
        <motion.span
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  );
}
