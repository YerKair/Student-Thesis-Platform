export type UserRole = "student" | "supervisor" | "admin" | "reviewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roles: UserRole[];
  isActive?: boolean;
  createdAt?: string;
  fullname?: string;
  specialization?: string;
  course?: string;
  group?: string;
}

export interface ProfileUpdateRequest {
  fullname: string;
  specialization?: string;
  course?: string;
  group?: string;
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  fullname: string;
  roles: string[];
  specialization?: string;
  course?: string;
  group?: string;
}
