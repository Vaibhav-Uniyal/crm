import { motion } from "framer-motion";
import { techStack } from "../../data/techStack";
import { TechLogo } from "./TechLogos";
import { staggerContainer, fadeUp } from "../../animations/variants";

export default function TechStackSection() {
  return (
    <div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
    >
      {techStack.map((tech, i) => (
        <div
          key={tech.id}
          variants={fadeUp}
          custom={i}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glass rounded-2xl p-6 group cursor-default relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${tech.color}20, transparent 70%)`,
            }}
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <div
              className="w-14 h-14"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              <TechLogo id={tech.id} className="w-14 h-14" />
            </div>
            <h3 className="font-semibold text-white text-sm">{tech.name}</h3>
            <p className="text-xs text-zinc-500 leading-snug">{tech.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
