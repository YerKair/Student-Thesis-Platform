import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const headingSizes = {
  xs: "text-lg sm:text-xl font-semibold",
  sm: "text-xl sm:text-2xl font-semibold",
  md: "text-2xl sm:text-3xl font-semibold",
  lg: "text-3xl sm:text-4xl font-bold",
  xl: "text-4xl sm:text-5xl font-bold",
  "2xl": "text-5xl sm:text-6xl font-bold",
  "3xl": "text-6xl sm:text-7xl font-extrabold",
  "4xl": "text-7xl sm:text-8xl font-extrabold",
};

export function Heading({
  children,
  className,
  as: Component = "h2",
  size = "lg",
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "tracking-tight text-foreground",
        headingSizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

export interface TextProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const textSizes = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
};

export function Text({
  children,
  className,
  as: Component = "p",
  size = "md",
}: TextProps) {
  return (
    <Component className={cn("text-foreground", textSizes[size], className)}>
      {children}
    </Component>
  );
}

export interface LeadProps {
  children: ReactNode;
  className?: string;
}

export function Lead({ children, className }: LeadProps) {
  return (
    <p className={cn("text-xl text-muted-foreground sm:text-2xl", className)}>
      {children}
    </p>
  );
}

export interface LargeProps {
  children: ReactNode;
  className?: string;
}

export function Large({ children, className }: LargeProps) {
  return (
    <div className={cn("text-lg font-semibold sm:text-xl", className)}>
      {children}
    </div>
  );
}

export interface SmallProps {
  children: ReactNode;
  className?: string;
}

export function Small({ children, className }: SmallProps) {
  return (
    <small
      className={cn("text-xs font-medium leading-none sm:text-sm", className)}
    >
      {children}
    </small>
  );
}

export interface MutedProps {
  children: ReactNode;
  className?: string;
}

export function Muted({ children, className }: MutedProps) {
  return (
    <p className={cn("text-sm text-muted-foreground sm:text-base", className)}>
      {children}
    </p>
  );
}
