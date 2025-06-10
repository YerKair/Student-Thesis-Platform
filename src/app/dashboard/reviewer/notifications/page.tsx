"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/providers/auth-provider";
import { NotificationsService } from "@/features/notifications/api/notifications-service";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { toast } from "sonner";
import { Bell, Send, AlertCircle } from "lucide-react";

export default function ReviewerNotificationsPage() {
  const { user, token } = useAuthContext();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<
    "low" | "normal" | "high" | "urgent"
  >("normal");
  const [notificationType, setNotificationType] = useState<
    "message" | "meeting" | "system" | "deadline"
  >("system");
  const [isLoading, setIsLoading] = useState(false);

  // Проверка роли ревьюера
  useEffect(() => {
    if (user && !user.roles.includes("reviewer")) {
      toast.error("Доступ запрещен", {
        description: "Только ревьюеры могут отправлять уведомления студентам",
      });
      router.push("/dashboard");
    }
  }, [user, router]);

  // Если пользователь не ревьюер, не показываем контент
  if (!user || !user.roles.includes("reviewer")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Доступ запрещен
          </h2>
          <p className="text-gray-600">
            Только ревьюеры могут отправлять уведомления студентам
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (!token) {
      toast.error("Ошибка авторизации");
      return;
    }

    setIsLoading(true);

    try {
      const result = await NotificationsService.sendNotificationToStudents(
        {
          title,
          content,
          notification_type: notificationType,
          priority,
        },
        token
      );

      toast.success("Уведомление отправлено", {
        description: result.message,
      });

      // Очищаем форму
      setTitle("");
      setContent("");
      setPriority("normal");
      setNotificationType("system");
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      toast.error("Ошибка", {
        description:
          error instanceof Error
            ? error.message
            : "Не удалось отправить уведомление",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Уведомления студентам
              </h1>
            </div>
            <p className="text-gray-600">
              Отправьте уведомление всем студентам в системе
            </p>
          </div>

          {/* Form */}
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <Send className="h-5 w-5" />
                Создать уведомление
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Заголовок <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок уведомления"
                    className="border-2 border-gray-300 focus:border-blue-500"
                    maxLength={255}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label
                    htmlFor="content"
                    className="text-sm font-medium text-gray-700"
                  >
                    Содержание <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Введите текст уведомления..."
                    rows={6}
                    className="border-2 border-gray-300 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Тип уведомления
                    </Label>
                    <Select
                      value={notificationType}
                      onValueChange={(value: any) => setNotificationType(value)}
                    >
                      <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">Системное</SelectItem>
                        <SelectItem value="message">Сообщение</SelectItem>
                        <SelectItem value="meeting">Встреча</SelectItem>
                        <SelectItem value="deadline">Дедлайн</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Приоритет
                    </Label>
                    <Select
                      value={priority}
                      onValueChange={(value: any) => setPriority(value)}
                    >
                      <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="normal">Обычный</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="urgent">Срочный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Информация об отправке
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Уведомление будет отправлено всем пользователям с ролью
                        "Студент" в системе. Студенты увидят уведомление в своей
                        панели уведомлений.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !title.trim() || !content.trim()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Отправить уведомление
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
