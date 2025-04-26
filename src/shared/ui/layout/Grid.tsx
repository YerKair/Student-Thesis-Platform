import { cn } from "@/shared/lib/utils";
import { type ReactNode } from "react";

export interface GridProps {
  children: ReactNode;
  className?: string;
  cols?:
    | number
    | { default: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | { x?: number; y?: number };
  as?: React.ElementType;
}

/**
 * A responsive grid component that supports different column counts at different breakpoints
 */
export function Grid({
  children,
  className,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = { x: 4, y: 6 },
  as: Component = "div",
}: GridProps) {
  const colsClasses =
    typeof cols === "number"
      ? `grid-cols-${cols}`
      : [
          `grid-cols-${cols.default}`,
          cols.sm && `sm:grid-cols-${cols.sm}`,
          cols.md && `md:grid-cols-${cols.md}`,
          cols.lg && `lg:grid-cols-${cols.lg}`,
          cols.xl && `xl:grid-cols-${cols.xl}`,
        ]
          .filter(Boolean)
          .join(" ");

  const gapClasses =
    typeof gap === "number"
      ? `gap-${gap}`
      : `gap-x-${gap.x ?? 4} gap-y-${gap.y ?? 6}`;

  return (
    <Component className={cn("grid", colsClasses, gapClasses, className)}>
      {children}
    </Component>
  );
}

export interface ResponsiveStackProps {
  children: ReactNode;
  className?: string;
  horizontal?: boolean;
  gap?: number;
  reverseOnMobile?: boolean;
  as?: React.ElementType;
}

/**
 * A responsive stack component that can change direction based on screen size
 */
export function ResponsiveStack({
  children,
  className,
  horizontal = false,
  gap = 4,
  reverseOnMobile = false,
  as: Component = "div",
}: ResponsiveStackProps) {
  return (
    <Component
      className={cn(
        "flex w-full",
        horizontal ? "flex-col md:flex-row" : "flex-col",
        reverseOnMobile && "flex-col-reverse md:flex-row",
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </Component>
  );
}
