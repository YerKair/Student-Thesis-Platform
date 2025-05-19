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
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// API сервис аутентификации
class AuthService {
  static async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    try {
      console.log("Trying to login with credentials:", credentials.email);

      // Создаем FormData для отправки
      const formData = new URLSearchParams();
      formData.append("username", credentials.email); // Бэкенд ожидает параметр 'username'
      formData.append("password", credentials.password);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Важно: правильный Content-Type
          Accept: "application/json",
        },
        body: formData.toString(), // Преобразуем в строку
        credentials: "include", // Важно для CORS с куками
        mode: "cors", // Явно указываем режим CORS
      });

      // Детальная обработка ошибок
      if (!response.ok) {
        // Пытаемся получить текст ошибки
        let errorText;
        try {
          errorText = await response.text();
          console.error(
            "Login error response:",
            errorText,
            "Status:",
            response.status
          );

          // Пытаемся распарсить как JSON
          const errorJson = JSON.parse(errorText);
          const errorMessage = errorJson.detail || "Ошибка при входе";
          throw new Error(errorMessage);
        } catch (parseError) {
          // Если не смогли распарсить JSON, возвращаем текст ошибки или статус
          console.error("Could not parse error response:", parseError);
          throw new Error(errorText || `Ошибка сервера: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("Login successful, received data:", data);

      // Получаем профиль пользователя
      const userProfile = await AuthService.getUserProfile(data.access_token);
      console.log("User profile:", userProfile);

      // Сохраняем токены в localStorage
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(userProfile));

      return {
        user: userProfile,
        token: data.access_token,
        refreshToken: "", // В бэкенде refresh token не используется
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async register(
    credentials: RegisterCredentials
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    try {
      console.log("Attempting registration for:", credentials.email);

      // Подготовка данных для API в соответствии с ожидаемым форматом бэкенда
      const registerData = {
        email: credentials.email,
        password: credentials.password,
        fullname: credentials.name,
      };

      // Регистрация пользователя с обработкой CORS
      const registerResponse = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerData),
        credentials: "include", // Важно для CORS с куками
        mode: "cors", // Явно указываем режим CORS
      });

      // Обработка ошибок
      if (!registerResponse.ok) {
        // Пытаемся получить текст ошибки
        let errorText;
        try {
          errorText = await registerResponse.text();
          console.error("Registration error response:", errorText);

          // Пытаемся распарсить как JSON
          const errorJson = JSON.parse(errorText);
          const errorMessage = errorJson.detail || "Ошибка при регистрации";
          throw new Error(errorMessage);
        } catch (parseError) {
          // Если не смогли распарсить JSON, возвращаем текст ошибки или статус
          console.error("Could not parse error response:", parseError);
          throw new Error(
            errorText || `Ошибка сервера: ${registerResponse.status}`
          );
        }
      }

      console.log("Registration successful");

      // После успешной регистрации сразу создаем профиль пользователя без доп. запроса логина
      const userProfile: User = {
        id: "temp-id",
        name: credentials.name,
        email: credentials.email,
        role: "student",
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      return {
        user: userProfile,
        token: "temp-token", // Временный токен - пользователь должен будет авторизоваться
        refreshToken: "",
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  static async getUserProfile(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Не удалось получить профиль пользователя");
    }

    const userData = await response.json();
    console.log("User data from API:", userData);

    // Проверяем наличие нужных данных в ответе
    if (!userData.message || !userData.message.username) {
      throw new Error("Неверный формат данных профиля пользователя");
    }

    // Получаем данные пользователя из ответа API
    const { username, fullname, roles, id } = userData.message;

    // Создаем объект пользователя на основе полученных данных
    const user: User = {
      id: id?.toString() || "1", // Используем ID из API или дефолтное значение
      name: fullname || username.split("@")[0], // Используем fullname если доступно, иначе часть email
      email: username,
      role: roles?.[0] || "student", // Берем первую роль из списка
      isActive: true,
      createdAt: new Date().toISOString(),
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
      const result = await AuthService.login(credentials);

      setAuthState({
        user: result.user,
        token: result.token,
        isLoading: false,
        isAuthenticated: true,
      });

      return result;
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Функция регистрации
  const register = async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const result = await AuthService.register(credentials);

      // В случае успешной регистрации - не сохраняем состояние авторизации,
      // т.к. нужно перенаправить на логин
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      return result;
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
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
