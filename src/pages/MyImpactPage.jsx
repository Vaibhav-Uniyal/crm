import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, CheckCircle2, Zap, Shield, GitBranch, TrendingDown, XCircle, AlertTriangle, SearchX, ArrowDown, ShieldAlert, Beaker, ChevronLeft, ChevronRight, Lightbulb, Info, Network, Cloud, Box, Activity, Scale, Bot, Monitor, Users, TrendingUp, BarChart2, Image as ImageIcon, Paperclip, Plus, Play, Rocket, Clock, Calendar, BellRing, Bell, Database, Lock, RefreshCw } from "lucide-react";
import { Section } from "../components/presentation/Section";
import { myImpact } from "../data/systemContent";

const toneStyles = {
  green: { color: "var(--accent)", border: "var(--accent-dim)", bg: "var(--accent-faint)", Icon: CheckCircle2 },
  purple: { color: "#b69cf8", border: "rgba(155,122,232,0.35)", bg: "var(--purple-faint)", Icon: Zap },
  blue: { color: "#7dc0f9", border: "rgba(74,158,232,0.35)", bg: "var(--blue-faint)", Icon: GitBranch },
  amber: { color: "#f8ca75", border: "rgba(232,168,58,0.35)", bg: "var(--amber-faint)", Icon: Shield },
  coral: { color: "#f8957c", border: "rgba(232,107,74,0.35)", bg: "var(--coral-faint)", Icon: FileText },
};

const problemIcons = {
  TrendingDown,
  XCircle,
  AlertTriangle,
  SearchX,
  ShieldAlert,
  Beaker
};

