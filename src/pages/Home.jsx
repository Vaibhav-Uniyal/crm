import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { systemMeta } from "../data/systemContent";
import HeroBackground from "../components/layout/HeroBackground";

export default function Home() {
  return (
    <div className="pres min-h-screen pt-14 bg-[#050505] overflow-hidden flex items-center relative">
      {/* Immersive Animated SVG Particle & Wave Mesh Background */}
      <HeroBackground />

      <section className="relative w-full min-h-[calc(100vh-3.5rem)] flex items-center z-10">
        <div className="pres-container w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
          {/* Left Column: Text Content */}
          <div className="flex-1 max-w-2xl text-left">
            {/* InsightRx & CRM Automation header above the name */}
            <div className="mb-10">
              <div 
                className="text-2xl font-bold tracking-wide"
                style={{ 
                  color: "#ffffff", 
                  fontFamily: "'Bricolage Grotesque', sans-serif" 
                }}
              >
                InsightRx
              </div>
            </div>

            {/* Headline: User's Name */}
            <h1
              className="font-extrabold tracking-tight leading-[1.08] mb-8"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.04em",
                color: "#ffffff"
              }}
            >
              Vaibhav
              <br />
              <span style={{ color: "var(--accent)" }}>Uniyal</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg text-[var(--muted)] max-w-lg leading-relaxed mb-10 opacity-90">
              {systemMeta.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 items-start mb-12">
              {systemMeta.stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-bold text-2xl"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    <span style={{ color: "var(--accent)" }}>{s.value}</span> {s.label}
                  </div>
                  <div className="text-sm text-[var(--muted)]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "#0d0f0e" }}
              >
                View system architecture
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/my-impact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-colors"
                style={{
                  borderColor: "var(--border2)",
                  color: "var(--text)",
                  background: "var(--surface)",
                }}
              >
                My impact
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic placeholder to keep layout balanced */}
          <div className="flex-1 w-full lg:max-w-[45%] pointer-events-none select-none relative hidden lg:block" />
        </div>
      </section>
    </div>
  );
}