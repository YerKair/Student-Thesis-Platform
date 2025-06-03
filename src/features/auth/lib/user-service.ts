import { API_URL } from "@/shared/config";

export interface User {
  id: number;
  email: string;
  fullname: string;
  roles: string[];
  is_active: boolean;
  created_at: string;
}

export interface RegisterAdminRequest {
  email: string;
  password: string;
  fullname: string;
  admin_secret_key: string;
}

export interface AddRoleRequest {
  role: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export class UserService {
  static async registerAdmin(
    data: RegisterAdminRequest
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/auth/register/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to register admin");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to register admin");
    }
  }

  static async addRole(
    userId: number,
    role: AddRoleRequest,
    token: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(role),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add role");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add role");
    }
  }

  static async getUsers(token: string): Promise<User[]> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch users");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch users");
    }
  }
}
