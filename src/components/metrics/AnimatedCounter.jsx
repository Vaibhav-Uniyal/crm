import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
  color = "#6366f1",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className="text-5xl md:text-6xl font-bold tabular-nums"
      style={{ color }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}
