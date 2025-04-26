import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";
import { ResponsiveContainer } from "./ResponsiveContainer";

export interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Main responsive layout component for page structure
 */
export function ResponsiveLayout({
  children,
  className,
}: ResponsiveLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {children}
    </div>
  );
}

export interface MainContentProps {
  children: ReactNode;
  className?: string;
  withContainer?: boolean;
  fullWidth?: boolean;
}

/**
 * Component for the main content area of the page with proper spacing and padding
 */
export function MainContent({
  children,
  className,
  withContainer = true,
  fullWidth = false,
}: MainContentProps) {
  if (withContainer) {
    return (
      <main className={cn("flex-1 py-4 xxs:py-5 xs:py-6 md:py-10", className)}>
        <ResponsiveContainer fullWidth={fullWidth}>
          {children}
        </ResponsiveContainer>
      </main>
    );
  }

  return <main className={cn("flex-1", className)}>{children}</main>;
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: string;
  collapsible?: boolean;
  mobileSidebarHeight?: string;
}

/**
 * Responsive sidebar layout that collapses to a mobile view on small screens
 */
export function SidebarLayout({
  children,
  sidebar,
  className,
  sidebarClassName,
  contentClassName,
  sidebarPosition = "left",
  sidebarWidth = "280px",
  collapsible = true,
  mobileSidebarHeight = "auto",
}: SidebarLayoutProps) {
  // Преобразуем sidebarWidth в CSS переменную без px, если она в px
  const widthValue = sidebarWidth.endsWith("px")
    ? sidebarWidth.slice(0, -2)
    : sidebarWidth;

  const sidebarWidthClass = `sdl:w-[${sidebarWidth}]`;

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col sdl:flex-row",
        className
      )}
    >
      <aside
        className={cn(
          "w-full border-b sdl:border-b-0 sdl:border-r",
          sidebarPosition === "right"
            ? "sdl:order-2 sdl:border-l sdl:border-r-0"
            : "sdl:order-1",
          // Изменено для фикса на мобильных
          mobileSidebarHeight !== "auto"
            ? `h-[${mobileSidebarHeight}]`
            : "max-h-[70vh]",
          "overflow-y-auto sdl:sticky sdl:top-16 sdl:h-[calc(100vh-4rem)] sdl:max-h-none",
          // Использование фиксированной ширины на десктопе
          sidebarWidthClass,
          sidebarClassName
        )}
      >
        {sidebar}
      </aside>
      <div
        className={cn(
          "flex-1 p-3 xxs:p-4 sdl:p-6 md:p-8",
          sidebarPosition === "right" ? "sdl:order-1" : "sdl:order-2",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
  className?: string;
}

/**
 * Responsive dashboard layout with header and sidebar
 */
export function DashboardLayout({
  children,
  sidebar,
  header,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      {header}
      <div className="flex flex-col sdl:flex-row">
        <aside className="w-full max-h-[70vh] overflow-y-auto border-b sdl:border-b-0 sdl:border-r sdl:w-60 md:w-64 lg:w-72 sdl:h-[calc(100vh-4rem)] sdl:max-h-none">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-x-hidden p-3 xxs:p-4 sdl:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
