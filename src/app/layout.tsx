import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeInitScript } from "@/app/theme-init-script";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { ThemeStyles } from "@/app/theme-styles";
import { AuthProvider } from "@/app/providers/auth-provider";
import { ThemeScript } from "@/app/theme-script";
import { MobileScreenWarning } from "@/shared/ui/feedback/MobileScreenWarning";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Student Thesis Platform",
  description: "Platform for managing student theses",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0a"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <ThemeInitScript />
        <ThemeStyles />
      </head>
      <body
        className={`${inter.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/10 mobile-container dark:bg-[#121212]`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider>
            <ThemeScript />
            <MobileScreenWarning persistent={false} maxWidth={480} />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
