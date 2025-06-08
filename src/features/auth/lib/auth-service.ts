import { LoginCredentials, RegisterCredentials } from "../model/types";
import { User } from "@/entities/user/model/types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class AuthService {
  static async login(credentials: LoginCredentials) {
    const formData = new URLSearchParams();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error("Неверный email или пароль");
    }

    const data = await response.json();
    return data.access_token;
  }

  static async register(credentials: RegisterCredentials) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        fullname: credentials.name,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при регистрации");
    }

    return response.json();
  }

  static async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось получить данные пользователя");
    }

    const userData = await response.json();

    // Получаем полный профиль пользователя через новый эндпойнт
    const profileResponse = await fetch(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Не удалось получить профиль пользователя");
    }

    const profileData = await profileResponse.json();

    return {
      id: profileData.id?.toString() || "1",
      name: profileData.fullname || userData.message.username.split("@")[0],
      email: profileData.email || userData.message.username,
      role: profileData.roles?.[0] || "student",
      roles: profileData.roles || ["student"],
      fullname: profileData.fullname,
      specialization: profileData.specialization,
      course: profileData.course,
      group: profileData.group,
    };
  }
}
