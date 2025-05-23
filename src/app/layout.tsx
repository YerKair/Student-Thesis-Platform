import "@/app/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/providers/auth-provider";
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
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${inter.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/10 mobile-container`}
      >
        <AuthProvider>
          <MobileScreenWarning persistent={false} maxWidth={480} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
