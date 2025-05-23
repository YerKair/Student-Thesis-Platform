"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const { logout, isLoading } = useAuthContext();

  return (
    <button
      className={cn(
        "flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200",
        isLoading && "opacity-50 pointer-events-none",
        className
      )}
      onClick={logout}
      disabled={isLoading}
    >
      <LogOut className="h-4 w-4" />
      <span className="font-medium">Выйти</span>
    </button>
  );
}
