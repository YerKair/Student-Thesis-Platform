"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { cn } from "@/shared/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={cn(
        "h-9 w-9 rounded-full flex items-center justify-center transition-all bg-gray-50 dark:bg-gray-50 text-gray-600 dark:text-gray-600",
        className
      )}
      onClick={() => toggleTheme()}
      aria-label="Переключить тему"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] text-amber-500 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-primary rotate-0 scale-100 transition-all" />
      )}
    </button>
  );
}
