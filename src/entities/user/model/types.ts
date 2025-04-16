export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
