import { Suspense } from "react";
import {
  Bell,
  CheckCircle,
  MessageSquare,
  Calendar,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

// Временные данные для демонстрации
const mockNotifications = [
  {
    id: 1,
    type: "message" as const,
    content: "Новое сообщение от супервайзера: Обновление требований к проекту",
    is_read: false,
    created_at: "2024-01-15T10:30:00Z",
    user: { id: 1, full_name: "Проф. Иванов", email: "ivanov@university.edu" },
  },
  {
    id: 2,
    type: "meeting" as const,
    content:
      "Назначена встреча: Обсуждение промежуточных результатов на 20 января в 14:00",
    is_read: false,
    created_at: "2024-01-14T09:15:00Z",
    user: { id: 1, full_name: "Проф. Иванов", email: "ivanov@university.edu" },
  },
  {
    id: 3,
    type: "deadline" as const,
    content: "Приближается дедлайн: Подача промежуточного отчета через 3 дня",
    is_read: true,
    created_at: "2024-01-13T15:45:00Z",
    user: { id: 1, full_name: "Система", email: "system@university.edu" },
  },
];

function NotificationsPageContent() {
  const unreadCount = mockNotifications.filter((n) => !n.is_read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "deadline":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} ч назад`;
    return `${Math.floor(diffInMinutes / 1440)} дн назад`;
  };

  return (
    <div className="space-y-6">
      {/* Заголовок страницы */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Уведомления</h1>
          <p className="text-muted-foreground mt-1">
            Все важные обновления и сообщения от супервайзера
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Отметить все как прочитанные
          </Button>
        )}
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего уведомлений
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNotifications.length}</div>
            <p className="text-xs text-muted-foreground">За последний месяц</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Непрочитанные</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Требуют внимания</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Срочные</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Требуют немедленного действия
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Список уведомлений */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Все уведомления
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount}</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Последние обновления от вашего супервайзера и системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Нет уведомлений
              </h3>
              <p className="text-sm text-muted-foreground">
                Когда появятся новые уведомления, они отобразятся здесь
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                    !notification.is_read
                      ? "border-l-4 border-l-blue-500 bg-blue-50/50"
                      : "border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={`text-sm leading-relaxed ${
                              !notification.is_read ? "font-medium" : ""
                            }`}
                          >
                            {notification.content}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>
                              {formatRelativeTime(notification.created_at)}
                            </span>
                            <span>От: {notification.user.full_name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {!notification.is_read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <NotificationsPageContent />
    </Suspense>
  );
}
