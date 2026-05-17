import { motion } from "framer-motion";
import {
  GitMerge,
  Layers,
  Shield,
  RefreshCw,
  FileQuestion,
  TrendingUp,
} from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import SectionHeader from "../components/layout/SectionHeader";
import { challenges } from "../data/architecture";
import { fadeUp, staggerContainer } from "../animations/variants";

const iconMap = {
  gitMerge: GitMerge,
  layers: Layers,
  shield: Shield,
  refreshCw: RefreshCw,
  fileQuestion: FileQuestion,
  trendingUp: TrendingUp,
};

export default function ChallengesPage() {
  return (
    <PageTransition className="min-h-screen pt-24 pb-20 px-4 relative">
      <AnimatedBackground variant="warning" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          badge="Engineering"
          title="Challenges Solved"
          subtitle="Edge cases, failures, and scale — handled with visual clarity."
        />

        <div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {challenges.map((item, i) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <div
                key={item.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-xs font-mono text-rose-400 shrink-0 pt-0.5">PROBLEM</span>
                      <p className="text-sm text-zinc-400">{item.problem}</p>
                    </div>
                    <div
                      className="h-px bg-gradient-to-r from-rose-500/50 via-indigo-500/50 to-emerald-500/50"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    />
                    <div
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="text-xs font-mono text-emerald-400 shrink-0 pt-0.5">SOLVED</span>
                      <p className="text-sm text-zinc-300">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
