export type UserRole = "student" | "supervisor" | "admin" | "reviewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roles: UserRole[];
  isActive?: boolean;
  createdAt?: string;
}
