import { useState, useEffect } from "react";

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Хук для отслеживания размеров viewport и определения типа устройства
 * @returns Объект с размерами viewport и флагами типа устройства
 */
export function useViewportSize(): ViewportSize {
  // Значения по умолчанию для SSR
  const [size, setSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Обновляем состояние при первом рендере на клиенте
    const updateSize = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Устанавливаем начальное значение
    updateSize();

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", updateSize);

    // Очищаем слушатель при размонтировании
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

/**
 * Хук для определения максимальной безопасной высоты содержимого на мобильных устройствах
 * Учитывает высоту адресной строки и навигационных панелей мобильных браузеров
 * @returns Безопасная высота в пикселях
 */
export function useSafeAreaHeight(): number {
  const { height } = useViewportSize();
  const [safeHeight, setSafeHeight] = useState(0);

  useEffect(() => {
    if (height === 0) return;

    // Рассчитываем безопасную высоту, учитывая панели мобильных браузеров
    // Обычно нижняя панель на мобильных браузерах занимает около 10% высоты экрана
    const calculatedHeight = Math.floor(height * 0.9);
    setSafeHeight(calculatedHeight);

    // Обновляем при каждом изменении размера окна
    const updateHeight = () => {
      const calculatedHeight = Math.floor(window.innerHeight * 0.9);
      setSafeHeight(calculatedHeight);
    };

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [height]);

  return safeHeight;
}
