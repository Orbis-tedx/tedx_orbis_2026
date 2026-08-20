import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Route-level transition: fade + slight vertical shift on a custom curve. */
export default function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  );
}
