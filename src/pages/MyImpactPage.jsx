import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, CheckCircle2, Zap, Shield, GitBranch } from "lucide-react";
import { Section } from "../components/presentation/Section";
import { myImpact } from "../data/systemContent";

const toneStyles = {
  green: { color: "var(--accent)", border: "var(--accent-dim)", bg: "var(--accent-faint)", Icon: CheckCircle2 },
  purple: { color: "#b69cf8", border: "rgba(155,122,232,0.35)", bg: "var(--purple-faint)", Icon: Zap },
  blue: { color: "#7dc0f9", border: "rgba(74,158,232,0.35)", bg: "var(--blue-faint)", Icon: GitBranch },
  amber: { color: "#f8ca75", border: "rgba(232,168,58,0.35)", bg: "var(--amber-faint)", Icon: Shield },
  coral: { color: "#f8957c", border: "rgba(232,107,74,0.35)", bg: "var(--coral-faint)", Icon: FileText },
};

export default function MyImpactPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="pres pt-20 pb-20 relative">
      <Section label={myImpact.label} title={myImpact.title} subtitle={myImpact.subtitle}>
        
        {/* STATS ROW */}
        <div className="pres-grid-4 mb-20">
          {myImpact.stats.map((m, i) => (
            <motion.div 
              key={m.label} 
              className="pres-card-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--accent)" }}
              >
                {m.value}
              </div>
              <div className="text-sm font-semibold mb-1">{m.label}</div>
              <div className="text-xs text-[var(--muted)]">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* DETAILED IMPACTS (SIDE-BY-SIDE) */}
        <div className="space-y-24 mb-20">
          {myImpact.detailedImpacts.map((impact, index) => {
            const isReversed = index % 2 !== 0;
            const style = toneStyles[impact.tone] || toneStyles.green;
            const IconComponent = style.Icon;
            
            return (
              <motion.div 
                key={impact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* TEXT CONTENT */}
                <div className="flex-1 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}`}}>
                    {impact.metricLabel}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{impact.title}</h3>
                  <p className="text-lg text-[var(--muted)] leading-relaxed">{impact.text}</p>
                  
                  <div className="pres-card-sm inline-flex items-center gap-4 mt-4" style={{ background: 'var(--surface2)', border: `1px solid ${style.border}` }}>
                    <div className="text-3xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: style.color }}>
                      {impact.percentage}
                    </div>
                    <div className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
                      Measurable<br/>Improvement
                    </div>
                  </div>
                </div>

                {/* IMAGE / PROOF OR PLACEHOLDER */}
                <div className="flex-1 w-full">
                  {impact.image ? (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                      style={{ border: `1px solid ${style.border}`, background: 'var(--surface)' }}
                      onClick={() => setSelectedImage(impact)}
                    >
                      <div className="aspect-video w-full bg-zinc-900/50 flex items-center justify-center p-2">
                        <img 
                          src={impact.image} 
                          alt={impact.title} 
                          className="max-w-full max-h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                        <p className="text-xs font-medium text-white/90 text-center">{impact.imageCaption}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div 
                      className="relative rounded-2xl overflow-hidden shadow-lg aspect-video flex items-center justify-center"
                      style={{ border: `1px solid ${style.border}`, background: 'var(--surface)' }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${style.color}, transparent 70%)` }} />
                      <IconComponent className="w-24 h-24 opacity-80" style={{ color: style.color }} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </Section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-full rounded-lg border border-zinc-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
              <span className="inline-block px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-sm font-medium border border-white/10">
                {selectedImage.imageCaption}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
