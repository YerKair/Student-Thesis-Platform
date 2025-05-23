"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpaceProgressLoaderProps {
  isLoading: boolean;
  progress?: number; // 0-100
  message?: string;
  primaryColor?: string; // Основной цвет лоадера
  secondaryColor?: string; // Вторичный цвет для градиентов
}

export function SpaceProgressLoader({
  isLoading,
  progress: externalProgress,
  message = "Подключение к космической сети...",
  primaryColor = "#3b82f6", // Синий по умолчанию
  secondaryColor = "#4f46e5", // Индиго по умолчанию
}: SpaceProgressLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);

  // Автоматически увеличиваем прогресс, если внешний прогресс не предоставлен
  useEffect(() => {
    if (!isLoading) return;

    if (externalProgress !== undefined) {
      setProgress(externalProgress);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Замедляем прогресс по мере приближения к 100%
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining / 20);

        // Ограничиваем до 98% при автоматическом прогрессе
        return Math.min(98, prev + increment);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, externalProgress]);

  // Меняем сообщения в зависимости от прогресса
  useEffect(() => {
    if (progress < 20) {
      setCurrentMessage("Подключение к космической сети...");
    } else if (progress < 40) {
      setCurrentMessage("Инициализация квантовых протоколов...");
    } else if (progress < 60) {
      setCurrentMessage("Синхронизация межзвездных данных...");
    } else if (progress < 80) {
      setCurrentMessage("Расшифровка галактических кодов...");
    } else if (progress < 95) {
      setCurrentMessage("Завершение космической трансмиссии...");
    } else {
      setCurrentMessage("Готово!");
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Пульсирующий фоновый эффект */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative flex flex-col items-center max-w-md w-full px-8">
            {/* Космический корабль, движущийся по траектории */}
            <div className="relative w-full h-60 mb-8">
              {/* Звезды на фоне */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.3, 1],
                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Траектория полета (орбита) */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[200px] h-[100px] border-2 border-dashed rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  borderColor: `rgba(${primaryColor
                    .replace("#", "")
                    .slice(0, 2)}, ${primaryColor
                    .replace("#", "")
                    .slice(2, 4)}, ${primaryColor
                    .replace("#", "")
                    .slice(4, 6)}, ${0.3 + (progress / 100) * 0.5})`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Космический корабль */}
              <motion.div
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="relative"
                  style={{
                    x: 100, // Радиус орбиты
                    rotate: -90, // Начальное положение
                  }}
                >
                  {/* Корабль */}
                  <motion.div
                    className="relative w-12 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transform -skew-x-12"
                    animate={{
                      rotate: progress * 3.6, // Поворачиваем корабль по мере загрузки (0-360 градусов)
                      boxShadow: [
                        `0 0 5px rgba(${primaryColor
                          .replace("#", "")
                          .slice(0, 2)}, ${primaryColor
                          .replace("#", "")
                          .slice(2, 4)}, ${primaryColor
                          .replace("#", "")
                          .slice(4, 6)}, 0.5)`,
                        `0 0 15px rgba(${primaryColor
                          .replace("#", "")
                          .slice(0, 2)}, ${primaryColor
                          .replace("#", "")
                          .slice(2, 4)}, ${primaryColor
                          .replace("#", "")
                          .slice(4, 6)}, 0.8)`,
                        `0 0 5px rgba(${primaryColor
                          .replace("#", "")
                          .slice(0, 2)}, ${primaryColor
                          .replace("#", "")
                          .slice(2, 4)}, ${primaryColor
                          .replace("#", "")
                          .slice(4, 6)}, 0.5)`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Кабина */}
                    <motion.div
                      className="absolute top-1 left-2 w-3 h-3 bg-cyan-300 rounded-full"
                      animate={{
                        backgroundColor: ["#67e8f9", "#22d3ee", "#67e8f9"],
                        boxShadow: [
                          "0 0 2px rgba(103, 232, 249, 0.5)",
                          "0 0 8px rgba(103, 232, 249, 0.8)",
                          "0 0 2px rgba(103, 232, 249, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Двигатель */}
                    <motion.div
                      className="absolute -right-4 top-1/2 h-2 transform -translate-y-1/2"
                      style={{
                        width: "15px",
                        background:
                          "linear-gradient(to left, transparent, #f97316, #ef4444)",
                        borderRadius: "2px",
                        filter: "blur(2px)",
                      }}
                      animate={{
                        width: ["10px", "20px", "10px"],
                        opacity: [0.7, 1, 0.7],
                        filter: ["blur(2px)", "blur(4px)", "blur(2px)"],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Планета назначения */}
              <motion.div
                className="absolute bottom-0 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900"
                style={{
                  boxShadow: "inset -5px -5px 25px rgba(0,0,0,0.5)",
                }}
                animate={{
                  rotate: 360,
                  boxShadow: [
                    "inset -5px -5px 25px rgba(0,0,0,0.5), 0 0 10px rgba(79, 70, 229, 0.3)",
                    "inset -5px -5px 25px rgba(0,0,0,0.5), 0 0 20px rgba(79, 70, 229, 0.6)",
                    "inset -5px -5px 25px rgba(0,0,0,0.5), 0 0 10px rgba(79, 70, 229, 0.3)",
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Кратеры/детали поверхности */}
                <div className="absolute w-6 h-6 rounded-full bg-blue-800/50 top-3 left-3" />
                <div className="absolute w-4 h-4 rounded-full bg-blue-800/50 bottom-4 right-5" />

                {/* Кольца */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[150%] h-[40%] border border-indigo-400/30 rounded-full"
                  style={{
                    transform: "translate(-50%, -50%) rotateX(75deg)",
                  }}
                  animate={{
                    borderColor: [
                      `rgba(${secondaryColor
                        .replace("#", "")
                        .slice(0, 2)}, ${secondaryColor
                        .replace("#", "")
                        .slice(2, 4)}, ${secondaryColor
                        .replace("#", "")
                        .slice(4, 6)}, 0.3)`,
                      `rgba(${secondaryColor
                        .replace("#", "")
                        .slice(0, 2)}, ${secondaryColor
                        .replace("#", "")
                        .slice(2, 4)}, ${secondaryColor
                        .replace("#", "")
                        .slice(4, 6)}, 0.6)`,
                      `rgba(${secondaryColor
                        .replace("#", "")
                        .slice(0, 2)}, ${secondaryColor
                        .replace("#", "")
                        .slice(2, 4)}, ${secondaryColor
                        .replace("#", "")
                        .slice(4, 6)}, 0.3)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Индикатор прогресса */}
            <div className="w-full max-w-sm mb-6">
              <div className="relative h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />

                {/* Световые частицы на полосе прогресса */}
                {progress > 5 && (
                  <motion.div
                    className="absolute top-0 h-full w-12 bg-white/30"
                    style={{ left: `${progress - 5}%` }}
                    animate={{
                      opacity: [0, 1, 0],
                      boxShadow: [
                        "0 0 5px rgba(255, 255, 255, 0.3)",
                        "0 0 15px rgba(255, 255, 255, 0.6)",
                        "0 0 5px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>

              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>0%</span>
                <motion.span
                  animate={{
                    color:
                      progress === 100
                        ? ["#a5b4fc", "#818cf8", "#a5b4fc"]
                        : "inherit",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {Math.round(progress)}%
                </motion.span>
                <span>100%</span>
              </div>
            </div>

            {/* Сообщение о статусе */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={currentMessage} // Важно для анимации при смене сообщения
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-blue-300 mb-1"
                animate={{
                  textShadow: [
                    "0 0 2px rgba(147, 197, 253, 0.3)",
                    "0 0 8px rgba(147, 197, 253, 0.6)",
                    "0 0 2px rgba(147, 197, 253, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {currentMessage}
              </motion.p>

              {/* Анимированные точки */}
              <div className="flex justify-center space-x-1 mt-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    boxShadow: [
                      "0 0 2px rgba(96, 165, 250, 0.3)",
                      "0 0 8px rgba(96, 165, 250, 0.8)",
                      "0 0 2px rgba(96, 165, 250, 0.3)",
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-indigo-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    boxShadow: [
                      "0 0 2px rgba(129, 140, 248, 0.3)",
                      "0 0 8px rgba(129, 140, 248, 0.8)",
                      "0 0 2px rgba(129, 140, 248, 0.3)",
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    boxShadow: [
                      "0 0 2px rgba(192, 132, 252, 0.3)",
                      "0 0 8px rgba(192, 132, 252, 0.8)",
                      "0 0 2px rgba(192, 132, 252, 0.3)",
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
