"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlashTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  color?: string;
  intensity?: "low" | "medium" | "high";
}

export function FlashTransition({
  isActive,
  onComplete,
  duration = 3000,
  color = "white",
  intensity = "medium",
}: FlashTransitionProps) {
  // Вызываем callback после завершения анимации
  useEffect(() => {
    if (isActive && onComplete) {
      console.log("Flash transition active, setting timeout");
      const timer = setTimeout(() => {
        console.log("Flash transition complete, calling onComplete");
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, duration]);

  // Определяем параметры анимации в зависимости от интенсивности
  const getAnimationParams = () => {
    switch (intensity) {
      case "low":
        return {
          opacity: [0, 0.7, 0.7, 0.5, 0.3, 0.1, 0],
          times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
        };
      case "high":
        return {
          opacity: [0, 1, 1, 1, 0.9, 0.8, 0.7, 0.5, 0.3, 0.1, 0],
          times: [0, 0.05, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        };
      case "medium":
      default:
        return {
          opacity: [0, 1, 1, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0],
          times: [0, 0.05, 0.1, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        };
    }
  };

  const animationParams = getAnimationParams();

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Основная вспышка */}
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: animationParams.opacity,
            }}
            transition={{
              duration: duration / 1000,
              times: animationParams.times,
              ease: "easeInOut",
            }}
          />

          {/* Дополнительный эффект сияния (только для средней и высокой интенсивности) */}
          {intensity !== "low" && (
            <motion.div
              className="fixed inset-0 z-49 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 100px ${color}`,
                background: "transparent",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0.5, 0.3, 0],
              }}
              transition={{
                duration: (duration / 1000) * 1.2,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: "easeInOut",
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
