"use client";

import { ProtectedRoute } from "@/features/auth/ui";
import { Header } from "@/widgets/header/ui/header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { SmoothTransition } from "@/shared/ui/smooth-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);
      if (smallScreen) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Добавляем небольшую задержку для плавной загрузки
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  const handleToggleSidebar = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  // Вычисляем ширину сайдбара
  const sidebarWidth = sidebarCollapsed ? 80 : 240;

  return (
    // <ProtectedRoute>
    // <SmoothTransition isVisible={isLoaded} duration={0.6}>
    <div className="min-h-screen flex flex-col bg-white">
      {/* Фиксированный хедер */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </div>

      {/* Сайдбар */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      {/* Контент с отступом */}
      <div
        className="flex-1 pt-16 transition-all duration-300"
        style={{
          marginLeft: `${sidebarWidth}px`,
        }}
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

        <main className="bg-white min-h-[calc(100vh-4rem)] p-4 w-full">
          {children}
        </main>
      </div>
    </div>
    // </SmoothTransition>
    // </ProtectedRoute>
  );
}
