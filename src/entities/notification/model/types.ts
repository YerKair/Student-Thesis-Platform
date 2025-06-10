import { User } from "@/entities/user/model/types";

export interface Notification {
  id: number;
  user_id: number;
  type: "message" | "meeting" | "deadline" | "urgent" | "info";
  content: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  user?: User;
}

export interface CreateNotificationRequest {
  user_id: number;
  type: "message" | "meeting" | "deadline" | "urgent" | "info";
  content: string;
}

export interface NotificationUpdate {
  is_read?: boolean;
  read_at?: string;
}
