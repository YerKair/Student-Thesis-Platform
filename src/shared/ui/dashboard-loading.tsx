"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface DashboardLoadingProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const DashboardLoading = ({
  isVisible,
  onComplete,
  duration = 1500,
}: DashboardLoadingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Инициализация системы...",
    "Загрузка профиля...",
    "Синхронизация данных...",
    "Подготовка интерфейса...",
    "Добро пожаловать!",
  ];

  useEffect(() => {
    if (!isVisible) return;

    console.log("📱 Dashboard загрузка запущена!");

    const stepDuration = duration / loadingSteps.length;

    const timers = loadingSteps.map((_, index) =>
      setTimeout(() => {
        setCurrentStep(index);
        if (index === loadingSteps.length - 1) {
          setTimeout(() => {
            console.log("✅ Dashboard загрузка завершена!");
            onComplete?.();
          }, stepDuration);
        }
      }, index * stepDuration)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isVisible, duration, loadingSteps.length, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99998] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Фоновые частицы */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Центральный контент */}
        <div className="relative z-10 text-center">
          {/* Логотип */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center relative overflow-hidden border-2 border-blue-300"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  boxShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.3)",
                    "0 0 30px rgba(99, 102, 241, 0.4)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{
                  scale: { delay: 0.4, duration: 0.6 },
                  opacity: { delay: 0.4, duration: 0.6 },
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <Image
                  src="/Diplomate.png"
                  alt="DiploMate"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>

              {/* Орбитальные кольца */}
              <motion.div
                className="absolute inset-0 w-20 h-20 border-2 border-blue-300 rounded-full opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-2 w-24 h-24 border border-indigo-300 rounded-full opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Название системы */}
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            DiploMate
          </motion.h1>

          <motion.p
            className="text-blue-200 text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Цифровое сопровождение дипломных работ
          </motion.p>

          {/* Статус загрузки */}
          <motion.div
            className="w-80 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {/* Текст статуса */}
            <motion.p
              key={currentStep}
              className="text-white text-lg mb-6 h-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingSteps[currentStep]}
            </motion.p>

            {/* Прогресс бар */}
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentStep + 1) / loadingSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Индикатор процента */}
            <motion.p
              className="text-blue-300 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}%
            </motion.p>
          </motion.div>

          {/* Декоративные элементы */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
