"use client";

import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/shared/ui/toaster";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
