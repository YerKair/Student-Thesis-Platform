"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isClient, setIsClient] = useState(false);

  // Устанавливаем флаг, что мы на клиенте после монтирования
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Загрузка темы из localStorage при инициализации
  useEffect(() => {
    // Проверяем сначала localStorage
    const storedTheme = localStorage.getItem("app-theme") as Theme | null;

    // Если есть сохраненная тема, используем её
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
    // Иначе проверяем системные предпочтения
    else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  // При изменении темы обновляем атрибут на документе и сохраняем в localStorage
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("app-theme", theme);

      // Force apply theme class to body and document for compatibility with some components
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.body.classList.remove("light");

        // Принудительно устанавливаем стили для темной темы
        const headerElement = document.querySelector("header");
        if (headerElement) {
          headerElement.setAttribute(
            "style",
            "background-color: #121212 !important"
          );
        }

        // Устанавливаем стили для карточек и таблиц напрямую
        document.querySelectorAll('.card, [class*="Card"]').forEach((card) => {
          card.setAttribute(
            "style",
            "background-color: #1e1e1e !important; border-color: #383838 !important;"
          );
        });

        document.querySelectorAll("table").forEach((table) => {
          table.setAttribute("style", "background-color: #1e1e1e !important;");
        });

        document.querySelectorAll("tr").forEach((row) => {
          row.setAttribute(
            "style",
            "border-color: #383838 !important; background-color: #1e1e1e !important;"
          );
        });

        document.querySelectorAll("td, th").forEach((cell) => {
          cell.setAttribute(
            "style",
            "color: #e5e7eb !important; border-color: #383838 !important; background-color: #1e1e1e !important;"
          );
        });

        // Добавляем стили для специальных компонентов
        document
          .querySelectorAll('.badge, [class*="Badge"]')
          .forEach((badge) => {
            badge.setAttribute(
              "style",
              "background-color: #2c2c2c !important; color: #e5e7eb !important; border-color: #383838 !important;"
            );
          });

        // Добавляем стили для заголовков в карточках
        document.querySelectorAll('[class*="CardTitle"]').forEach((title) => {
          title.setAttribute("style", "color: white !important;");
        });

        document
          .querySelectorAll('[class*="CardDescription"]')
          .forEach((desc) => {
            desc.setAttribute("style", "color: #d1d5db !important;");
          });

        // Добавляем CSS-стили глобально для всей страницы
        const styleElement = document.createElement("style");
        styleElement.id = "custom-dark-theme-styles";
        styleElement.textContent = `
          body.dark .bg-white { background-color: #121212 !important; }
          body.dark table { background-color: #1e1e1e !important; }
          body.dark tr { background-color: #1e1e1e !important; border-color: #383838 !important; }
          body.dark th, body.dark td { color: #e5e7eb !important; background-color: #1e1e1e !important; }
          body.dark input, body.dark textarea, body.dark select { background-color: #2c2c2c !important; color: white !important; border-color: #383838 !important; }
          body.dark button[class*="outline"] { border-color: #383838 !important; color: #e5e7eb !important; background-color: #1e1e1e !important; }
          body.dark button[class*="outline"]:hover { background-color: #2c2c2c !important; }
          
          /* Все основные контейнеры */
          body.dark, html.dark, [data-theme="dark"], 
          body.dark div, body.dark section, body.dark main, 
          body.dark article, body.dark aside, body.dark nav {
            background-color: #121212 !important;
          }
          
          /* Темно-серый для карточек и интерактивных элементов */
          body.dark .card, body.dark [class*="Card"], 
          body.dark [role="dialog"], body.dark [class*="container"] {
            background-color: #1e1e1e !important;
            border-color: #383838 !important;
          }
        `;
        const existingStyle = document.getElementById(
          "custom-dark-theme-styles"
        );
        if (!existingStyle) {
          document.head.appendChild(styleElement);
        }
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.body.classList.add("light");

        // Принудительно устанавливаем стили для светлой темы
        const headerElement = document.querySelector("header");
        if (headerElement) {
          headerElement.setAttribute(
            "style",
            "background-color: #ffffff !important"
          );
        }

        // Сбрасываем все примененные стили
        document
          .querySelectorAll(
            '.card, [class*="Card"], table, tr, td, th, .badge, [class*="Badge"], [class*="CardTitle"], [class*="CardDescription"]'
          )
          .forEach((el) => {
            el.removeAttribute("style");
          });

        // Удаляем CSS-стили для темной темы
        const styleElement = document.getElementById(
          "custom-dark-theme-styles"
        );
        if (styleElement) {
          styleElement.remove();
        }
      }
    }
  }, [theme]);

  // Функция переключения темы
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  // Используем контент из скрипта инициализации, если мы не на клиенте
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Хук для использования темы
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
