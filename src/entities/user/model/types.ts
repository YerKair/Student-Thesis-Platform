export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "supervisor" | "admin";
  isActive?: boolean;
  createdAt?: string;
}
