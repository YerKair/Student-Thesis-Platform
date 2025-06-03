"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/app/providers/auth-provider";
import { Spinner } from "@/shared/ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
