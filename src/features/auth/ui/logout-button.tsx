"use client";

import { Button } from "@/shared/ui/button";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/app/providers/auth-provider";

export function LogoutButton() {
  const { logout, isLoading } = useAuthContext();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      <span>Выйти</span>
    </Button>
  );
}
