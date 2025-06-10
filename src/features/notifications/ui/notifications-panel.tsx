"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Bell,
  BellRing,
  Check,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
  Trash2,
  User,
  MessageSquare,
  Calendar,
  AlertTriangle,
  X,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Notification } from "@/entities/notification/model/types";

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (notificationId: number) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (notificationId: number) => void;
  onClearAll?: () => void;
  compact?: boolean;
}

type FilterType = "all" | "unread" | "read" | "today" | "week";

export function NotificationsPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  compact = false,
}: NotificationsPanelProps) {
  const [filterType, setFilterType] = useState<FilterType>("all");

  // Фильтрация уведомлений
  const filteredNotifications = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return notifications.filter((notification) => {
      switch (filterType) {
        case "unread":
          return !notification.is_read;
        case "read":
          return notification.is_read;
        case "today":
          return new Date(notification.created_at) >= today;
        case "week":
          return new Date(notification.created_at) >= weekAgo;
        default:
          return true;
      }
    });
  }, [notifications, filterType]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getNotificationIcon = (notification: Notification) => {
    switch (notification.type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "deadline":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationPriority = (notification: Notification) => {
    if (notification.type === "urgent") return "high";
    if (notification.type === "deadline") return "medium";
    return "normal";
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
        <PopoverContent className="w-96 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Уведомления</h3>
              {unreadCount > 0 && onMarkAllAsRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-xs"
                >
                  Прочитать все
                </Button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Нет уведомлений</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 hover:bg-muted/50 cursor-pointer border-l-2 transition-colors",
                      !notification.is_read
                        ? "border-l-blue-500 bg-blue-50/50"
                        : "border-l-transparent",
                      getNotificationPriority(notification) === "high" &&
                        "bg-red-50/50 border-l-red-500"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-2">
                      {getNotificationIcon(notification)}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm line-clamp-2",
                            !notification.is_read && "font-medium"
                          )}
                        >
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {filteredNotifications.length > 10 && (
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Показать все уведомления
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5" />
              Уведомления
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount}</Badge>
              )}
            </CardTitle>
            <CardDescription>Все важные обновления и сообщения</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filterType}
              onValueChange={(value: FilterType) => setFilterType(value)}
            >
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="unread">Непрочитанные</SelectItem>
                <SelectItem value="read">Прочитанные</SelectItem>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="week">За неделю</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {unreadCount > 0 && onMarkAllAsRead && (
                  <DropdownMenuItem onClick={onMarkAllAsRead}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Отметить все как прочитанные
                  </DropdownMenuItem>
                )}
                {onClearAll && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onClearAll}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Очистить все
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {notifications.length === 0
                ? "Нет уведомлений"
                : "Уведомления не найдены"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {notifications.length === 0
                ? "Когда появятся новые уведомления, они отобразятся здесь"
                : "Попробуйте изменить фильтр"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => {
              const priority = getNotificationPriority(notification);

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer",
                    !notification.is_read &&
                      "border-l-4 border-l-blue-500 bg-blue-50/50",
                    priority === "high" && "border-l-red-500 bg-red-50/50",
                    priority === "medium" &&
                      "border-l-orange-500 bg-orange-50/50"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-sm leading-relaxed",
                              !notification.is_read && "font-medium"
                            )}
                          >
                            {notification.content}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatRelativeTime(notification.created_at)}
                            </span>

                            {notification.user && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {notification.user.fullname ||
                                  notification.user.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {!notification.is_read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.is_read && onMarkAsRead && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMarkAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Отметить как прочитанное
                                </DropdownMenuItem>
                              )}

                              {onDelete && (
                                <>
                                  {!notification.is_read && (
                                    <DropdownMenuSeparator />
                                  )}
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onDelete(notification.id);
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Удалить
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
