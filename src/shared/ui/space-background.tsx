"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpaceBackgroundProps {
  children: React.ReactNode;
}

// Улучшенная звезда с мерцанием и случайными вспышками
const Star = ({
  delay = 0,
  size: initialSize = 2,
}: {
  delay?: number;
  size?: number;
}) => {
  const size = initialSize * (Math.random() * 0.5 + 0.8); // Небольшая вариация размера
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 3 + 2;
  const twinkleDelay = Math.random() * 10;
  const hasFlare = Math.random() > 0.8;

  return (
    <>
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          opacity: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.8, 0.4, 0.8, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          delay: delay + twinkleDelay,
          ease: "easeInOut",
        }}
      />

      {/* Случайная вспышка для некоторых звезд */}
      {hasFlare && (
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            width: `${size * 1.5}px`,
            height: `${size * 1.5}px`,
            top: `${top}%`,
            left: `${left}%`,
            filter: "blur(1px)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [1, 2.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
};

// Улучшенная падающая звезда с хвостом
const ShootingStar = () => {
  const top = Math.random() * 50;
  const left = Math.random() * 70;
  const angle = Math.random() * 45;
  const length = Math.random() * 100 + 50;
  const duration = Math.random() * 1 + 0.8;

  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
      style={{
        width: `${length}px`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${angle}deg)`,
        opacity: 0,
        filter: "blur(0.5px)",
      }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: [0, 1, 0], x: 250 }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay: Math.random() * 15 + 5,
        ease: "easeInOut",
      }}
    >
      {/* Яркая головка кометы */}
      <motion.div
        className="absolute right-0 w-1.5 h-1.5 rounded-full bg-white"
        style={{
          boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.7)",
          marginRight: "-2px",
        }}
      />
    </motion.div>
  );
};

// Улучшенная туманность с более сложной анимацией
const Nebula = () => {
  const colors = [
    "from-purple-500/10 via-indigo-400/5 to-blue-500/5",
    "from-blue-500/10 via-cyan-400/5 to-teal-500/5",
    "from-indigo-500/10 via-purple-400/5 to-pink-500/5",
    "from-pink-500/10 via-red-400/5 to-orange-500/5",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const top = Math.random() * 80;
  const left = Math.random() * 80;
  const size = Math.random() * 300 + 150;
  const rotationSpeed = Math.random() * 200 + 100;

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${randomColor} blur-2xl`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity: 0.2,
        transformOrigin: "center",
      }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.1],
        rotate: 360,
        scale: [1, 1.05, 1],
      }}
      transition={{
        opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: rotationSpeed, repeat: Infinity, ease: "linear" },
        scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
};

