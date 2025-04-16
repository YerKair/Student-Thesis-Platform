import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/shared/ui/toaster";
import { ThemeStyles } from "./theme-styles";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Платформа для дипломных работ",
  description:
    "Система для цифрового сопровождения студентов при выполнении дипломных работ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Скрипт для предотвращения мигания темы при загрузке страницы
  const themeInitScript = `
    (function() {
      try {
        const theme = localStorage.getItem('app-theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (theme === 'dark' || (!theme && !prefersLight)) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (e) {
        console.error('Error applying theme:', e);
      }
    })()
  `;

  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeStyles />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
