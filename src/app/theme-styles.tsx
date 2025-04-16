"use client";

export function ThemeStyles() {
  return (
    <style jsx global>{`
      /* Стили для светлой темы (по умолчанию) */
      :root {
        --background: #ffffff;
        --foreground: #171717;
      }

      /* Стили для темной темы */
      [data-theme="dark"] {
        --background: #0a0a0a;
        --foreground: #ededed;
      }

      /* Дополнительные стили для темной темы */
      [data-theme="dark"] .bg-white,
      [data-theme="dark"] header,
      [data-theme="dark"] aside {
        background-color: #0a0a0a !important;
      }

      [data-theme="dark"] .border-gray-200,
      [data-theme="dark"] header,
      [data-theme="dark"] aside {
        border-color: #333 !important;
      }

      [data-theme="dark"] .text-gray-600,
      [data-theme="dark"] .text-gray-700,
      [data-theme="dark"] .text-gray-800,
      [data-theme="dark"] .text-gray-900,
      [data-theme="dark"] aside button,
      [data-theme="dark"] p.text-sm.font-medium.text-gray-900 {
        color: #e0e0e0 !important;
      }

      [data-theme="dark"] .text-gray-400,
      [data-theme="dark"] .text-gray-500,
      [data-theme="dark"] aside a.text-gray-500,
      [data-theme="dark"] aside span.text-gray-500 {
        color: #a0a0a0 !important;
      }

      [data-theme="dark"] .bg-gray-100,
      [data-theme="dark"] aside a:hover:not(.bg-blue-50) {
        background-color: #222 !important;
      }

      [data-theme="dark"] .hover\:text-gray-900:hover,
      [data-theme="dark"] aside a:hover .text-gray-500 {
        color: #e0e0e0 !important;
      }

      [data-theme="dark"] .bg-blue-50,
      [data-theme="dark"] aside a.bg-blue-50,
      [data-theme="dark"] aside .bg-blue-50 {
        background-color: rgba(59, 130, 246, 0.15) !important;
      }

      [data-theme="dark"] .bg-blue-100,
      [data-theme="dark"] aside .bg-blue-100,
      [data-theme="dark"] aside span.bg-blue-100 {
        background-color: rgba(59, 130, 246, 0.25) !important;
      }

      [data-theme="dark"] .text-blue-600,
      [data-theme="dark"] aside .text-blue-600 {
        color: #60a5fa !important;
      }

      /* Улучшение контраста для кнопок в темной теме */
      [data-theme="dark"] button:hover {
        opacity: 0.9;
      }

      /* Плавный переход для анимации смены темы */
      body,
      .bg-white,
      .bg-gray-100,
      .bg-blue-50,
      .bg-blue-100,
      .text-gray-400,
      .text-gray-500,
      .text-gray-600,
      .text-gray-700,
      .text-gray-800,
      .text-gray-900,
      .text-blue-600,
      .border-gray-200,
      header,
      aside {
        transition: all 0.3s ease;
      }
    `}</style>
  );
}
