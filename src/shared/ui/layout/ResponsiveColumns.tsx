import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export interface ResponsiveColumnsProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: number | { x?: number; y?: number };
  collapseBelow?: "sm" | "md" | "lg" | "xl";
  equalWidth?: boolean;
  centerOnMobile?: boolean;
  reverseOnMobile?: boolean;
}

/**
 * Компонент для создания адаптивных колонок, которые схлопываются в одну на мобильных устройствах
 */
export function ResponsiveColumns({
  children,
  className,
  columns = 2,
  gap = 4,
  collapseBelow = "md",
  equalWidth = true,
  centerOnMobile = true,
  reverseOnMobile = false,
}: ResponsiveColumnsProps) {
  // Формирование классов для разных вариантов сетки
  const gridClass = `${collapseBelow}:grid ${collapseBelow}:grid-cols-${columns}`;

  // Определение gap
  const gapClasses =
    typeof gap === "number"
      ? `gap-${gap}`
      : `gap-x-${gap.x ?? 4} gap-y-${gap.y ?? 6}`;

  return (
    <div
      className={cn(
        "w-full flex flex-col",
        reverseOnMobile && "flex-col-reverse",
        centerOnMobile && "items-center",
        gridClass,
        gapClasses,
        equalWidth && `${collapseBelow}:grid-cols-${columns}`,
        className
      )}
    >
      {children}
    </div>
  );
}

export interface ColumnProps {
  children: ReactNode;
  className?: string;
  span?: number;
  order?: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  fullWidthOnMobile?: boolean;
}

/**
 * Компонент для отдельной колонки в ResponsiveColumns
 */
export function Column({
  children,
  className,
  span = 1,
  order,
  alignItems = "start",
  justifyContent = "start",
  fullWidthOnMobile = true,
}: ColumnProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        fullWidthOnMobile ? "w-full" : "w-auto",
        order && `order-${order}`,
        `items-${alignItems}`,
        `justify-${justifyContent}`,
        span > 1 && `md:col-span-${span}`,
        className
      )}
    >
      {children}
    </div>
  );
}
