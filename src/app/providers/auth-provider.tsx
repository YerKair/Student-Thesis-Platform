"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useAuth } from "@/features/auth/lib/use-auth";
import { AuthState } from "@/features/auth/model/types";
import {
  LoginFormValues,
  RegisterFormValues,
} from "@/features/auth/model/schema";

interface AuthContextType extends AuthState {
  login: (
    data: LoginFormValues
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterFormValues
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
