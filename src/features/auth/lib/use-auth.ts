"use client";

import { useState, useEffect, useCallback } from "react";
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

      // Создаем FormData для OAuth2 password flow
      const formData = new URLSearchParams();
      formData.append("username", credentials.email);
      formData.append("password", credentials.password);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        let errorText = await response.text();
        console.error(
          "Login error response:",
          errorText,
          "Status:",
          response.status
        );
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.detail || "Ошибка при входе");
        } catch (parseError) {
          throw new Error(errorText || `Ошибка сервера: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("Login successful, received data:", data);

      // Получаем информацию о пользователе
      const userResponse = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await userResponse.json();
      console.log("User data:", userData);

      // Получаем полный профиль пользователя
      const profileResponse = await fetch(
        `${API_BASE_URL}/users/get-user-by-email?email=${userData.message.username}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const profileData = await profileResponse.json();
      console.log("Profile data:", profileData);

      // Формируем профиль пользователя
      const userProfile = {
        id: profileData.id?.toString() || "1",
        name: profileData.fullname || credentials.email.split("@")[0],
        email: profileData.email || credentials.email,
        role: profileData.roles?.[0] || "student",
        isActive: true,
        createdAt: profileData.created_at || new Date().toISOString(),
      };

      // Сохраняем токены в localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("user", JSON.stringify(userProfile));
      }

      return {
        user: userProfile,
        token: data.access_token,
        refreshToken: "",
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

      const registerData = {
        email: credentials.email,
        password: credentials.password,
        fullname: credentials.name,
      };

      const registerResponse = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!registerResponse.ok) {
        let errorText = await registerResponse.text();
        console.error("Registration error response:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.detail || "Ошибка при регистрации");
        } catch (parseError) {
          throw new Error(
            errorText || `Ошибка сервера: ${registerResponse.status}`
          );
        }
      }

      // После успешной регистрации выполняем вход
      return await AuthService.login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }

  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("authToken");
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null;
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
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: AuthService.getUser(),
    token: AuthService.getToken(),
    isAuthenticated: AuthService.isAuthenticated(),
    isLoading: false,
    error: null,
  });

  const updateAuthState = useCallback(
    (newState: Partial<AuthState>, redirectTo?: string) => {
      setAuthState((prev) => ({ ...prev, ...newState }));
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
    [router]
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        updateAuthState({ isLoading: true, error: null });
        const result = await AuthService.login(credentials);

        updateAuthState(
          {
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          "/dashboard"
        );

        return result;
      } catch (error) {
        console.error("Login error in hook:", error);
        updateAuthState({
          error: error instanceof Error ? error.message : "Ошибка при входе",
          isLoading: false,
        });
        throw error;
      }
    },
    [updateAuthState]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        updateAuthState({ isLoading: true, error: null });
        const result = await AuthService.register(credentials);

        updateAuthState(
          {
            user: result.user,
            token: result.token,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          },
          "/dashboard"
        );

        return result;
      } catch (error) {
        updateAuthState({
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Ошибка при регистрации",
        });
        throw error;
      }
    },
    [updateAuthState]
  );

  const logout = useCallback(() => {
    AuthService.logout();
    updateAuthState(
      {
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      },
      "/auth/login"
    );
  }, [updateAuthState]);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
