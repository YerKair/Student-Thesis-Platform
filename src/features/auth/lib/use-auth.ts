"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/entities/user/model/types";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthState,
} from "../model/types";
import { LoginFormValues, RegisterFormValues } from "@/features/auth/model";

// Имитация сервиса аутентификации - в реальном проекте здесь будет API
class AuthService {
  static async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Проверка учетных данных (здесь мы просто эмулируем успешный вход)
    const user: User = {
      id: "1",
      name: "Тестовый Пользователь",
      email: credentials.email,
      role: "student",
    };

    const token = "fake-jwt-token";

    // Сохраняем в localStorage (в реальном приложении можно использовать httpOnly cookies)
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  }

  static async register(
    credentials: RegisterCredentials
  ): Promise<{ user: User; token: string }> {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Создание пользователя (здесь мы просто эмулируем успешную регистрацию)
    const user: User = {
      id: "1",
      name: credentials.name,
      email: credentials.email,
      role: "student",
    };

    const token = "fake-jwt-token";

    // Сохраняем в localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  }

  static logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  static getUser(): User | null {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (e) {
      console.error("Failed to parse user data", e);
      return null;
    }
  }
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Инициализация состояния аутентификации
  useEffect(() => {
    // В клиентском коде нужно проверять window, чтобы избежать ошибок SSR
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const user = AuthService.getUser();

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: !!token && !!user,
      });
    }
  }, []);

  // Функция входа
  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { user, token } = await AuthService.login(credentials);

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Произошла ошибка при входе",
      };
    }
  };

  // Функция регистрации
  const register = async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { user, token } = await AuthService.register(credentials);

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Произошла ошибка при регистрации",
      };
    }
  };

  // Функция выхода
  const logout = () => {
    AuthService.logout();

    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });

    router.push("/auth/login");
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
