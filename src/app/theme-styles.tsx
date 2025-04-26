"use client";

export function ThemeStyles() {
  return (
    <style jsx global>{`
      /* Предотвращение мигания темы */
      html {
        visibility: visible;
        transition: background-color 0.2s ease;
      }

      /* Стили для светлой темы (по умолчанию) - БЕЛАЯ */
      :root {
        --background: #ffffff;
        --foreground: #171717;
        --primary: #2563eb;
        --primary-light: #60a5fa;
        --border-color: #e5e7eb;
        --card-bg: #ffffff;
        --hover-bg: #f9fafb;
        --text-primary: #171717;
        --text-secondary: #4b5563;
        --text-tertiary: #6b7280;
      }

      html.light,
      body.light,
      [data-theme="light"] {
        background-color: #ffffff !important;
        color: #171717 !important;
      }

      html.light header,
      body.light header,
      [data-theme="light"] header,
      body:not([data-theme="dark"]) header,
      html:not([data-theme="dark"]) header {
        background-color: #ffffff !important;
        border-color: #e5e7eb !important;
      }

      /* Переопределение для хедера в светлой теме */
      body:not([data-theme="dark"]) header {
        background-color: #ffffff !important;
      }

      /* Светлая тема - основные элементы */
      body:not([data-theme="dark"]) {
        background-color: #ffffff;
      }

      body:not([data-theme="dark"]) main,
      html.light main {
        background-color: #ffffff !important;
      }

      body:not([data-theme="dark"]) aside,
      html.light aside {
        background-color: #ffffff !important;
      }

      body:not([data-theme="dark"]) .card,
      body:not([data-theme="dark"]) [class*="Card"],
      body:not([data-theme="dark"]) .bg-white,
      html.light .card,
      html.light [class*="Card"],
      html.light .bg-white {
        background-color: #ffffff !important;
      }

      body:not([data-theme="dark"]) .border,
      html.light .border {
        border-color: #e5e7eb !important;
      }

      /* ТЕМНО-СИНЯЯ ТЕМА */
      [data-theme="dark"] {
        --background: #0a1929;
        --foreground: #ffffff;
        --primary: #4d84ff;
        --primary-dark: #1a56db;
        --primary-light: #93c5fd;
        --border-color: #193354;
        --card-bg: #102a43;
        --hover-bg: #193354;
        --text-primary: #ffffff;
        --text-secondary: #a3c0e6;
        --text-tertiary: #748fb8;
        color-scheme: dark;
      }

      /* Фоны и контейнеры для темной темы */
      [data-theme="dark"] {
        background-color: #0a1929 !important;
        color: #ffffff !important;
      }

      [data-theme="dark"] .bg-white,
      [data-theme="dark"] header,
      [data-theme="dark"] aside,
      [data-theme="dark"] .bg-gradient-to-b {
        background-color: #102a43 !important;
      }

      [data-theme="dark"] .border,
      [data-theme="dark"] header,
      [data-theme="dark"] aside,
      [data-theme="dark"] .border-blue-100 {
        border-color: #193354 !important;
      }

      /* Улучшенные текстовые стили для темной темы */
      [data-theme="dark"] aside button,
      [data-theme="dark"] p.text-sm.font-medium,
      [data-theme="dark"] .text-base.font-medium,
      [data-theme="dark"] .text-black,
      [data-theme="dark"] aside a,
      [data-theme="dark"] aside span,
      [data-theme="dark"] .text-sm,
      [data-theme="dark"] .text-xs {
        color: #a3c0e6 !important;
      }

      /* Делаем основной текст белым */
      [data-theme="dark"] .font-medium,
      [data-theme="dark"] .font-bold,
      [data-theme="dark"] h1,
      [data-theme="dark"] h2,
      [data-theme="dark"] h3,
      [data-theme="dark"] h4,
      [data-theme="dark"] p {
        color: #ffffff !important;
      }

      /* Карточки и фоны с улучшенными эффектами для темной темы */
      [data-theme="dark"] aside a:hover:not(.bg-blue-50),
      [data-theme="dark"] .hover\\:bg-white:hover,
      [data-theme="dark"] .data-\\[state\\="active\\"]:bg-white {
        background-color: #193354 !important;
      }

      /* Исправления для диалоговых окон */
      [data-theme="dark"] .DialogContent,
      [data-theme="dark"] [class*="DialogContent"],
      [data-theme="dark"] div[role="dialog"] {
        background-color: #102a43 !important;
        border-color: #193354 !important;
      }

      /* Исправления для TabsList и TabsTrigger */
      [data-theme="dark"] [role="tabslist"] {
        background-color: #102a43 !important;
      }

      [data-theme="dark"] [role="tab"][data-state="active"] {
        background-color: #193354 !important;
        color: #ffffff !important;
      }

      /* Исправления для ввода */
      [data-theme="dark"] input,
      [data-theme="dark"] select,
      [data-theme="dark"] textarea {
        background-color: #0a1929 !important;
        color: #ffffff !important;
        border-color: #193354 !important;
      }

      /* Исправления для бейджей */
      [data-theme="dark"] .badge {
        background-color: #193354 !important;
      }

      /* Исправление наведения */
      [data-theme="dark"] *:hover {
        background-color: #234978 !important;
      }

      /* Фон модального окна */
      [data-theme="dark"] .fixed.inset-0.z-50 {
        background-color: rgba(10, 25, 41, 0.7) !important;
      }

      /* Плавные переходы для всех элементов */
      * {
        transition-property: background-color, border-color, color, fill, stroke,
          opacity, box-shadow, transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }

      /* Специальные элементы с более длительной анимацией */
      body,
      .bg-white,
      .text-black,
      .border,
      header,
      aside,
      input,
      select,
      textarea,
      .bg-gradient-to-b,
      .shadow-sm,
      .shadow-lg {
        transition: all 0.3s ease;
      }
    `}</style>
  );
}
