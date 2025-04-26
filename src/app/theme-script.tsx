"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // Определяем цвета темно-синей темы - усиленные синие оттенки
    const darkBlueTheme = {
      background: "#0a1929", // Глубокий темно-синий фон
      cardBg: "#102a43", // Чуть светлее для карточек
      border: "#193354", // Синяя граница
      activeElementBg: "#234978", // Активный элемент - синий
      hoverElementBg: "#173050", // Hover - синий
      textPrimary: "#ffffff",
      textSecondary: "#a3c0e6", // Светло-синий для вторичного текста
      textTertiary: "#748fb8", // Более приглушенный синий для третичного текста
      accent: "#4d84ff", // Синий акцент
      accentLight: "#93c5fd", // Светло-синий акцент
    };

    // Функция применяет стили для темно-синей темы
    const applyDarkModeStyles = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");

      if (isDarkMode) {
        // Добавляем CSS-стили глобально для всей страницы
        const styleElement = document.createElement("style");
        styleElement.id = "custom-dark-theme-styles";
        styleElement.textContent = `
          /* Переменные темно-синей темы */
          body.dark, 
          html.dark,
          [data-theme="dark"] {
            --bg-primary: ${darkBlueTheme.background};
            --bg-secondary: ${darkBlueTheme.cardBg};
            --border-color: ${darkBlueTheme.border};
            --active-bg: ${darkBlueTheme.activeElementBg};
            --hover-bg: ${darkBlueTheme.hoverElementBg};
            --text-primary: ${darkBlueTheme.textPrimary};
            --text-secondary: ${darkBlueTheme.textSecondary};
            --text-tertiary: ${darkBlueTheme.textTertiary};
            --accent: ${darkBlueTheme.accent};
            --accent-light: ${darkBlueTheme.accentLight};
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
          }

          /* ПЕРЕОПРЕДЕЛЕНИЕ ВСЕХ СЕРЫХ ЦВЕТОВ НА СИНИЕ */
          
          /* Переназначаем классы Tailwind для серых цветов на синие */
          body.dark .bg-gray-50,
          body.dark .bg-gray-100,
          body.dark .bg-gray-200,
          body.dark .bg-gray-300,
          body.dark .bg-gray-400,
          body.dark .bg-gray-500,
          body.dark .bg-gray-600,
          body.dark .bg-gray-700,
          body.dark .bg-gray-800,
          body.dark .bg-gray-900,
          body.dark .dark\\:bg-gray-50,
          body.dark .dark\\:bg-gray-100,
          body.dark .dark\\:bg-gray-200,
          body.dark .dark\\:bg-gray-300,
          body.dark .dark\\:bg-gray-400,
          body.dark .dark\\:bg-gray-500,
          body.dark .dark\\:bg-gray-600,
          body.dark .dark\\:bg-gray-700,
          body.dark .dark\\:bg-gray-800,
          body.dark .dark\\:bg-gray-900 {
            background-color: var(--bg-primary) !important;
          }
          
          /* Для элементов с высокой вложенностью принудительно устанавливаем синий фон */
          body.dark [class*="bg-gray"] {
            background-color: var(--bg-primary) !important;
          }
          
          /* Переназначаем цвета текста */
          body.dark .text-gray-50,
          body.dark .text-gray-100,
          body.dark .text-gray-200,
          body.dark .text-gray-300,
          body.dark .text-gray-400,
          body.dark .text-gray-500,
          body.dark .text-gray-600,
          body.dark .text-gray-700,
          body.dark .text-gray-800,
          body.dark .text-gray-900,
          body.dark .dark\\:text-gray-50,
          body.dark .dark\\:text-gray-100,
          body.dark .dark\\:text-gray-200,
          body.dark .dark\\:text-gray-300,
          body.dark .dark\\:text-gray-400,
          body.dark .dark\\:text-gray-500,
          body.dark .dark\\:text-gray-600,
          body.dark .dark\\:text-gray-700,
          body.dark .dark\\:text-gray-800,
          body.dark .dark\\:text-gray-900 {
            color: var(--text-secondary) !important;
          }
          
          /* Для границ */
          body.dark .border-gray-50,
          body.dark .border-gray-100,
          body.dark .border-gray-200,
          body.dark .border-gray-300,
          body.dark .border-gray-400,
          body.dark .border-gray-500,
          body.dark .border-gray-600,
          body.dark .border-gray-700,
          body.dark .border-gray-800,
          body.dark .border-gray-900,
          body.dark .dark\\:border-gray-50,
          body.dark .dark\\:border-gray-100,
          body.dark .dark\\:border-gray-200,
          body.dark .dark\\:border-gray-300,
          body.dark .dark\\:border-gray-400,
          body.dark .dark\\:border-gray-500,
          body.dark .dark\\:border-gray-600,
          body.dark .dark\\:border-gray-700,
          body.dark .dark\\:border-gray-800,
          body.dark .dark\\:border-gray-900 {
            border-color: var(--border-color) !important;
          }

          /* Базовые элементы */
          body.dark div, 
          body.dark section, 
          body.dark main, 
          body.dark article, 
          body.dark aside,
          body.dark [class*="Content"],
          body.dark [class*="container"] {
            background-color: var(--bg-primary) !important;
          }

          /* Удаление классов темной темы в базовых компонентах */
          body.dark .dark\\:bg-gray-700,
          body.dark .dark\\:bg-gray-800, 
          body.dark .dark\\:bg-gray-900,
          body.dark .dark\\:border-gray-700,
          body.dark .dark\\:border-gray-800,
          body.dark .dark\\:text-gray-200,
          body.dark .dark\\:text-gray-300,
          body.dark .dark\\:text-gray-400,
          body.dark .dark\\:placeholder\\:text-gray-500 {
            background-color: var(--bg-primary) !important;
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
          }

          /* Стандартные классы фонов */
          body.dark .bg-white,
          body.dark .bg-gray-50,
          body.dark .bg-gray-100,
          body.dark .bg-gray-200,
          body.dark [class*="bg-white"],
          body.dark [class*="bg-gray"],
          body.dark [class*="TabsContent"] {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
          }
          
          /* Карточки и контейнеры */
          body.dark .card,
          body.dark [class*="Card"],
          body.dark [class*="-card"],
          body.dark [data-card],
          body.dark [role="dialog"],
          body.dark header, 
          body.dark nav,
          body.dark [class*="Header"] {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
          }
          
          /* Таблицы */
          body.dark table,
          body.dark tbody,
          body.dark thead {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark tr {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark th, 
          body.dark td {
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
            background-color: var(--bg-secondary) !important;
          }
          
          /* Текстовые элементы и заголовки */
          body.dark h1, 
          body.dark h2, 
          body.dark h3, 
          body.dark h4, 
          body.dark h5, 
          body.dark h6, 
          body.dark [class*="Title"],
          body.dark .text-black,
          body.dark .dark\\:text-white {
            color: var(--text-primary) !important;
          }
          
          body.dark p, 
          body.dark span:not(.text-white):not(.text-black), 
          body.dark label,
          body.dark [class*="Description"],
          body.dark [class*="-text"],
          body.dark .text-gray-500,
          body.dark .text-gray-600,
          body.dark .text-gray-700 {
            color: var(--text-secondary) !important;
          }
          
          /* Формы и элементы ввода */
          body.dark input, 
          body.dark textarea, 
          body.dark select {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }

          body.dark input::placeholder,
          body.dark textarea::placeholder,
          body.dark select::placeholder {
            color: var(--text-tertiary) !important;
          }
          
          /* Кнопки */
          body.dark button {
            border-color: var(--border-color) !important;
          }
          
          body.dark button[class*="outline"] {
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
            background-color: var(--bg-secondary) !important;
          }
          
          /* Бейджи */
          body.dark .badge, 
          body.dark [class*="Badge"] {
            background-color: var(--bg-secondary) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }
          
          /* Тени */
          body.dark [class*="shadow"] {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2) !important;
          }
          
          /* Tabs - вкладки */
          body.dark [role="tablist"] {
            background-color: var(--bg-secondary) !important;
          }
          
          body.dark [role="tab"] {
            color: var(--text-secondary) !important;
            background-color: transparent !important;
          }
          
          body.dark [role="tab"][data-state="active"] {
            background-color: var(--active-bg) !important;
            color: var(--text-primary) !important;
          }
          
          body.dark [role="tabpanel"] {
            background-color: var(--bg-primary) !important;
          }
          
          /* Ссылки */
          body.dark a {
            color: var(--accent-light) !important;
          }
          
          /* Модальные окна и диалоги */
          body.dark .DialogOverlay,
          body.dark [class*="DialogOverlay"],
          body.dark .fixed.inset-0.z-50.bg-black\\/50 {
            background-color: rgba(10, 25, 41, 0.7) !important;
          }
          
          body.dark .DialogContent,
          body.dark [class*="DialogContent"],
          body.dark [class*="Dialog"][class*="Content"] {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark .DialogTitle,
          body.dark [class*="DialogTitle"] {
            color: var(--text-primary) !important;
          }
          
          body.dark .DialogDescription,
          body.dark [class*="DialogDescription"] {
            color: var(--text-secondary) !important;
          }
          
          /* Акцентные цвета (голубой/синий) */
          body.dark .text-blue-500,
          body.dark .text-blue-600,
          body.dark .text-blue-700 {
            color: var(--accent-light) !important;
          }
          
          body.dark .bg-blue-500,
          body.dark .bg-blue-600 {
            background-color: var(--accent) !important;
          }
          
          body.dark .border-blue-500,
          body.dark .border-blue-600 {
            border-color: var(--accent) !important;
          }

          /* Активная вкладка в TabList */
          body.dark [data-state="active"] {
            background-color: var(--active-bg) !important;
          }

          /* ПРАВИЛА ДЛЯ HOVER-ЭФФЕКТОВ */
          
          /* Базовое правило для блокировки нежелательных эффектов */
          body.dark *:hover {
            box-shadow: none !important;
            text-decoration: none !important;
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }
          
          /* Отключаем все hover-эффекты для вложенных элементов */
          body.dark *:hover * {
            background-color: inherit !important;
            color: inherit !important;
            border-color: inherit !important;
          }
          
          /* Интерактивные элементы */
          body.dark button:hover:not(:disabled),
          body.dark [role="button"]:hover,
          body.dark [type="button"]:hover,
          body.dark [type="submit"]:hover,
          body.dark [class*="button"]:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
          }
          
          /* Ссылки в навигации */
          body.dark nav a:hover,
          body.dark header a:hover,
          body.dark aside a:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
          }
          
          /* Навигационные элементы */
          body.dark .nav-item:hover,
          body.dark [role="menuitem"]:hover {
            background-color: var(--hover-bg) !important;
          }
          
          /* Табличные строки */
          body.dark tr:hover {
            background-color: var(--hover-bg) !important;
          }
          
          /* Устанавливаем background-color для ячеек с помощью класса */
          body.dark tr.custom-hover-active > td {
            background-color: var(--hover-bg) !important;
          }

          /* Только прямые ссылки */
          body.dark a:hover > * {
            background-color: transparent !important;
          }
          
          /* Блокируем hover-эффекты для классов Tailwind */
          body.dark .hover\\:bg-gray-100:hover,
          body.dark .hover\\:bg-gray-200:hover,
          body.dark .hover\\:bg-gray-50:hover,
          body.dark .hover\\:text-gray-900:hover,
          body.dark .hover\\:text-gray-800:hover,
          body.dark .hover\\:border-gray-300:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }
        `;

        const existingStyle = document.getElementById(
          "custom-dark-theme-styles"
        );
        if (existingStyle) {
          existingStyle.remove();
        }
        document.head.appendChild(styleElement);

        // Принудительно устанавливаем фон страницы синим
        document.body.style.backgroundColor = darkBlueTheme.background;
        document.documentElement.style.backgroundColor =
          darkBlueTheme.background;

        // Перекрашиваем важные элементы
        const applyStyles = () => {
          // Обрабатываем хедеры и карточки
          document
            .querySelectorAll('header, [role="dialog"], .card, [class*="Card"]')
            .forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.backgroundColor = darkBlueTheme.cardBg;
                el.style.borderColor = darkBlueTheme.border;
              }
            });

          // Отдельно обрабатываем диалоги
          document
            .querySelectorAll('.DialogContent, [class*="DialogContent"]')
            .forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.backgroundColor = darkBlueTheme.cardBg;
                el.style.borderColor = darkBlueTheme.border;
              }
            });

          // Переопределяем все серые фоны на синие
          document
            .querySelectorAll(
              '[class*="bg-gray"], .bg-gray-50, .bg-gray-100, .bg-gray-200, .bg-gray-300, .bg-gray-400, .bg-gray-500, .bg-gray-600, .bg-gray-700, .bg-gray-800, .bg-gray-900'
            )
            .forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.backgroundColor = darkBlueTheme.background;
              }
            });

          // Используем класс для hover-эффекта в таблицах
          document.querySelectorAll("tr").forEach((row) => {
            // Удаляем предыдущие обработчики
            const oldMouseEnter = row.onmouseenter;
            const oldMouseLeave = row.onmouseleave;
            if (oldMouseEnter)
              row.removeEventListener("mouseenter", oldMouseEnter);
            if (oldMouseLeave)
              row.removeEventListener("mouseleave", oldMouseLeave);

            // Добавляем новые обработчики
            row.addEventListener("mouseenter", function () {
              if (!document.documentElement.classList.contains("dark")) return;
              this.classList.add("custom-hover-active");
            });

            row.addEventListener("mouseleave", function () {
              if (!document.documentElement.classList.contains("dark")) return;
              this.classList.remove("custom-hover-active");
            });
          });

          // Принудительно удаляем все изображения с цветовыми переходами и фонами
          document
            .querySelectorAll(
              "div[style*='background-image'], div[style*='gradient']"
            )
            .forEach((el) => {
              if (el instanceof HTMLElement) {
                if (
                  el.style.backgroundImage &&
                  (el.style.backgroundImage.includes("linear-gradient") ||
                    el.style.backgroundImage.includes("radial-gradient"))
                ) {
                  el.style.backgroundImage = "none";
                  el.style.backgroundColor = darkBlueTheme.background;
                }
              }
            });
        };

        // Применяем стили сразу и через небольшие интервалы, чтобы поймать все элементы
        applyStyles();
        setTimeout(applyStyles, 50);
        setTimeout(applyStyles, 200);
        setTimeout(applyStyles, 500);
      } else {
        // Удаляем CSS-стили для темной темы
        const styleElement = document.getElementById(
          "custom-dark-theme-styles"
        );
        if (styleElement) {
          styleElement.remove();
        }

        // Сбрасываем цвета фона
        document.body.style.backgroundColor = "";
        document.documentElement.style.backgroundColor = "";

        // Сбрасываем стили всех элементов
        document
          .querySelectorAll(
            '[style*="background-color"], [style*="border-color"], .custom-hover-active'
          )
          .forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.backgroundColor = "";
              el.style.borderColor = "";
              el.classList.remove("custom-hover-active");
            }
          });

        // Удаляем обработчики событий для таблиц
        document.querySelectorAll("tr").forEach((row) => {
          const oldMouseEnter = row.onmouseenter;
          const oldMouseLeave = row.onmouseleave;
          if (oldMouseEnter)
            row.removeEventListener("mouseenter", oldMouseEnter);
          if (oldMouseLeave)
            row.removeEventListener("mouseleave", oldMouseLeave);
        });
      }
    };

    // Запускаем применение темы сразу
    applyDarkModeStyles();

    // Наблюдаем за изменением класса темы
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          applyDarkModeStyles();
        }
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      themeObserver.disconnect();
    };
  }, []);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const storageKey = 'theme';
              const theme = localStorage.getItem(storageKey);
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              
              // Если тема есть в localStorage, используем её
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.classList.add(theme);
                document.body.classList.add(theme);
                
                // Устанавливаем правильный фон сразу для темной темы
                if (theme === 'dark') {
                  document.body.style.backgroundColor = '#0a1929';
                  document.documentElement.style.backgroundColor = '#0a1929';
                }
                
                return;
              }
              
              // Иначе используем системную тему
              document.documentElement.classList.add(systemTheme);
              document.body.classList.add(systemTheme);
              
              // Устанавливаем правильный фон сразу для темной темы
              if (systemTheme === 'dark') {
                document.body.style.backgroundColor = '#0a1929';
                document.documentElement.style.backgroundColor = '#0a1929';
              }
            } catch (e) {
              console.error('Error setting theme:', e);
            }
          })();
        `,
      }}
    />
  );
}
