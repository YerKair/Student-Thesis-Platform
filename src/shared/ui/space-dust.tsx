"use client";

import { useEffect, useRef } from "react";

interface SpaceDustProps {
  particleCount?: number;
  color?: string;
  speed?: number;
  opacity?: number;
}

export function SpaceDust({
  particleCount = 50,
  color = "#ffffff",
  speed = 0.5,
  opacity = 0.3,
}: SpaceDustProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Массив частиц
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Настройка размера холста
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Пересоздаем частицы при изменении размера
      createParticles();
    };

    // Создание частиц
    const createParticles = () => {
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * opacity,
        });
      }
    };

    // Анимация частиц
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Обновление позиции
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Возвращаем частицы в поле зрения, если они вышли за пределы
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Рисуем частицу
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color
          .replace(")", `, ${particle.opacity})`)
          .replace("rgb", "rgba");
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    // Инициализация
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [particleCount, color, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
