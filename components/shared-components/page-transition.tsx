"use client"

import { motion } from "framer-motion";

export default function PageTransition({
    children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="origin-center min-h-screen overflow-hidden"
      initial={{ opacity: 0, y: 10, filter: "blur(6px)", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)", scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}