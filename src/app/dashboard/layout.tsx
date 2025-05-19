"use client";

import { ProtectedRoute } from "@/features/auth/ui";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    // Проверяем размер экрана при монтировании
    const checkScreenSize = () => {
      const smallScreen = window.innerWidth < 800;
      setIsSmallScreen(smallScreen);

      // Автоматически сворачиваем сайдбар на малых экранах
      if (smallScreen) {
        setSidebarCollapsed(true);
      }
    };

    // Вызываем сразу
    checkScreenSize();

    // Добавляем слушатель для отслеживания изменения размера окна
    window.addEventListener("resize", checkScreenSize);

    // Очистка слушателя
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Обработчик переключения сайдбара с проверкой размера экрана
  const handleToggleSidebar = (collapsed: boolean) => {
    // На малых экранах не даем развернуть сайдбар
    if (isSmallScreen && !collapsed) {
      return;
    }
    setSidebarCollapsed(collapsed);
  };

  // Вычисляем ширину сайдбара
  const sidebarWidth = sidebarCollapsed ? 80 : 256; // 80px (5rem) или 256px (16rem)

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] light:bg-white transition-colors">
        {/* Фиксированный хедер */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <Header />
        </div>

        {/* Сайдбар */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

        {/* Контент с отступом */}
        <div
          className="flex-1 pt-16 transition-all duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          {/* Кнопка мобильного меню */}
          {isSmallScreen && (
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
              aria-label="Открыть меню"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Мобильный сайдбар (отдельный компонент) */}
          {isSmallScreen && showMobileSidebar && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
              <Sidebar
                isMobile={true}
                onClose={() => setShowMobileSidebar(false)}
              />
            </div>
          )}

          <main className="bg-white dark:bg-[#0a0a0a] light:bg-white min-h-[calc(100vh-4rem)] p-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
