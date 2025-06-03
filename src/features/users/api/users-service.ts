import { User, UserRole } from "@/entities/user/model/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export interface BackendUser {
  id: number;
  email: string;
  fullname: string;
  roles: string[];
  created_at: string;
  is_active: boolean;
}

export class UsersService {
  static async getUsers(token: string): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users: BackendUser[] = await response.json();

      return users.map((user) => ({
        id: user.id.toString(),
        email: user.email,
        name: user.fullname,
        role: (user.roles[0] || "student") as UserRole,
        roles: user.roles as UserRole[],
        isActive: user.is_active,
        createdAt: user.created_at,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserByEmail(email: string, token: string): Promise<User> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/get-user-by-email?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const user: BackendUser = await response.json();

      return {
        id: user.id.toString(),
        email: user.email,
        name: user.fullname,
        role: (user.roles[0] || "student") as UserRole,
        roles: user.roles as UserRole[],
        isActive: user.is_active,
        createdAt: user.created_at,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  static async updateRoles(
    userId: string,
    roles: UserRole[],
    token: string
  ): Promise<void> {
    try {
      console.log("Updating roles:", { userId, roles });
      const response = await fetch(`${API_BASE_URL}/users/${userId}/roles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roles }),
      });

      if (!response.ok) {
        throw new Error("Failed to update roles");
      }

      const result = await response.json();
      console.log("Update roles response:", result);
    } catch (error) {
      console.error("Error updating roles:", error);
      throw error;
    }
  }

  static async addRole(
    userId: string,
    role: UserRole,
    token: string
  ): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/add-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error("Failed to add role");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      throw error;
    }
  }
}