const ImageCarousel = ({ images, captions, title, style, onClickImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  const currentImage = Array.isArray(images) ? images[currentIndex] : images;
  const currentCaption = Array.isArray(captions)
    ? (captions[currentIndex] || captions[0])
    : captions;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
      style={{ border: `1px solid ${style.border}`, background: 'var(--surface)' }}
      onClick={() => onClickImage({
        images: Array.isArray(images) ? images : [images],
        captions: Array.isArray(captions) ? captions : [captions],
        initialIndex: currentIndex,
        title
      })}
    >
      <div className="aspect-video w-full bg-zinc-900/50 flex items-center justify-center p-2">
        <img
          src={currentImage}
          alt={`${title} ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm z-10">
        <p className="text-xs font-medium text-white/90 text-center">{currentCaption}</p>
      </div>

      {Array.isArray(images) && images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono z-20">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  );
};

const LightboxCarousel = ({ data, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(data.initialIndex || 0);

  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex((c) => (c === 0 ? data.images.length - 1 : c - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((c) => (c === data.images.length - 1 ? 0 : c + 1));
  };

  const currentImage = data.images[currentIndex];
  const currentCaption = data.captions[currentIndex] || data.captions[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {data.images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors z-50"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors z-50"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        src={currentImage}
        alt={data.title}
        className="max-w-full max-h-full rounded-lg border border-zinc-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <span className="inline-block px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-sm font-medium border border-white/10">
          {currentCaption}
        </span>
        {data.images.length > 1 && (
          <div className="mt-2 text-xs font-mono text-white/50">
            {currentIndex + 1} / {data.images.length}
          </div>
        )}
      </div>
    </motion.div>
  );
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
              <div className="text-m font-semibold mb-1">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* PROBLEMS BEFORE */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">The Challenges We Faced</h3>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">Before implementing these improvements, the system struggled with several critical bottlenecks that impacted overall efficiency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myImpact.problemsBefore?.map((problem, i) => {
              const style = toneStyles[problem.tone] || toneStyles.coral;
              const Icon = problemIcons[problem.icon] || XCircle;
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="pres-card-sm flex gap-4"
                  style={{ borderLeft: `4px solid ${style.color}`, background: 'var(--surface2)' }}
                >
                  <div className="shrink-0 p-3 rounded-xl" style={{ background: style.bg, color: style.color }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{problem.title}</h4>
                    <p className="text-[var(--muted)] text-m leading-relaxed">{problem.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="flex justify-center mt-16 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-full"
              style={{ background: 'var(--surface)', border: '1px solid var(--accent-dim)', color: 'var(--accent)' }}
            >
              <ArrowDown className="w-8 h-8 animate-bounce" />
            </motion.div>
          </div>
        </div>

        {/* DETAILED IMPACTS (SIDE-BY-SIDE) */}
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold mb-4">The Solutions & My Impact</h3>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">Here is how we addressed these challenges and the measurable impact of each initiative.</p>
        </div>

        <div className="space-y-24 mb-20">
          {myImpact.detailedImpacts.map((impact, index) => {
            const isReversed = index % 2 !== 0;
            const style = toneStyles[impact.tone] || toneStyles.green;
            const IconComponent = style.Icon;

            return (
              <div key={impact.title} className="space-y-24">
                {impact.sectionHeading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-[var(--border)] pt-16 -mt-8 text-center"
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--surface2)] text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4 shadow-sm border border-[var(--border)]">Focus Area</span>
                    <h2 className="text-3xl md:text-4xl font-bold">{impact.sectionHeading}</h2>
                  </motion.div>
                )}
                {impact.layout === 'stress_test' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 rounded-2xl overflow-hidden relative shadow-2xl"
                    style={{
                      background: 'linear-gradient(145deg, #0a0a0f 0%, #13131a 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

                    <div className="flex flex-col lg:flex-row relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-purple-500/10">
                      {/* LEFT COLUMN: SCENARIO */}
                      <div className="flex-1 p-10 space-y-8">
                        <div>
                          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)]" style={{ background: 'rgba(168,85,247,0.15)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.4)' }}>
                            {impact.metricLabel}
                          </div>
                          <h3 className="text-4xl font-bold mb-5 text-white leading-tight tracking-tight">{impact.title}</h3>
                          <p className="text-gray-400 leading-relaxed text-lg">{impact.text}</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-10 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-r opacity-50" />
                          <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-purple-400">Test Scenario</h4>
                          <p className="text-gray-400 leading-relaxed">{impact.scenario}</p>
                        </div>

                        {impact.tags && (
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-purple-500/10">
                            {impact.tags.map(tag => (
                              <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: 'rgba(30,30,40,0.6)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                                {tag.toLowerCase().includes('kafka') ? <Network className="w-4 h-4 text-purple-400" /> :
                                  tag.toLowerCase().includes('salesforce') ? <Cloud className="w-4 h-4 text-blue-400" /> :
                                    tag.toLowerCase().includes('load') ? <Scale className="w-4 h-4 text-purple-400" /> :
                                      <Zap className="w-4 h-4 text-purple-400" />}
                                {tag}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* RIGHT COLUMN: RESULTS */}
                      <div className="flex-1 p-10 bg-[#0a0a0f] border-l border-white/5 space-y-10">
                        <h4 className="text-sm font-bold tracking-widest uppercase text-purple-400">Load Test Results</h4>

                        <div className="space-y-10">
                          {impact.results && impact.results.map((res, i) => (
                            <div key={i} className="flex gap-6">
                              <div className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-[#111116] border border-white/10 shadow-md">
                                {res.icon === 'kafka' ? <Network className="w-8 h-8" style={{ color: res.color }} /> :
                                  res.icon === 'salesforce' ? <Cloud className="w-8 h-8" style={{ color: res.color }} /> :
                                    <Activity className="w-8 h-8" style={{ color: res.color }} />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-end mb-3">
                                  <div>
                                    <span className="font-bold text-lg text-white">{res.name}</span> <span className="text-gray-400">{res.label}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-3xl font-bold" style={{ color: res.color, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{res.value}</div>
                                    <div className="text-xs text-gray-400 font-semibold mt-1">Tickets</div>
                                  </div>
                                </div>

                                <div className="flex gap-1 h-5 mb-3">
                                  {Array.from({ length: 40 }).map((_, segmentIndex) => {
                                    const threshold = (segmentIndex / 40) * res.max;
                                    const isFilled = threshold < res.actual;
                                    return (
                                      <div
                                        key={segmentIndex}
                                        className="flex-1 rounded-sm"
                                        style={{ background: isFilled ? res.color : 'rgba(255,255,255,0.05)', opacity: isFilled ? 1 : 1 }}
                                      />
                                    );
                                  })}
                                </div>

                                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: res.statusColor }}>
                                  {res.statusText}
                                  {res.statusColor === '#22c55e' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6">
                          <div className="relative p-5 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 bg-purple-900/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50" />
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                            <div className="relative z-10 flex gap-4 items-center">
                              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                                <Lightbulb className="w-6 h-6" />
                              </div>
                              <div>
                                <h5 className="font-bold text-purple-300 text-xs tracking-wider uppercase mb-1">Key Finding</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{impact.keyFinding}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : impact.layout === 'automated_testing' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 rounded-2xl overflow-hidden relative shadow-2xl"
                    style={{
                      background: 'linear-gradient(145deg, #0a0a0f 0%, #13131a 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    {/* Glowing background accents */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

                    <div className="flex flex-col lg:flex-row relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-purple-500/10">

                      {/* LEFT SECTOR (55%) */}
                      <div className="lg:w-[55%] p-10 flex gap-8">
                        {/* Text & Tags Column */}
                        <div className="w-1/2 space-y-8 flex flex-col">
                          <div>
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)]" style={{ background: 'rgba(168,85,247,0.15)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.4)' }}>
                              {impact.metricLabel}
                            </div>
                            <h3 className="text-4xl font-bold mb-4 text-white leading-tight tracking-tight">{impact.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{impact.text}</p>
                          </div>

                          <div className="pt-6 border-t border-white/5">
                            <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-purple-400">How It Works</h4>
                            <p className="text-gray-400 leading-relaxed text-sm">{impact.scenario}</p>
                          </div>

                          {impact.tags && (
                            <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
                              {impact.tags.map(tag => (
                                <div key={tag.text} className="flex gap-3 p-3 rounded-xl bg-[#111116] border border-white/[0.05] hover:bg-[#15151c] transition-all items-center shadow-md">
                                  <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                    {tag.icon === 'robot' ? <Bot className="w-4 h-4 text-purple-400" /> :
                                      tag.icon === 'monitor' ? <Monitor className="w-4 h-4 text-purple-400" /> :
                                        tag.icon === 'paperclip' ? <Paperclip className="w-4 h-4 text-purple-400" /> :
                                          tag.icon === 'play' ? <Play className="w-4 h-4 text-purple-400" /> :
                                            tag.icon === 'users' ? <Users className="w-4 h-4 text-purple-400" /> :
                                              <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                                  </div>
                                  <div className="text-xs font-semibold text-gray-300 leading-tight">
                                    {tag.text.split('\n').map((l, i) => <div key={i}>{l}</div>)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Workflow Graphic Column */}
                        <div className="w-1/2 flex flex-col justify-center items-center relative pl-4">
                          <div className="relative w-full max-w-[280px]">
                            {/* Top Input Box */}
                            <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-900/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative z-10 backdrop-blur-md">
                              <div className="text-[10px] text-gray-400 mb-1.5 font-semibold">Case ID</div>
                              <div className="flex gap-2 items-center">
                                <div className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-purple-100 font-mono">CAS-123456</div>
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                                </div>
                              </div>
                            </div>

                            {/* Dotted Line */}
                            <div className="absolute left-[20%] top-14 bottom-8 w-[2px] border-l-2 border-dotted border-purple-500/40 z-0" />
                            <div className="absolute left-[18.5%] top-[80px] w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)] z-10" />
                            <div className="absolute left-[19.5%] top-[110px] w-1.5 h-1.5 rounded-full bg-purple-400/50 z-10" />

                            {/* Floating Elements */}
                            <div className="absolute right-8 top-16 transform rotate-12 p-2.5 rounded-xl bg-purple-900/20 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md">
                              <ImageIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="absolute -left-6 top-24 transform -rotate-12 p-2.5 rounded-xl bg-blue-900/20 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md">
                              <FileText className="w-5 h-5 text-blue-400" />
                            </div>

                            {/* Workflow Steps */}
                            <div className="mt-28 space-y-2.5 relative z-10 w-full">
                              {impact.workflowSteps?.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm shadow-sm transition-all hover:bg-white/5">
                                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    {step.icon === 'file' ? <FileText className="w-3.5 h-3.5 text-purple-300" /> :
                                      step.icon === 'paperclip' ? <Paperclip className="w-3.5 h-3.5 text-purple-300" /> :
                                        step.icon === 'plus' ? <Plus className="w-3.5 h-3.5 text-purple-300" /> :
                                          <Play className="w-3.5 h-3.5 text-purple-300" />}
                                  </div>
                                  <div className="text-xs font-semibold text-gray-200">{step.text}</div>
                                </div>
                              ))}

                              {/* Final Badge */}
                              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                Testing Completed
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SECTOR (45%) */}
                      <div className="lg:w-[45%] p-10 bg-[#0a0a0f] border-l border-white/5 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold tracking-widest uppercase text-purple-400 mb-6">Testing Automation Impact</h4>

                          <div className="flex flex-col gap-4">
                            {impact.results && impact.results.map((res, i) => (
                              <div key={i} className="flex flex-col p-5 rounded-2xl bg-[#111116] border border-white/[0.05] relative overflow-hidden group hover:bg-[#15151c] transition-all">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <div className="text-5xl font-bold mb-1 flex items-baseline gap-2" style={{ color: res.color, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                      {res.value} {res.highlight && <span className="text-2xl text-blue-400">{res.highlight}</span>}
                                    </div>
                                    <div className="text-xs text-gray-300 font-medium tracking-wide">
                                      {res.label}
                                    </div>
                                  </div>
                                  <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: `${res.color}40`, boxShadow: `0 0 20px ${res.color}20` }}>
                                    {res.icon === 'trending' ? <TrendingUp className="w-6 h-6" style={{ color: res.color }} /> :
                                      res.icon === 'document' ? <FileText className="w-6 h-6" style={{ color: res.color }} /> :
                                        <Zap className="w-6 h-6" style={{ color: res.color }} />}
                                  </div>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold mt-1 self-start border" style={{ background: `${res.color}10`, color: res.color, borderColor: `${res.color}30` }}>
                                  {res.statusText}
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6">
                          <div className="relative p-5 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 bg-purple-900/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50" />
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                            <div className="relative z-10 flex gap-4 items-center">
                              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                                <Rocket className="w-6 h-6" />
                              </div>
                              <div>
                                <h5 className="font-bold text-purple-300 text-xs tracking-wider uppercase mb-1">Key Improvement</h5>
                                <p className="text-xs text-gray-400 leading-relaxed">{impact.keyFinding}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : impact.layout === 'reporting_dashboard' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 relative"
                  >
                    {/* TITLE SECTION */}
                    <div className="text-center mb-10 relative z-10">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                        {impact.title}
                      </h2>
                      <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
                        {impact.text}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 relative z-10 items-start">
                      {/* LEFT PANEL */}
                      <div className="flex flex-col p-6 rounded-2xl bg-[#0a0a12] border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden group h-fit">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500 opacity-70" />
                        
                        <div className="flex gap-4 items-start mb-6">
                          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <BarChart2 className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Automated Daily & Hourly Reports</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                              Designed automated reporting pipelines to generate operational insights for ticket processing, auto-closure metrics, SLA monitoring, scoped ticket tracking, and processing efficiency.
                            </p>
                          </div>
                        </div>

                        {/* Hourly Monitoring Image container */}
                        <div className="mt-2 p-5 rounded-xl bg-black/40 border border-white/5 relative group-hover:border-purple-500/30 transition-colors duration-500">
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Hourly Monitoring</span>
                          </div>
                          <div 
                            className="rounded border border-white/10 shadow-2xl overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all"
                            onClick={() => setSelectedImage({
                               images: [impact.images.hourly],
                               captions: ["Hourly Overview Report"],
                               initialIndex: 0,
                               title: "Hourly Monitoring"
                            })}
                          >
                             <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded" />
                             <img src={impact.images.hourly} alt="Hourly" className="w-full object-contain" />
                          </div>
                          <div className="flex flex-wrap gap-3 mt-4">
                            <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                <Activity className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[10px] text-gray-400 font-medium mb-0.5">Auto Closed</div>
                                <div className="text-sm font-bold text-green-400 tracking-wide">69 <span className="text-xs opacity-80">(63.9%)</span></div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <TrendingUp className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[10px] text-gray-400 font-medium mb-0.5">TAT 90th Percentile</div>
                                <div className="text-sm font-bold text-blue-400 tracking-wide">67 mins</div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <TrendingUp className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[10px] text-gray-400 font-medium mb-0.5">TAT 95th Percentile</div>
                                <div className="text-sm font-bold text-purple-400 tracking-wide">71 mins</div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                <AlertTriangle className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[10px] text-gray-400 font-medium mb-0.5">Tickets Above P90</div>
                                <div className="text-sm font-bold text-red-400 tracking-wide">10</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Daily Metrics Image container */}
                        <div className="mt-4 p-5 rounded-xl bg-black/40 border border-white/5 relative group-hover:border-purple-500/30 transition-colors duration-500">
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Daily Metrics</span>
                          </div>
                          
                          <div 
                            className="rounded border border-white/10 shadow-2xl overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all"
                            onClick={() => setSelectedImage({
                               images: [impact.images.daily],
                               captions: ["Daily TPA Metrics"],
                               initialIndex: 0,
                               title: "Daily Metrics"
                            })}
                          >
                             <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded" />
                             <img src={impact.images.daily} alt="Daily" className="w-full object-contain" />
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mt-4">
                              <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-[10px] text-gray-400 font-medium mb-0.5">Total Processed</div>
                                  <div className="text-sm font-bold text-green-400 tracking-wide">822 <span className="text-xs opacity-80">(135.42%)</span></div>
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                  <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-[10px] text-gray-400 font-medium mb-0.5">Auto Closed</div>
                                  <div className="text-sm font-bold text-purple-400 tracking-wide">567 <span className="text-xs opacity-80">(93.41%)</span></div>
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-[130px] bg-[#0d0d12] border border-white/5 rounded-xl p-3 flex gap-3 items-center shadow-lg">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                  <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-[10px] text-gray-400 font-medium mb-0.5">Non Junk Auto Closed</div>
                                  <div className="text-sm font-bold text-blue-400 tracking-wide">423 <span className="text-xs opacity-80">(74.60%)</span></div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PANELS */}
                      <div className="flex flex-col gap-6 h-fit">
                        {/* Delayed Queue */}
                        <div className="p-6 rounded-2xl bg-[#140505] border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative overflow-hidden group flex flex-col h-fit">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500 opacity-70" />
                          <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

                          <div className="flex gap-4 items-start mb-6 relative z-10 shrink-0">
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                              <BellRing className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Delayed Queue Detection</h3>
                              <p className="text-sm text-gray-400 leading-relaxed">
                                Implemented automated monitoring to detect tickets stuck in processing queues for more than 30 minutes and trigger operational alerts.
                              </p>
                            </div>
                          </div>
                          
                          <div 
                            className="rounded-xl overflow-hidden border border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.15)] relative z-10 flex items-center justify-center bg-black/40 p-2 cursor-pointer hover:ring-2 hover:ring-red-500/50 transition-all"
                            onClick={() => setSelectedImage({
                               images: [impact.images.delayed],
                               captions: ["Delayed Queue Alert Dashboard"],
                               initialIndex: 0,
                               title: "Delayed Queue Detection"
                            })}
                          >
                            <img src={impact.images.delayed} alt="Delayed Tickets" className="w-full h-full object-contain" />
                          </div>
                          
                          {/* Tags */}
                          <div className="flex justify-between mt-6 px-2 relative z-10 shrink-0">
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs">
                              <Activity className="w-4 h-4 text-green-500" />
                              <div className="flex flex-col">
                                <span className="text-gray-400 leading-tight">Queue Monitoring</span>
                                <span className="text-green-500 font-bold leading-tight">Active</span>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs">
                              <ShieldAlert className="w-4 h-4 text-orange-500" />
                              <div className="flex flex-col">
                                <span className="text-gray-400 leading-tight">SLA Breach Detection</span>
                                <span className="text-orange-500 font-bold leading-tight">Enabled</span>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs">
                              <Bell className="w-4 h-4 text-red-500" />
                              <div className="flex flex-col">
                                <span className="text-gray-400 leading-tight">Auto Escalation</span>
                                <span className="text-red-500 font-bold leading-tight">Configured</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scoped Ticket Error */}
                        <div className="p-6 rounded-2xl bg-[#140a05] border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)] relative overflow-hidden group flex flex-col h-fit">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-70" />
                          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

                          <div className="flex gap-4 items-start mb-6 relative z-10">
                            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                              <AlertTriangle className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Scoped Ticket Error Logging</h3>
                              <p className="text-sm text-gray-400 leading-relaxed">
                                Built centralized error logging workflows to identify unsupported ticket categories, failed automation scopes, and routing mismatches for operational debugging.
                              </p>
                            </div>
                          </div>
                          
                          <div 
                            className="rounded-xl overflow-hidden border border-orange-500/30 shadow-[0_0_25px_rgba(249,115,22,0.15)] relative z-10 flex items-center justify-center bg-black/40 p-2 cursor-pointer hover:ring-2 hover:ring-orange-500/50 transition-all"
                            onClick={() => setSelectedImage({
                               images: [impact.images.scoped],
                               captions: ["Scoped Ticket Error Logs"],
                               initialIndex: 0,
                               title: "Scoped Ticket Error Logging"
                            })}
                          >
                            <img src={impact.images.scoped} alt="Scoped Tickets" className="w-full h-full object-contain" />
                          </div>

                          <div className="flex flex-wrap justify-between gap-2 mt-6 relative z-10">
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs font-semibold text-orange-300 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                              <SearchX className="w-3.5 h-3.5" /> Scope Validation
                            </div>
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs font-semibold text-orange-300 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                              <ShieldAlert className="w-3.5 h-3.5" /> Failure Tracking
                            </div>
                            <div className="flex gap-2 items-center text-[10px] sm:text-xs font-semibold text-orange-300 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                              <Network className="w-3.5 h-3.5" /> Ticket Classification
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM IMPACT BAR */}
                    <div className="mt-6 p-6 rounded-2xl bg-[#0a0a12] border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative overflow-hidden z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/5 opacity-50 pointer-events-none" />
                      
                      <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.4)] relative z-10 shrink-0 hidden md:block">
                        <Activity className="w-8 h-8 text-purple-400" />
                      </div>
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-lg font-bold text-purple-300 mb-2 tracking-wide">Operational Impact</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          Centralized reporting and intelligent monitoring reduced manual tracking efforts, improved queue visibility, accelerated debugging workflows, and enabled proactive SLA breach detection across production systems.
                        </p>
                      </div>
                      
                      <div className="relative z-10 flex flex-wrap gap-4 md:gap-6 shrink-0 mt-4 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                        <div className="flex flex-col gap-1.5 items-center">
                          <FileText className="w-5 h-5 text-purple-400 opacity-80" />
                          <span className="text-[10px] text-gray-400 font-semibold w-16 md:w-20 text-center leading-tight">Reduced Manual Tracking</span>
                        </div>
                        <div className="flex flex-col gap-1.5 items-center">
                          <Activity className="w-5 h-5 text-purple-400 opacity-80" />
                          <span className="text-[10px] text-gray-400 font-semibold w-16 md:w-20 text-center leading-tight">Improved Queue Visibility</span>
                        </div>
                        <div className="flex flex-col gap-1.5 items-center">
                          <Zap className="w-5 h-5 text-purple-400 opacity-80" />
                          <span className="text-[10px] text-gray-400 font-semibold w-16 md:w-20 text-center leading-tight">Faster Debugging Workflows</span>
                        </div>
                        <div className="flex flex-col gap-1.5 items-center">
                          <Shield className="w-5 h-5 text-blue-400 opacity-80" />
                          <span className="text-[10px] text-gray-400 font-semibold w-16 md:w-20 text-center leading-tight">Proactive SLA Breach</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : impact.layout === 'platform_security' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-8 rounded-[28px] overflow-hidden relative shadow-2xl"
                    style={{
                      background: '#050505',
                      border: '1px solid rgba(45, 212, 191, 0.22)',
                      boxShadow: '0 30px 90px -30px rgba(16, 185, 129, 0.28), 0 0 0 1px rgba(34, 211, 238, 0.08) inset'
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute -top-24 left-0 w-96 h-96 rounded-full blur-[110px] bg-emerald-500/12" />
                      <div className="absolute top-8 right-[-60px] w-80 h-80 rounded-full blur-[120px] bg-cyan-500/10" />
                      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.1),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.06),transparent_28%)]" />
                    </div>

                    <div className="relative z-10 p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)] gap-6 lg:gap-8 items-start">
                      <div className="flex flex-col justify-center space-y-5">
                        <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.24em] uppercase border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.18)]">
                          <Shield className="w-3.5 h-3.5" />
                          {impact.metricLabel || "Platform Security"}
                        </div>

                        <div className="space-y-4 max-w-[680px]">
                          <h2 className="text-4xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                            <span className="block text-white">{impact.title?.split('&')[0]?.trim() || "Azure Key Vault"}</span>
                            <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                              {impact.title?.split('&')[1]?.trim() || "Dynamic Runtime Configs"}
                            </span>
                          </h2>
                          <p className="text-[15px] md:text-[16px] leading-relaxed text-slate-300/80 max-w-[620px]">
                            {impact.text}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          {(impact.features || []).map((feature, index) => {
                            const FeatureIcon = feature.icon === "Database" ? Database : Lock;
                            const isBlue = index === 0;

                            return (
                              <div key={feature.title} className={`group relative overflow-hidden rounded-3xl border ${isBlue ? 'bg-gradient-to-br from-sky-400/24 via-sky-500/12 to-cyan-500/8 border-cyan-400/20 shadow-[0_0_24px_rgba(34,211,238,0.1)]' : 'bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-teal-500/8 border-emerald-400/20 shadow-[0_0_24px_rgba(16,185,129,0.1)]'} backdrop-blur-xl p-4`}>
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%)] opacity-70" />
                                <div className="relative flex gap-4 items-start">
                                  <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
                                    <div className={`absolute inset-3 rounded-2xl ${isBlue ? 'bg-cyan-500/10' : 'bg-emerald-500/10'} blur-md`} />
                                    <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                                      <div className={`w-12 h-12 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center ${isBlue ? 'text-cyan-300' : 'text-emerald-300'}`}>
                                        <FeatureIcon className="w-6 h-6" />
                                      </div>
                                      <div className={`h-1.5 w-16 rounded-full ${isBlue ? 'bg-cyan-400/50' : 'bg-emerald-400/50'} blur-[1px]`} />
                                    </div>
                                  </div>

                                  <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                                    <h4 className={`text-lg md:text-xl font-bold ${isBlue ? 'text-cyan-200' : 'text-emerald-200'} leading-tight`}>
                                      {feature.title}
                                    </h4>
                                    <p className="text-sm md:text-[14px] text-slate-300/78 leading-relaxed max-w-[24rem]">
                                      {feature.text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 lg:pt-3">
                        {(impact.metrics || []).map((panel, index) => {
                          const PanelIcon = index === 0 ? Clock : Shield;
                          const isEmerald = index === 0;

                          return (
                            <div
                              key={panel.label}
                              className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.92),rgba(7,7,7,0.82))] ${isEmerald ? 'shadow-[0_0_32px_rgba(16,185,129,0.18)]' : 'shadow-[0_0_32px_rgba(34,211,238,0.18)]'} backdrop-blur-2xl p-5 md:p-6 min-h-[206px] flex flex-col justify-between`}
                            >
                              <div className={`absolute inset-0 opacity-80 ${isEmerald ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_90%,rgba(16,185,129,0.12),transparent_28%)]' : 'bg-[radial-gradient(circle_at_28%_22%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_82%_88%,rgba(34,211,238,0.12),transparent_28%)]'}`} />
                              <div className={`absolute top-0 left-0 right-0 h-px ${isEmerald ? 'bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent'}`} />

                              <div className="relative z-10 flex items-start justify-between gap-4 min-h-[132px]">
                                <div className={`w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-black/35 ${isEmerald ? 'text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.16)]' : 'text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.16)]'}`}>
                                  <PanelIcon className="w-7 h-7" />
                                </div>

                                {index === 0 ? (
                                  <div className="text-right space-y-1">
                                    <div className="text-[clamp(2.05rem,3.2vw,2.95rem)] leading-none font-black text-white tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                      {panel.value}
                                    </div>
                                    <ArrowDown className={`w-6 h-6 mx-auto ${isEmerald ? 'text-emerald-300' : 'text-cyan-300'}`} />
                                    <div className={`text-[clamp(1.7rem,2.7vw,2.45rem)] leading-none font-black ${isEmerald ? 'text-emerald-300' : 'text-cyan-300'}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                      {panel.secondary}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-right space-y-1">
                                    <div className="text-[clamp(2.1rem,3.4vw,3.1rem)] leading-none font-black text-white tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                      {panel.value}
                                    </div>
                                    <div className={`whitespace-pre-line text-[clamp(1.55rem,2.5vw,2.3rem)] leading-none font-black ${isEmerald ? 'text-emerald-300' : 'text-cyan-300'}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                      {panel.secondary}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
                                <p className="text-[13px] md:text-sm text-slate-200/80 leading-relaxed">
                                  {panel.label}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-3 lg:col-span-2">
                        {(impact.tags || []).map((tag, index) => {
                          const TagIcon = index === 0 ? Lock : index === 1 ? RefreshCw : index === 2 ? Database : index === 3 ? Shield : ArrowDown;

                          return (
                            <div key={tag} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${index === 1 || index === 4 ? 'border-cyan-400/20 bg-cyan-400/8' : 'border-emerald-400/20 bg-emerald-400/8'} backdrop-blur-md text-xs font-semibold tracking-wide text-slate-200 shadow-[0_0_18px_rgba(255,255,255,0.04)]`}>
                              <TagIcon className={`w-3.5 h-3.5 ${index === 1 || index === 4 ? 'text-cyan-300' : 'text-emerald-300'}`} />
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : impact.layout === 'technical' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-8 rounded-2xl overflow-hidden mt-8"
                    style={{ border: `1px solid ${style.border}`, background: 'var(--surface2)' }}
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                      <IconComponent className="w-48 h-48" style={{ color: style.color }} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 relative z-10">
                      <div className="flex-1 space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                          {impact.metricLabel || "Technical Initiative"}
                        </div>
                        <h3 className="text-2xl font-bold">{impact.title}</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                          <div className="space-y-3">
                            <h4 className="text-sm uppercase tracking-wider font-bold" style={{ color: style.color }}>The Solution</h4>
                            <p className="text-[var(--muted)] leading-relaxed text-sm">{impact.solution || impact.text}</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm uppercase tracking-wider font-bold" style={{ color: style.color }}>The Outcome</h4>
                            <p className="text-[var(--muted)] leading-relaxed text-sm">{impact.outcome || impact.text}</p>
                          </div>
                        </div>
                      </div>

                      {impact.extraMetrics && (
                        <div className="w-full md:w-48 shrink-0 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-[var(--border)] pt-6 md:pt-0 md:pl-8">
                          {impact.extraMetrics.map((em, idx) => (
                            <div key={idx} className="p-4 rounded-xl text-center" style={{ background: 'var(--surface)', border: `1px solid ${style.border}` }}>
                              <div className="text-3xl font-bold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: style.color }}>
                                {em.value}
                              </div>
                              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider font-semibold">
                                {em.label.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    {/* TEXT CONTENT */}
                    <div className="flex-1 space-y-6">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                        {impact.metricLabel}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{impact.title}</h3>
                      <p className="text-lg text-[var(--muted)] leading-relaxed">{impact.text}</p>

                      <div className="flex flex-wrap gap-4 mt-4">
                        {impact.extraMetrics && impact.extraMetrics.map((em, idx) => (
                          <div key={idx} className="pres-card-sm inline-flex items-center gap-4" style={{ background: 'var(--surface2)', border: `1px solid ${style.border}` }}>
                            <div className="text-3xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: style.color }}>
                              {em.value}
                            </div>
                            <div className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
                              {em.label.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* IMAGE / PROOF OR PLACEHOLDER */}
                    <div className="flex-1 w-full">
                      {impact.image ? (
                        <ImageCarousel
                          images={impact.image}
                          captions={impact.imageCaption}
                          title={impact.title}
                          style={style}
                          onClickImage={setSelectedImage}
                        />
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
                )}
              </div>
            );
          })}
        </div>

      </Section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <LightboxCarousel data={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
