"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.9,
  once = true,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionMap = {
    up: { y: distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionMap[direction];
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
