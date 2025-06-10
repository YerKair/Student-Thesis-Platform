"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/entities/user/model/types";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthState,
} from "../model/types";
import { AuthService } from "./auth-service";

// Базовый URL API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const TOKEN_KEY = "auth_token";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuth = () => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(initialState);

  const setAuthState = useCallback((newState: Partial<AuthState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setAuthState({ isLoading: true, error: null });
        const token = await AuthService.login(credentials);
        const user = await AuthService.getCurrentUser(token);

        localStorage.setItem(TOKEN_KEY, token);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        // Убираем автоматическое перенаправление - теперь это будет управляться анимациями
        // setTimeout(() => {
        //   router.push("/dashboard");
        // }, 3800); // Квазар (2000ms) + Загрузка (1500ms) + небольшой буфер (300ms)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Ошибка при входе";
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: message,
        });
        throw error;
      }
    },
    [setAuthState, router]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        setAuthState({ isLoading: true, error: null });
        await AuthService.register(credentials);
        await login({
          email: credentials.email,
          password: credentials.password,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Ошибка при регистрации";
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: message,
        });
        throw error;
      }
    },
    [login, setAuthState]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    router.push("/auth/login");
  }, [setAuthState, router]);

  const redirectToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setAuthState({ isLoading: false });
        return;
      }

      try {
        const user = await AuthService.getCurrentUser(token);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem(TOKEN_KEY);
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    initAuth();
  }, [setAuthState]);

  return {
    ...state,
    login,
    register,
    logout,
    redirectToDashboard,
  };
};
