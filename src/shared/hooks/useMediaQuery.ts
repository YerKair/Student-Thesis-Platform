import { useState, useEffect } from "react";
import { breakpoints, type Breakpoint } from "@/shared/lib/utils";

/**
 * Custom hook to check if a media query matches
 * @param query Media query string to check
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

/**
 * Hook to check if the current viewport is smaller than a given breakpoint
 * @param breakpoint The breakpoint to check against
 * @returns Boolean indicating if the viewport is smaller than the breakpoint
 */
export function useIsSmallerThan(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(max-width: ${breakpoints[breakpoint] - 0.1}px)`);
}

/**
 * Hook to check if the current viewport is larger than a given breakpoint
 * @param breakpoint The breakpoint to check against
 * @returns Boolean indicating if the viewport is larger than the breakpoint
 */
export function useIsLargerThan(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
}

/**
 * Hook to get the current responsive breakpoint
 * @returns The current breakpoint or 'xs' if smaller than all defined breakpoints
 */
export function useCurrentBreakpoint(): Breakpoint {
  const isXs = useMediaQuery(`(min-width: ${breakpoints.xs}px)`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  const is2Xl = useMediaQuery(`(min-width: ${breakpoints["2xl"]}px)`);

  if (is2Xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  if (isXs) return "xs";
  return "xs"; // Default to xs if smaller than all breakpoints
}
