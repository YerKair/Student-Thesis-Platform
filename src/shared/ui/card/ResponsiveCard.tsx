import { cn } from "@/shared/lib/utils";
import { type ReactNode } from "react";

export interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
  withBorder?: boolean;
  as?: React.ElementType;
}

const paddingVariants = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

const shadowVariants = {
  none: "",
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-md",
};

/**
 * A responsive card component with configurable padding, shadow, and border
 */
export function ResponsiveCard({
  children,
  className,
  shadow = "md",
  padding = "md",
  withBorder = true,
  as: Component = "div",
}: ResponsiveCardProps) {
  return (
    <Component
      className={cn(
        "rounded-lg bg-card text-card-foreground",
        paddingVariants[padding],
        shadowVariants[shadow],
        withBorder && "border",
        className
      )}
    >
      {children}
    </Component>
  );
}

export interface ResponsiveCardContentProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCardContent({
  children,
  className,
}: ResponsiveCardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export interface ResponsiveCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCardHeader({
  children,
  className,
}: ResponsiveCardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 sm:space-y-2", className)}>
      {children}
    </div>
  );
}

export interface ResponsiveCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCardFooter({
  children,
  className,
}: ResponsiveCardFooterProps) {
  return (
    <div className={cn("flex items-center pt-4 sm:pt-6", className)}>
      {children}
    </div>
  );
}

export interface ResponsiveCardTitleProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function ResponsiveCardTitle({
  children,
  className,
  as: Component = "h3",
}: ResponsiveCardTitleProps) {
  return (
    <Component
      className={cn(
        "text-xl font-semibold leading-none tracking-tight sm:text-2xl",
        className
      )}
    >
      {children}
    </Component>
  );
}

export interface ResponsiveCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCardDescription({
  children,
  className,
}: ResponsiveCardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground sm:text-base", className)}>
      {children}
    </p>
  );
}
