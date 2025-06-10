interface Notification {
  id: number;
  user_id: number;
  title: string;
  content: string;
  notification_type: "message" | "meeting" | "system" | "deadline";
  priority: "low" | "normal" | "high" | "urgent";
  metadata?: Record<string, any>;
  is_read: boolean;
  is_acknowledged: boolean;
  created_at: string;
  read_at?: string;
  acknowledged_at?: string;
  expires_at?: string;
}

interface NotificationList {
  notifications: Notification[];
  total: number;
  unread_count: number;
}

interface NotificationStats {
  total_notifications: number;
  unread_notifications: number;
  urgent_notifications: number;
  today_notifications: number;
}

interface NotificationPreferences {
  id: number;
  user_id: number;
  email_notifications: boolean;
  browser_notifications: boolean;
  message_notifications: boolean;
  meeting_notifications: boolean;
  deadline_notifications: boolean;
  notify_low_priority: boolean;
  notify_normal_priority: boolean;
  notify_high_priority: boolean;
  notify_urgent_priority: boolean;
  updated_at: string;
}

interface CreateNotificationRequest {
  user_ids: number[];
  title: string;
  content: string;
  notification_type?: "message" | "meeting" | "system" | "deadline";
  priority?: "low" | "normal" | "high" | "urgent";
  metadata?: Record<string, any>;
  expires_at?: string;
}

interface ReviewerNotificationRequest {
  title: string;
  content: string;
  notification_type?: "message" | "meeting" | "system" | "deadline";
  priority?: "low" | "normal" | "high" | "urgent";
  expires_at?: string;
}

interface UpdateNotificationPreferencesRequest {
  email_notifications?: boolean;
  browser_notifications?: boolean;
  message_notifications?: boolean;
  meeting_notifications?: boolean;
  deadline_notifications?: boolean;
  notify_low_priority?: boolean;
  notify_normal_priority?: boolean;
  notify_high_priority?: boolean;
  notify_urgent_priority?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class NotificationsService {
  static async getMyNotifications(
    token: string,
    limit: number = 50,
    offset: number = 0,
    unreadOnly: boolean = false
  ): Promise<NotificationList> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      unread_only: unreadOnly.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/notifications/my?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить уведомления");
    }

    return response.json();
  }

  static async markAsRead(
    notificationId: number,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/notifications/${notificationId}/read`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось отметить уведомление как прочитанное");
    }

    return response.json();
  }

  static async markAsAcknowledged(
    notificationId: number,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/notifications/${notificationId}/acknowledge`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось подтвердить уведомление");
    }

    return response.json();
  }

  static async markAllAsRead(
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/notifications/mark-all-read`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось отметить все уведомления как прочитанные");
    }

    return response.json();
  }

  static async getStats(token: string): Promise<NotificationStats> {
    const response = await fetch(`${API_BASE_URL}/notifications/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить статистику уведомлений");
    }

    return response.json();
  }

  static async getPreferences(token: string): Promise<NotificationPreferences> {
    const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить настройки уведомлений");
    }

    return response.json();
  }

  static async updatePreferences(
    data: UpdateNotificationPreferencesRequest,
    token: string
  ): Promise<NotificationPreferences> {
    const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Не удалось обновить настройки уведомлений");
    }

    return response.json();
  }

  static async createNotification(
    data: CreateNotificationRequest,
    token: string
  ): Promise<{
    success: boolean;
    message: string;
    notification_count: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/notifications/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Не удалось создать уведомление");
    }

    return response.json();
  }

  static async sendNotificationToStudents(
    data: ReviewerNotificationRequest,
    token: string
  ): Promise<{
    success: boolean;
    message: string;
    notification_count: number;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/notifications/reviewer/send-to-students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Не удалось отправить уведомление");
    }

    return response.json();
  }
}

export type {
  Notification,
  NotificationList,
  NotificationStats,
  NotificationPreferences,
  CreateNotificationRequest,
  ReviewerNotificationRequest,
  UpdateNotificationPreferencesRequest,
};
