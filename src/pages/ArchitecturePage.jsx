import ArchitectureDiagram from "../components/architecture/ArchitectureDiagram";
import RetryFlowDiagram from "../components/architecture/RetryFlowDiagram";
import { Section } from "../components/presentation/Section";
import {
  pipelineOverview,
  ingestion,
  preprocessing,
  classification,
  nerExtraction,
  apiResponse,
  conversationEngine,
} from "../data/systemContent";

function StepList({ steps }) {
  return (
    <div className="flex flex-col gap-5 mt-6">
      {steps.map((step, i) => (
        <div key={step.title} className="flex gap-4 items-start">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: "var(--accent-faint2)",
              border: "1.5px solid var(--accent-dim)",
              color: "var(--accent)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {i + 1}
          </div>
          <div>
            <h4 className="font-semibold text-base mb-1">{step.title}</h4>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="pres pt-20 pb-20">
      <section className="pres-section border-t-0 pt-0">
        <div className="pres-container">
          <h1 className="pres-title mb-6 text-5xl" style={{ color: "var(--accent)" }}>System Architecture</h1>
          <ArchitectureDiagram />
        </div>
      </section>

      <Section label={ingestion.label} title={ingestion.title}>
        <span className="pres-badge b-green mb-6 inline-block text-xs px-3 py-1">{ingestion.upgrade}</span>
        <div className="pres-grid-2 gap-6">
          <div>
            <StepList steps={ingestion.steps} />
            <div className="flex flex-wrap gap-2 mt-6">
              {ingestion.pills.map((p) => (
                <span key={p} className="pres-pill p-green text-xs px-3 py-1">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="pres-card p-6" style={{ background: "var(--surface2)" }}>
            <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
              Kafka event payload
            </div>
            {ingestion.kafkaPayload.map((row) => (
              <div
                key={row.key}
                className="flex gap-3 py-2 border-b text-sm font-mono"
                style={{ borderColor: "var(--border)" }}
              >
                <span style={{ color: "var(--blue)" }}>{row.key}</span>
                <span style={{ color: "var(--accent)" }}>{row.value}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mt-4">
              {ingestion.guarantees.map((g) => (
                <span key={g} className="pres-pill p-green text-xs px-2 py-1">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        label={preprocessing.label}
        title={preprocessing.title}
        subtitle={preprocessing.subtitle}
      >
        <div className="pres-grid-3 gap-5">
          {preprocessing.filters.map((f) => (
            <div
              key={f.title}
              className="pres-card p-5"
              style={f.accent ? { borderColor: "var(--accent-dim)", background: "var(--accent-faint)" } : {}}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h4 className="font-semibold text-base mb-2">{f.title}</h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{f.text}</p>
              <div className="flex flex-wrap gap-1">
                {f.outcomes.map((o) => (
                  <span key={o} className="pres-pill p-green text-[11px] px-2 py-0.5">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label={classification.label}
        title={classification.title}
      >
        <span className="pres-badge b-green mb-6 inline-block text-xs px-3 py-1">{classification.upgrade}</span>
        <div className="pres-grid-2 gap-6 mb-6">
          {classification.models.map((m) => (
            <div key={m.name} className="pres-card p-6">
              <div className="text-2xl mb-3">{m.icon}</div>
              <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                {m.name}
                {m.badge && (
                  <span className="pres-pill p-green text-[10px] px-1 py-0.5">{m.badge}</span>
                )}
              </h3>
              <p className="text-xs font-medium text-[var(--muted)] mb-3">{m.role}</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{m.description}</p>
              <div className="pres-card-sm text-sm mb-4 p-3" style={{ background: "var(--surface2)" }}>
                <div className="mb-2">
                  Category → <strong style={{ color: "var(--accent)" }}>{m.category}</strong>
                </div>
                <div>
                  Subcategory → <strong style={{ color: "var(--accent)" }}>{m.subcategory}</strong>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {m.pills.map((p) => (
                  <span key={p} className="pres-pill p-blue text-[11px] px-2 py-1">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <RetryFlowDiagram />
      </Section>

      <Section
        label={nerExtraction.label}
        title={nerExtraction.title}
        subtitle={nerExtraction.subtitle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {nerExtraction.stages.map((s) => (
            <div
              key={s.title}
              className="pres-card p-5"
              style={s.accent ? { borderColor: "var(--accent-dim)", background: "var(--accent-faint)" } : {}}
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <h4 className="font-bold text-base mb-2">{s.title}</h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">{s.text}</p>
              {s.tags && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {s.tags.map((t) => (
                    <span key={t} className="pres-pill p-purple text-[10px] px-1 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {s.note && (
                <p className="text-[11px] text-[var(--muted)] mt-3 leading-relaxed font-medium">{s.note}</p>
              )}
              {s.outcomes && (
                <div className="flex flex-col gap-1 mt-3">
                  {s.outcomes.map((o) => (
                    <span key={o} className="pres-pill p-green text-[10px] px-1 py-0.5">
                      {o}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section label={apiResponse.label} title={apiResponse.title} subtitle={apiResponse.subtitle}>
        <div className="flex flex-col gap-5 mt-6">
          {apiResponse.decisions.map((d) => (
            <div key={d.condition} className="flex flex-wrap items-stretch gap-3">
              <div className="pres-card-sm p-4 min-w-[220px] flex items-center">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Condition</div>
                  <div className="text-sm font-semibold">{d.condition}</div>
                </div>
              </div>
              <span className="self-center text-lg text-[var(--muted)]">→</span>
              {d.outcomes.map((o) => (
                <div
                  key={o.text}
                  className="pres-card-sm p-4 flex-1 min-w-[200px]"
                  style={{
                    borderColor:
                      o.type === "ok"
                        ? "var(--accent-dim)"
                        : o.type === "warn"
                          ? "rgba(232,168,58,0.3)"
                          : "rgba(232,107,74,0.3)",
                    background:
                      o.type === "ok"
                        ? "var(--accent-faint)"
                        : o.type === "warn"
                          ? "var(--amber-faint)"
                          : "var(--coral-faint)",
                  }}
                >
                  <div
                    className="text-[11px] font-bold tracking-wider uppercase mb-1"
                    style={{
                      color:
                        o.type === "ok"
                          ? "var(--accent)"
                          : o.type === "warn"
                            ? "var(--amber)"
                            : "var(--coral)",
                    }}
                  >
                    {o.label}
                  </div>
                  <div className="text-sm font-semibold leading-relaxed">{o.text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pres-grid-3 mt-8 gap-5">
          {apiResponse.cases.map((c) => (
            <div key={c.title} className="pres-card-sm p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--accent)" }}>
                {c.label}
              </div>
              <div className="font-bold text-lg mb-2">{c.title}</div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label={conversationEngine.label}
        title={conversationEngine.title}
        subtitle={conversationEngine.subtitle}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-8 mb-8">
          {conversationEngine.turns.map((t) => (
            <div key={t.num} className="text-center">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-lg shadow-lg"
                style={{
                  background: "var(--accent-faint2)",
                  border: "2px solid var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {t.num}
              </div>
              <div className="text-xs font-bold mb-1">{t.label}</div>
              <p className="text-[11px] text-[var(--muted)] mb-3 leading-relaxed px-2">{t.desc}</p>
              <div className="flex flex-col gap-1 items-center">
                {t.pills.map((p) => (
                  <span key={p} className="pres-pill p-green text-[9px] px-2 py-0.5 font-semibold">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pres-grid-3 gap-5">
          {conversationEngine.details.map((d) => (
            <div key={d.title} className="pres-card-sm p-5">
              <h5 className="text-sm font-bold mb-2" style={{ color: "var(--accent)" }}>
                {d.title}
              </h5>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
