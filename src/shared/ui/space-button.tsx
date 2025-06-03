"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "children">;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface SpaceButtonProps extends MotionButtonProps {
  children?: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export const SpaceButton = forwardRef<HTMLButtonElement, SpaceButtonProps>(
  (
    {
      children,
      isLoading,
      variant = "primary",
      size = "md",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      "relative font-medium rounded-md focus:outline-none transition-all duration-300 text-white";

    // Size classes
    const sizeClasses = {
      sm: "py-1.5 px-3 text-sm",
      md: "py-2.5 px-5 text-base",
      lg: "py-3 px-6 text-lg",
    };

    // Variant classes
    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white",
      secondary:
        "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        disabled={isLoading || disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Animated glow effect */}
        <motion.span
          className="absolute inset-0 rounded-md opacity-0"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(79, 70, 229, 0)",
              "0 0 0 4px rgba(79, 70, 229, 0.3)",
              "0 0 0 0 rgba(79, 70, 229, 0)",
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Button content */}
        <div className="flex items-center justify-center text-white">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              <span className="text-white">Загрузка...</span>
            </>
          ) : (
            <span className="text-white">{children}</span>
          )}
        </div>

        {/* Particle effect on hover (stars) */}
        {!isLoading && !disabled && (
          <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                initial={{ opacity: 0, x: "50%", y: "50%" }}
                whileHover={{
                  opacity: [0, 1, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  transition: {
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    );
  }
);

SpaceButton.displayName = "SpaceButton";
