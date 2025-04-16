"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // Функция должна выполниться только один раз при монтировании компонента
    return;
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
                return;
              }
              
              // Иначе используем системную тему
              document.documentElement.classList.add(systemTheme);
            } catch (e) {
              // Если что-то пошло не так, просто продолжаем
              console.error('Error setting theme:', e);
            }
          })();
        `,
      }}
    />
  );
}
