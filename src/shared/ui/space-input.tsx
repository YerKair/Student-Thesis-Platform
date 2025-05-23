"use client";

import { useState, InputHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface SpaceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
  name?: string;
}

export const SpaceInput = forwardRef<HTMLInputElement, SpaceInputProps>(
  (
    {
      label,
      error,
      showPasswordToggle,
      type = "text",
      name,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <div className="relative space-y-1">
        <motion.label
          className={`block text-sm font-medium ${
            isFocused ? "text-blue-400" : "text-gray-100"
          }`}
          animate={{
            y: isFocused ? -5 : 0,
            color: isFocused ? "#60a5fa" : "#f3f4f6",
          }}
          transition={{ duration: 0.2 }}
          htmlFor={name}
        >
          {label}
        </motion.label>

        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-md"
            animate={{
              boxShadow: isFocused
                ? "0 0 0 2px rgba(96, 165, 250, 0.3), 0 0 15px 2px rgba(96, 165, 250, 0.2)"
                : "0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0 rgba(96, 165, 250, 0)",
            }}
            transition={{ duration: 0.2 }}
          />

          <input
            ref={ref}
            name={name}
            id={name}
            type={inputType}
            className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            style={{ color: "white", caretColor: "white" }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <motion.p
            className="text-red-500 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

SpaceInput.displayName = "SpaceInput";
