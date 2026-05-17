import { motion } from "framer-motion";

export default function AnimatedBackground({ variant = "default" }) {
  const colors =
    variant === "ai"
      ? ["#22d3ee", "#6366f1", "#a78bfa"]
      : variant === "warning"
        ? ["#fbbf24", "#fb7185", "#6366f1"]
        : ["#6366f1", "#22d3ee", "#a78bfa"];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div
        className="gradient-orb w-[600px] h-[600px] opacity-30"
        style={{ background: colors[0], top: "-10%", left: "-5%" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="gradient-orb w-[500px] h-[500px] opacity-25"
        style={{ background: colors[1], bottom: "-15%", right: "-5%" }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="gradient-orb w-[400px] h-[400px] opacity-20"
        style={{ background: colors[2], top: "40%", left: "50%" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
