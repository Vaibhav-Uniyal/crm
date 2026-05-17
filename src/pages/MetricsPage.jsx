import { motion } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import SectionHeader from "../components/layout/SectionHeader";
import AnimatedCounter from "../components/metrics/AnimatedCounter";
import { impactMetrics } from "../data/metrics";
import { fadeUp, staggerContainer } from "../animations/variants";

export default function MetricsPage() {
  return (
    <PageTransition className="min-h-screen pt-24 pb-20 px-4 relative">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge="Impact"
          title="Metrics & Impact"
          subtitle="Measurable outcomes from intelligent automation."
        />

        <div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {impactMetrics.map((metric, i) => (
            <div
              key={metric.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-8 text-center relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${metric.color}15, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  color={metric.color}
                />
                <h3 className="mt-4 font-semibold text-white">{metric.label}</h3>
                <p className="mt-2 text-sm text-zinc-500">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass rounded-2xl p-12"
        >
          <motion.p
            className="text-2xl md:text-3xl font-bold glow-text"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Production-grade intelligent automation
          </motion.p>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            Dual-model AI, conversation-aware orchestration, and graceful escalation —
            built for enterprise customer service at scale.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
