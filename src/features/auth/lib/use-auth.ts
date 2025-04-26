"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/entities/user/model/types";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthState,
} from "../model/types";

// Базовый URL API
const API_BASE_URL = "http://localhost:8000";

// API сервис аутентификации
class AuthService {
  static async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Ошибка при входе");
    }

    const data = await response.json();

    // Получаем данные пользователя
    const userProfile = await AuthService.getUserProfile(data.access_token);

    // Сохраняем токены в localStorage
    localStorage.setItem("authToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("user", JSON.stringify(userProfile));

    return {
      user: userProfile,
      token: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  static async register(
    credentials: RegisterCredentials
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    // Подготовка данных для API
    const registerData = {
      email: credentials.email,
      password: credentials.password,
      full_name: credentials.name,
    };

    // Регистрация пользователя
    const registerResponse = await fetch(
      `${API_BASE_URL}/api/v1/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      }
    );

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      throw new Error(errorData.detail || "Ошибка при регистрации");
    }

    const registeredUser = await registerResponse.json();

    // Авторизация пользователя после регистрации
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    };

    const loginResponse = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!loginResponse.ok) {
      throw new Error("Регистрация успешна, но не удалось выполнить вход");
    }

    const tokenData = await loginResponse.json();

    // Подготавливаем данные пользователя в нужном формате
    const user: User = {
      id: registeredUser.id.toString(),
      name: registeredUser.full_name,
      email: registeredUser.email,
      role: registeredUser.role,
    };

    // Сохраняем токены и данные пользователя
    localStorage.setItem("authToken", tokenData.access_token);
    localStorage.setItem("refreshToken", tokenData.refresh_token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      user,
      token: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
    };
  }

  static async getUserProfile(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось получить профиль пользователя");
    }

    const userData = await response.json();

    // Преобразуем ответ API в формат User
    const user: User = {
      id: userData.id.toString(),
      name: userData.full_name,
      email: userData.email,
      role: userData.role,
      isActive: userData.is_active,
      createdAt: userData.created_at,
    };
    return user;
  }

  static logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
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

  static getToken(): string | null {
    return localStorage.getItem("authToken");
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
