"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
