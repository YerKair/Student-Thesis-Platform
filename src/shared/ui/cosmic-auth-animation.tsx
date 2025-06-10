"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CosmicAuthAnimationProps {
  isActive: boolean;
  onComplete: () => void;
  duration?: number;
}

export const CosmicAuthAnimation = ({
  isActive,
  onComplete,
  duration = 3000,
}: CosmicAuthAnimationProps) => {
  const [showStars, setShowStars] = useState(false);
  const [showPlanet, setShowPlanet] = useState(false);
  const [showWormhole, setShowWormhole] = useState(false);

  useEffect(() => {
    console.log(
      "🔍 CosmicAuthAnimation useEffect triggered, isActive:",
      isActive
    );

    if (isActive) {
      console.log("🌌 Запуск космической анимации авторизации");
      console.log("⏱️ Длительность анимации:", duration, "мс");

      // Сброс всех состояний перед запуском новой анимации
      setShowStars(false);
      setShowWormhole(false);
      setShowPlanet(false);

      // Поэтапная анимация
      const starTimeout = setTimeout(() => {
        console.log("⭐ Показываем звезды");
        setShowStars(true);
      }, 100);

      const wormholeTimeout = setTimeout(() => {
        console.log("🌀 Показываем червоточину");
        setShowWormhole(true);
      }, 400);

      const planetTimeout = setTimeout(() => {
        console.log("🪐 Показываем планету");
        setShowPlanet(true);
      }, 800);

      // Завершение анимации
      const completeTimeout = setTimeout(() => {
        console.log("✨ Космическая анимация завершена, вызываем onComplete");
        onComplete();
      }, duration);

      // Cleanup функция
      return () => {
        console.log("🧹 Очистка таймеров космической анимации");
        clearTimeout(starTimeout);
        clearTimeout(wormholeTimeout);
        clearTimeout(planetTimeout);
        clearTimeout(completeTimeout);
      };
    } else {
      console.log("❌ Анимация деактивирована, сброс состояний");
      setShowStars(false);
      setShowPlanet(false);
      setShowWormhole(false);
    }
  }, [isActive, duration, onComplete]);

  console.log("🎨 CosmicAuthAnimation render:", {
    isActive,
    showStars,
    showWormhole,
    showPlanet,
    duration,
  });

  if (!isActive) {
    console.log("🚫 CosmicAuthAnimation не рендерится, isActive = false");
    return null;
  }

  console.log("🌌 CosmicAuthAnimation рендерится, isActive:", isActive);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ПРОСТОЙ ТЕСТ - БОЛЬШОЙ ТЕКСТ */}
        <div className="text-center">
          <motion.h1
            className="text-6xl font-bold text-white mb-4"
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🌌 КОСМИЧЕСКАЯ АНИМАЦИЯ РАБОТАЕТ! 🌌
          </motion.h1>
          <motion.p
            className="text-2xl text-blue-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Длительность: {duration}мс
          </motion.p>
        </div>

        {/* Простое звездное поле для проверки */}
        {showStars && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full w-2 h-2"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
