"use client";

import { cn } from "@/shared/lib/utils";
import { ReactNode, useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export interface MobileScreenWarningProps {
  children?: ReactNode;
  className?: string;
  maxWidth?: number;
  message?: string;
  dismissible?: boolean;
  persistent?: boolean;
}

/**
 * Компонент, который показывает предупреждение на очень узких экранах,
 * предлагая пользователю повернуть устройство или растянуть окно браузера
 */
export function MobileScreenWarning({
  children,
  className,
  maxWidth = 360,
  message = "Для лучшего отображения поверните устройство или увеличьте размер окна",
  dismissible = true,
  persistent = false,
}: MobileScreenWarningProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const storageKey = "mobile-warning-dismissed";
  const pathname = usePathname();

  // Определяем пути для которых нужно особое предупреждение
  const isNonAdaptivePath =
    pathname &&
    (pathname.includes("/dashboard/teams") ||
      pathname.includes("/dashboard/thesis"));

  // Проверяем, принадлежит ли путь к дашборду
  const isDashboardPath = pathname && pathname.startsWith("/dashboard");

  // Не показываем предупреждение для страниц дашборда, кроме страниц команды и дипломной работы
  const shouldShowWarning = !isDashboardPath || isNonAdaptivePath;

  useEffect(() => {
    // Проверяем, было ли предупреждение закрыто ранее
    if (!persistent && localStorage.getItem(storageKey) === "true") {
      setIsDismissed(true);
    }

    const checkWidth = () => {
      // Используем разные пороги для разных страниц
      const thresholdWidth = isNonAdaptivePath ? 800 : maxWidth;

      if (
        window.innerWidth <= thresholdWidth &&
        !isDismissed &&
        shouldShowWarning
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Проверяем ширину при монтировании
    checkWidth();

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [maxWidth, isDismissed, persistent, isNonAdaptivePath, shouldShowWarning]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);

    // Если предупреждение не должно показываться снова, сохраняем это в localStorage
    if (!persistent) {
      localStorage.setItem(storageKey, "true");
    }
  };

  if (!isVisible) {
    return null;
  }

  // Разные сообщения для разных страниц
  const displayMessage = isNonAdaptivePath
    ? "Эта страница не полностью адаптирована для экранов меньше 800px. Для лучшего отображения используйте устройство с большим экраном."
    : message;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-3 bg-warning text-warning-foreground text-sm text-center shadow-md",
        "safe-area-bottom",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">{displayMessage}</div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 rounded-full hover:bg-warning-foreground/10"
            aria-label="Закрыть предупреждение"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
