"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface SmoothTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  duration?: number;
  delay?: number;
}

export const SmoothTransition = ({
  children,
  isVisible,
  duration = 0.8,
  delay = 0,
}: SmoothTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="w-full h-full"
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(5px)",
          }}
          transition={{
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({
  children,
  className = "",
}: PageTransitionProps) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.98,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
}

export const SlideIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
}: SlideInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -50, y: 0 };
      case "right":
        return { x: 50, y: 0 };
      case "up":
        return { x: 0, y: 50 };
      case "down":
        return { x: 0, y: -50 };
      default:
        return { x: 0, y: 50 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredChildrenProps {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export const StaggeredChildren = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = "",
}: StaggeredChildrenProps) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <SlideIn
          key={index}
          delay={initialDelay + index * staggerDelay}
          duration={0.6}
        >
          {child}
        </SlideIn>
      ))}
    </div>
  );
};
