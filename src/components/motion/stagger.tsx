"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  from?: "top" | "bottom" | "left" | "right";
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  from = "bottom",
  distance = 20,
  ...props
}: StaggerItemProps) {
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
      variants={{
        hidden: { opacity: 0, ...getDirection() },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
