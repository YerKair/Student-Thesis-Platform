import { useState, useEffect, useCallback } from "react";
import { NotificationsService } from "../api/notifications-service";
import type {
  Notification,
  NotificationList,
} from "../api/notifications-service";
import { useAuthContext } from "@/app/providers/auth-provider";

export function useNotifications() {
  const { token, user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const data = await NotificationsService.getMyNotifications(
        token,
        50,
        0,
        false
      );
      setNotifications(data.notifications);
      setUnreadCount(data.unread_count);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки уведомлений"
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  const markAsRead = useCallback(
    async (notificationId: number) => {
      if (!token) return;

      try {
        await NotificationsService.markAsRead(notificationId, token);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId
              ? {
                  ...notification,
                  is_read: true,
                  read_at: new Date().toISOString(),
                }
              : notification
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error("Ошибка при отметке уведомления как прочитанного:", err);
      }
    },
    [token]
  );

  const markAllAsRead = useCallback(async () => {
    if (!token) return;

    try {
      await NotificationsService.markAllAsRead(token);
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
          read_at: new Date().toISOString(),
        }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error(
        "Ошибка при отметке всех уведомлений как прочитанных:",
        err
      );
    }
  }, [token]);

  // Загружаем уведомления при монтировании и изменении токена
  useEffect(() => {
    if (
      token &&
      (user?.roles?.includes("student") || user?.roles?.includes("supervisor"))
    ) {
      fetchNotifications();
    }
  }, [token, user, fetchNotifications]);

  // Автоматическое обновление каждые 30 секунд
  useEffect(() => {
    if (
      !token ||
      !(user?.roles?.includes("student") || user?.roles?.includes("supervisor"))
    )
      return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [token, user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}
