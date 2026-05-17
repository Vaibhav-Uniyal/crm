import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div
      className={`max-w-3xl mb-16 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {badge && (
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-4xl md:text-5xl font-bold tracking-tight glow-text mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-lg text-zinc-400 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
