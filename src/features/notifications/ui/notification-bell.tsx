"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCircle,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import type { Notification } from "../api/notifications-service";

interface NotificationBellProps {
  unreadCount: number;
  notifications?: Notification[];
  href?: string;
  compact?: boolean;
  onMarkAsRead?: (notificationId: number) => void;
  onMarkAllAsRead?: () => void;
}

export function NotificationBell({
  unreadCount,
  notifications = [],
  href = "/student/notifications",
  compact = true,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationBellProps) {
  const getNotificationIcon = (notification: Notification) => {
    switch (notification.notification_type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-green-600" />;
      case "deadline":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "system":
        return <Bell className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationPriority = (notification: Notification) => {
    return notification.priority || "normal";
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - notificationDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Только что";
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч назад`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} дн назад`;

    return format(notificationDate, "d MMM yyyy");
  };

  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 shadow-lg border" align="end">
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Уведомления</h3>
              {unreadCount > 0 && onMarkAllAsRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  Прочитать все
                </Button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto bg-white">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Нет уведомлений</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-all duration-200",
                      !notification.is_read
                        ? "border-l-blue-500 bg-blue-50"
                        : "border-l-transparent bg-white",
                      getNotificationPriority(notification) === "high" &&
                        "bg-orange-50 border-l-orange-500",
                      getNotificationPriority(notification) === "urgent" &&
                        "bg-red-50 border-l-red-500"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification)}
                      </div>
                      <div className="flex-1 min-w-0">
                        {notification.title && (
                          <p
                            className={cn(
                              "text-sm font-medium mb-1 text-gray-900",
                              !notification.is_read && "font-semibold"
                            )}
                          >
                            {notification.title}
                          </p>
                        )}
                        <p
                          className={cn(
                            "text-sm text-gray-700 line-clamp-2 leading-relaxed",
                            !notification.is_read &&
                              !notification.title &&
                              "font-medium"
                          )}
                        >
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {notifications.length > 10 && (
            <div className="p-3 border-t bg-gray-50">
              <Link href={href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  Показать все уведомления
                </Button>
              </Link>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Link href={href}>
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
