import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { systemMeta } from "../data/systemContent";

export default function Home() {
  return (
    <div className="pres min-h-screen pt-14">
      <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(34,201,122,0.12) 0%, transparent 65%)",
          }}
        />

        <div className="pres-container relative z-10 py-16 w-full">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="pres-badge b-green">System overview</span>
            <span className="pres-badge b-blue">AI-powered</span>
            <span className="pres-badge b-amber">Enterprise CRM</span>
          </div>

          <h1
            className="font-extrabold tracking-tight leading-none mb-6"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            CRM Email
            <br />
            <span style={{ color: "var(--accent)" }}>Automation</span>
            <br />
            System
          </h1>

          <p className="text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-10">
            {systemMeta.tagline}
          </p>

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
      </section>
    </div>
  );
}
