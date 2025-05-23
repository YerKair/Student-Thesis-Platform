"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpacePortalProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function SpacePortal({ isActive, onComplete }: SpacePortalProps) {
  const [showExplosion, setShowExplosion] = useState(false);

  // Отладочное сообщение при изменении isActive
  useEffect(() => {
    console.log("SpacePortal isActive changed:", isActive);
  }, [isActive]);

  // Управление эффектами и таймерами
  useEffect(() => {
    if (isActive) {
      console.log("Portal activated");

      // Показываем эффект взрыва через 1.5 секунды
      const explosionTimer = setTimeout(() => {
        console.log("Showing explosion effect");
        setShowExplosion(true);
      }, 1500);

      // Вызываем callback после завершения анимации
      const completeTimer = setTimeout(() => {
        console.log("Animation complete, calling onComplete");
        if (onComplete) onComplete();
      }, 4000);

      return () => {
        clearTimeout(explosionTimer);
        clearTimeout(completeTimer);
      };
    } else {
      setShowExplosion(false);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Фоновое затемнение */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Центральный портал */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {/* Кольца портала */}
        <motion.div
          className="absolute rounded-full border-4 border-blue-500"
          style={{ width: 200, height: 200, top: -100, left: -100 }}
          animate={{
            rotate: 360,
            borderColor: ["#3b82f6", "#6366f1", "#8b5cf6", "#3b82f6"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Космический взрыв */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div
            className="absolute z-20 inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Центр взрыва - яркая вспышка */}
            <motion.div
              className="absolute rounded-full bg-white"
              style={{ width: 20, height: 20 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 30, 50],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                times: [0, 0.1, 0.5, 1],
                ease: "easeOut",
              }}
            />

            {/* Финальная вспышка белого света */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 1] }}
              transition={{
                duration: 2.5,
                times: [0, 0.7, 0.8, 1],
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
