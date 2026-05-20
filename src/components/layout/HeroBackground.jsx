import { useMemo } from "react";

export default function HeroBackground() {
  // Memoize random particle and dot positions to prevent flashing/re-rendering performance issues
  const particles = useMemo(() => {
    return [...Array(70)].map((_, i) => ({
      id: i,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 12}s`,
    }));
  }, []);

  const glowDots = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      cx: Math.random() * 1200,
      cy: 300 + Math.random() * 300,
      r: Math.random() * 2 + 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] pointer-events-none select-none z-0">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,140,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,140,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* MAIN GREEN GLOW */}
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-green-500/20 blur-[180px]" />

      {/* SECONDARY GLOW */}
      <div className="absolute right-[10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-emerald-400/10 blur-[120px]" />

      {/* PARTICLES */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-emerald-400"
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              boxShadow: "0 0 10px rgba(16,185,129,0.8)",
              animation: `floatParticle ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* SVG WAVE MESH */}
      <svg
        className="absolute right-[-10%] bottom-[-5%] w-[1100px] opacity-80 animate-waveFloat"
        viewBox="0 0 1200 600"
        fill="none"
      >
        {/* MAIN CURVES */}
        <path
          d="M0 420C120 360 220 520 360 440C520 340 640 520 820 420C960 340 1080 460 1200 400"
          stroke="rgba(16,255,140,0.9)"
          strokeWidth="1.5"
        />

        <path
          d="M0 460C120 400 240 560 400 470C580 360 720 560 900 450C1020 390 1120 470 1200 430"
          stroke="rgba(16,255,140,0.45)"
          strokeWidth="1"
        />

        <path
          d="M0 500C160 420 280 600 440 500C620 400 780 580 960 500C1080 450 1160 500 1200 470"
          stroke="rgba(16,255,140,0.2)"
          strokeWidth="1"
        />

        {/* GLOW DOTS */}
        {glowDots.map((dot) => (
          <circle
            key={dot.id}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="rgba(16,255,140,0.9)"
          />
        ))}
      </svg>
    </div>
  );
}
