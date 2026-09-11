"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { rise, inView } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={rise}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
