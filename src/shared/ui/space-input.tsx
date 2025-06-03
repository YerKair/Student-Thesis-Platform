"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SpaceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
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
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="space-y-1">
        {label && (
          <label
            className="block text-sm font-medium text-gray-100"
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            name={name}
            id={name}
            type={inputType}
            className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            style={{ color: "white", caretColor: "white" }}
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

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

SpaceInput.displayName = "SpaceInput";
