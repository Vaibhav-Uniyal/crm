import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import SectionHeader from "../components/layout/SectionHeader";
import PipelineVisualizer from "../components/workflow/PipelineVisualizer";
import TechStackSection from "../components/tech/TechStackSection";
import { masterPipeline } from "../data/workflows";
import { useTicketSimulation } from "../hooks/useTicketSimulation";

const highlights = [
  { title: "Dual AI Models", desc: "GPT + Gemini parallel classification", to: "/workflow/ai", color: "#22d3ee" },
  { title: "Smart Routing", desc: "Folder automation & module APIs", to: "/workflow/routing", color: "#34d399" },
  { title: "Conversation AI", desc: "5-stage conversation state machine", to: "/workflow/escalation", color: "#fbbf24" },
  { title: "Live Analytics", desc: "Real-time automation metrics", to: "/workflow/analytics", color: "#fb7185" },
];

export default function WhatWeBuilt() {
  const { activeIndex, completedSteps } = useTicketSimulation(
    masterPipeline,
    { stepDuration: 2000, loop: true }
  );

  return (
    <PageTransition className="min-h-screen pt-24 pb-20 px-4 relative">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge="What We Built"
          title="Intelligent Email Automation"
          subtitle="An end-to-end pipeline that ingests CRM emails, classifies with dual AI models, routes automatically, and escalates when confidence drops."
        />

        <div className="mb-20">
          <PipelineVisualizer
            steps={masterPipeline}
            activeIndex={activeIndex}
            completedSteps={completedSteps}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {highlights.map((item, i) => (
            <Link key={item.title} to={item.to}>
              <div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 h-full group cursor-pointer border border-transparent hover:border-white/10"
              >
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{ background: item.color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <SectionHeader
          badge="Technology"
          title="Built With"
          subtitle="Production-grade AI stack powering every ticket."
          align="center"
        />
        <TechStackSection />
      </div>
    </PageTransition>
  );
}
