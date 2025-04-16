"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const { logout, isLoading } = useAuthContext();

  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      } ${className || ""}`}
      onClick={logout}
      disabled={isLoading}
    >
      <LogOut className="h-4 w-4" />
      <span>Выйти</span>
    </button>
  );
}
