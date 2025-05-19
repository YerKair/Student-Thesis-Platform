import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names together
 * and merge Tailwind CSS classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Breakpoint size constants that match the Tailwind config
 */
export const breakpoints = {
  xxs: 360,
  xs: 480,
  sm: 640,
  md: 768,
  sdl: 800,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Utility function to create responsive classes with a mobile-first approach
 * @param base Base class applied for all screen sizes
 * @param responsive Object mapping breakpoints to classes
 */
export function responsive(
  base: string,
  responsive: Partial<Record<Breakpoint, string>>
) {
  const classes = [base];

  for (const [breakpoint, value] of Object.entries(responsive) as [
    Breakpoint,
    string
  ][]) {
    classes.push(`${breakpoint}:${value}`);
  }

  return classes.join(" ");
}

/**
 * Проверка, является ли устройство маленьким экраном
 * @returns Возвращает true, если ширина экрана меньше 800px
 */
export function isSmallDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < breakpoints.sdl;
}
