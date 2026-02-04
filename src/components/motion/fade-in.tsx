"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  from?: "top" | "bottom" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  from = "bottom",
  distance = 24,
  ...props
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (from) {
      case "top":
        return { y: -distance, x: 0 };
      case "bottom":
        return { y: distance, x: 0 };
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
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