// Планета с кольцами и лунами
const Planet = () => {
  const size = Math.random() * 60 + 40;
  const position = {
    top: Math.random() * 70 + 10,
    left: Math.random() * 70 + 15,
  };

  const planetColors = [
    "bg-gradient-to-br from-blue-600 to-blue-900",
    "bg-gradient-to-br from-purple-600 to-indigo-900",
    "bg-gradient-to-br from-cyan-500 to-blue-800",
    "bg-gradient-to-br from-red-600 to-red-900",
  ];

  const randomColor =
    planetColors[Math.floor(Math.random() * planetColors.length)];
  const hasRings = Math.random() > 0.5;
  const hasMoons = Math.random() > 0.3;
  const moonCount = Math.floor(Math.random() * 2) + 1;

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 2 }}
    >
      {/* Планета */}
      <motion.div
        className={`w-full h-full rounded-full ${randomColor} relative shadow-lg`}
        style={{
          boxShadow: "inset -5px -5px 25px rgba(0,0,0,0.3)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Детали поверхности */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <div
            className="absolute w-1/2 h-1/4 bg-white/10 blur-md rounded-full"
            style={{ top: "20%", left: "10%", transform: "rotate(30deg)" }}
          />
          <div
            className="absolute w-1/3 h-1/5 bg-white/10 blur-md rounded-full"
            style={{ top: "60%", left: "60%", transform: "rotate(-20deg)" }}
          />
        </div>
      </motion.div>

      {/* Кольца */}
      {hasRings && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
          style={{
            width: `${size * 1.8}px`,
            height: `${size * 0.5}px`,
            borderWidth: "2px",
            transform: "translate(-50%, -50%) rotateX(75deg)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Луны */}
      {hasMoons &&
        Array.from({ length: moonCount }).map((_, i) => {
          const moonSize = size * 0.2;
          const orbitSize = size * (1.5 + i * 0.3);
          const moonSpeed = 20 + i * 10;
          const moonDelay = i * 2;

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${orbitSize}px`,
                height: `${orbitSize}px`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: moonSpeed,
                repeat: Infinity,
                ease: "linear",
                delay: moonDelay,
              }}
            >
              <div
                className="absolute bg-gray-300 rounded-full shadow-inner"
                style={{
                  width: `${moonSize}px`,
                  height: `${moonSize}px`,
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.5)",
                }}
              />
            </motion.div>
          );
        })}
    </motion.div>
  );
};

// Космический корабль, пролетающий через сцену
const Spaceship = () => {
  const top = Math.random() * 70 + 15;
  const duration = Math.random() * 15 + 20;
  const size = Math.random() * 10 + 5;

  return (
    <motion.div
      className="absolute"
      style={{
        top: `${top}%`,
        left: "-50px",
      }}
      initial={{ x: -100 }}
      animate={{ x: "calc(100vw + 100px)" }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay: Math.random() * 30 + 30,
        ease: "linear",
      }}
    >
      {/* Корпус корабля */}
      <motion.div
        className="relative"
        style={{
          width: `${size * 2}px`,
          height: `${size}px`,
        }}
      >
        {/* Корпус */}
        <div className="absolute w-full h-full bg-gray-200 rounded-full transform -skew-x-12" />

        {/* Кабина */}
        <div
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: `${size * 0.6}px`,
            height: `${size * 0.6}px`,
            top: `${size * 0.2}px`,
            left: `${size * 0.2}px`,
          }}
        />

        {/* Двигатель и след от него */}
        <motion.div
          className="absolute bg-gradient-to-l from-transparent via-orange-500 to-red-500"
          style={{
            width: `${size * 3}px`,
            height: `${size * 0.3}px`,
            top: `${size * 0.35}px`,
            right: `${size * 0.8}px`,
            borderRadius: "2px",
            filter: "blur(2px)",
            opacity: 0.7,
          }}
          animate={{
            width: [`${size * 2}px`, `${size * 3}px`, `${size * 2}px`],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Космическая пыль/частицы
const SpaceDust = () => {
  const particles = 30;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Устанавливаем размеры canvas равными размерам окна
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Создаем частицы
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < particles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Анимируем частицы
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        // Обновляем позицию
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Возвращаем частицу в поле зрения, если она вышла за границы
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Рисуем частицу
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// Wormhole effect - визуальный эффект космической воронки
const Wormhole = () => {
  const [active, setActive] = useState(false);
  const size = 300; // Размер воронки
  const rings = 8; // Количество колец

  // Случайная позиция на экране
  const position = {
    top: Math.random() * 70 + 10,
    left: Math.random() * 70 + 15,
  };

  // Активируем воронку с задержкой для драматического эффекта
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, Math.random() * 5000 + 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.top}%`,
        left: `${position.left}%`,
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 0.8 : 0 }}
      transition={{ duration: 3 }}
    >
      {/* Кольца воронки */}
      {Array.from({ length: rings }).map((_, i) => {
        const ringSize = size * (1 - (i / rings) * 0.7);
        const rotationSpeed = 20 + i * 5;
        const depth = i * 30;

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border"
            style={{
              width: `${ringSize}px`,
              height: `${ringSize}px`,
              borderWidth: "1px",
              borderColor: `rgba(130, 170, 255, ${0.3 - i * 0.02})`,
              boxShadow: `0 0 ${5 + i * 2}px rgba(130, 170, 255, ${
                0.2 - i * 0.01
              })`,
              transform: `translate(-50%, -50%) translateZ(-${depth}px)`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.02, 1],
            }}
            transition={{
              rotate: {
                duration: rotationSpeed,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      {/* Центр воронки - яркое свечение */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full bg-blue-400"
        style={{
          width: `${size * 0.15}px`,
          height: `${size * 0.15}px`,
          transform: "translate(-50%, -50%)",
          filter: "blur(5px)",
          boxShadow: "0 0 20px 5px rgba(130, 170, 255, 0.7)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Частицы, втягивающиеся в воронку */}
      {active &&
        Array.from({ length: 15 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * size * 0.8 + size * 0.2;
          const particleSize = Math.random() * 3 + 1;
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 5;

          const startX = Math.cos(angle) * distance;
          const startY = Math.sin(angle) * distance;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full bg-white"
              style={{
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                x: startX,
                y: startY,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [1, 0],
                scale: [1, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeIn",
              }}
            />
          );
        })}
    </motion.div>
  );
};

export function SpaceBackground({ children }: SpaceBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [shootingStars, setShootingStars] = useState<React.ReactNode[]>([]);
  const [nebulae, setNebulae] = useState<React.ReactNode[]>([]);
  const [planets, setPlanets] = useState<React.ReactNode[]>([]);
  const [wormholes, setWormholes] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setMounted(true);

    // Генерация звезд
    const newStars = Array.from({ length: 100 }, (_, i) => (
      <Star key={`star-${i}`} delay={i * 0.05} size={Math.random() * 2 + 1} />
    ));
    setStars(newStars);

    // Генерация падающих звезд
    const newShootingStars = Array.from({ length: 5 }, (_, i) => (
      <ShootingStar key={`shooting-star-${i}`} />
    ));
    setShootingStars(newShootingStars);

    // Генерация туманностей
    const newNebulae = Array.from({ length: 3 }, (_, i) => (
      <Nebula key={`nebula-${i}`} />
    ));
    setNebulae(newNebulae);

    // Генерация планет (с меньшей вероятностью)
    if (Math.random() > 0.5) {
      const newPlanets = Array.from({ length: 1 }, (_, i) => (
        <Planet key={`planet-${i}`} />
      ));
      setPlanets(newPlanets);
    }

    // Добавление воронки с некоторой вероятностью
    if (Math.random() > 0.7) {
      setWormholes([<Wormhole key="wormhole" />]);
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-blue-950/80 to-purple-950/90">
      {/* Космическая пыль */}
      <SpaceDust />

      {/* Туманности */}
      {nebulae}

      {/* Звезды разных размеров */}
      {stars}

      {/* Падающие звезды */}
      {shootingStars}

      {/* Планеты */}
      {planets}

      {/* Космический корабль */}
      <Spaceship />

      {/* Воронки */}
      {wormholes}

      {/* Затемнение для лучшей читаемости контента */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 z-[1]" />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
