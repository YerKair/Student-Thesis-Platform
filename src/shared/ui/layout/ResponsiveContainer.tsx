import { cn } from "@/shared/lib/utils";
import { type ReactNode } from "react";

export interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
  id?: string;
  compactOnMobile?: boolean;
}

/**
 * A responsive container component that handles proper spacing and max-width
 * across different screen sizes.
 */
export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  as: Component = "div",
  id,
  compactOnMobile = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "w-full",
        compactOnMobile
          ? "px-2 xxs:px-3 xs:px-4 sm:px-6 md:px-8"
          : "px-3 xxs:px-4 sm:px-6 md:px-8",
        fullWidth ? "max-w-none" : "mx-auto max-w-7xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
