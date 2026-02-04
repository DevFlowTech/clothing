"use client";

import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  from?: "top" | "bottom" | "left" | "right";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  from = "bottom",
  distance = 40,
  once = true,
  threshold = 0.2,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getDirection = () => {
    switch (from) {
      case "top":
        return { y: -distance };
      case "bottom":
        return { y: distance };
      case "left":
        return { x: -distance };
      case "right":
        return { x: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirection() }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...getDirection() }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
