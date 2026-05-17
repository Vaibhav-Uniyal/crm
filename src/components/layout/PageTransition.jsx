import { motion } from "framer-motion";
import { pageTransition } from "../../animations/variants";

export default function PageTransition({ children, className = "" }) {
  return (
    <div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </div>
  );
}
