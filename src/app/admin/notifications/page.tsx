"use client";

import { useState } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { useToast } from "@/shared/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Switch } from "@/shared/ui/switch";
import {
  Loader2,
  Send,
  Megaphone,
  Info,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// Моковые данные для истории уведомлений
const mockNotifications = [
  {
    id: 1,
    title: "Предзащита дипломных работ",
    content:
      "Предзащита дипломных работ состоится 15 мая в аудитории 305. Явка обязательна для всех студентов.",
    target_groups: ["student"],
    priority: "high",
    is_important: true,
    created_at: "2025-04-10T10:30:00.000Z",
    recipients_count: 168,
    read_count: 143,
  },
  {
    id: 2,
    title: "Обновление платформы",
    content:
      "Мы обновили функциональность платформы. Теперь доступна загрузка документов в формате PDF и DOCX.",
    target_groups: ["student", "teacher", "supervisor"],
    priority: "medium",
    is_important: false,
    created_at: "2025-04-05T14:15:00.000Z",
    recipients_count: 230,
    read_count: 187,
  },
  {
    id: 3,
    title: "Новый курс по оформлению документации",
    content:
      "Доступен новый курс по правильному оформлению документации согласно ГОСТ. Рекомендуем ознакомиться всем студентам.",
    target_groups: ["student"],
    priority: "low",
    is_important: false,
    created_at: "2025-03-28T09:45:00.000Z",
    recipients_count: 165,
    read_count: 98,
  },
  {
    id: 4,
    title: "Изменение расписания консультаций",
    content:
      "В связи с праздничными днями изменено расписание консультаций. Пожалуйста, проверьте обновленное расписание в разделе 'Консультации'.",
    target_groups: ["student", "teacher"],
    priority: "medium",
    is_important: true,
    created_at: "2025-03-20T16:30:00.000Z",
    recipients_count: 210,
    read_count: 195,
  },
  {
    id: 5,
    title: "Успешная аккредитация",
    content:
      "Наш вуз успешно прошел аккредитацию. Благодарим всех за участие в подготовке!",
    target_groups: ["student", "teacher", "supervisor", "admin"],
    priority: "medium",
    is_important: false,
    created_at: "2025-03-15T11:20:00.000Z",
    recipients_count: 250,
    read_count: 220,
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"create" | "history">("create");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();
  const { token } = useAuthContext();

  // Состояние формы
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetStudents, setTargetStudents] = useState(true);
  const [targetTeachers, setTargetTeachers] = useState(false);
  const [targetSupervisors, setTargetSupervisors] = useState(false);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (title.length < 5) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заголовок должен содержать не менее 5 символов",
      });
      return;
    }

    if (content.length < 10) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Содержание должно содержать не менее 10 символов",
      });
      return;
    }

    if (!targetStudents && !targetTeachers && !targetSupervisors) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Выберите хотя бы одну целевую группу",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Имитация отправки запроса к API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Формируем целевые группы из булевых полей
      const targetGroups = [];
      if (targetStudents) targetGroups.push("student");
      if (targetTeachers) targetGroups.push("teacher");
      if (targetSupervisors) targetGroups.push("supervisor");

      // В реальном приложении здесь был бы запрос к API
      /*
      const response = await fetch(`${API_BASE_URL}/api/v1/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          target_groups: targetGroups,
          priority,
          is_important: isImportant
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить уведомление");
      }
      */

      // Подсчет получателей
      let recipientsCount = 0;
      if (targetStudents) recipientsCount += 165;
      if (targetTeachers) recipientsCount += 42;
      if (targetSupervisors) recipientsCount += 28;

      // Добавляем новое уведомление в список
      const newNotification = {
        id: notifications.length + 1,
        title,
        content,
        target_groups: targetGroups,
        priority,
        is_important: isImportant,
        created_at: new Date().toISOString(),
        recipients_count: recipientsCount,
        read_count: 0,
      };

      setNotifications([newNotification, ...notifications]);

      toast({
        title: "Уведомление отправлено",
        description: `Уведомление "${title}" успешно отправлено ${recipientsCount} получателям.`,
      });

      // Сбрасываем форму
      setTitle("");
      setContent("");
      setTargetStudents(true);
      setTargetTeachers(false);
      setTargetSupervisors(false);
      setPriority("medium");
      setIsImportant(false);
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description:
          "Не удалось отправить уведомление. Попробуйте снова позже.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Получение цвета бейджа для приоритета
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  // Получение текста для приоритета
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Высокий";
      case "medium":
        return "Средний";
      default:
        return "Низкий";
    }
  };

  return (
    <div className="space-y-6">
      {/* Переключатель вкладок */}
      <div className="flex space-x-2 border-b border-gray-200 pb-4">
        <Button
          variant={activeTab === "create" ? "default" : "outline"}
          onClick={() => setActiveTab("create")}
          className="gap-2"
        >
          <Megaphone className="h-4 w-4" />
          Создать уведомление
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "outline"}
          onClick={() => setActiveTab("history")}
          className="gap-2"
        >
          <Info className="h-4 w-4" />
          История уведомлений
        </Button>
      </div>

      {/* Вкладка создания уведомления */}
      {activeTab === "create" && (
        <Card className="bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900">
              Отправка уведомления
            </CardTitle>
            <CardDescription className="text-gray-500">
              Создайте и отправьте уведомление выбранным группам пользователей
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Заголовок уведомления
                  </label>
                  <Input
                    placeholder="Например: Предзащита дипломных работ"
                    className="border-gray-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержание уведомления
                  </label>
                  <textarea
                    placeholder="Введите подробный текст уведомления..."
                    className="flex h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Получатели
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2">
                      <label className="text-gray-700">Студенты</label>
                      <Switch
                        checked={targetStudents}
                        onCheckedChange={setTargetStudents}
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <label className="text-gray-700">Преподаватели</label>
                      <Switch
                        checked={targetTeachers}
                        onCheckedChange={setTargetTeachers}
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <label className="text-gray-700">
                        Научные руководители
                      </label>
                      <Switch
                        checked={targetSupervisors}
                        onCheckedChange={setTargetSupervisors}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Приоритет
                    </label>
                    <div className="relative">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md pr-8 text-gray-700 bg-white"
                        value={priority}
                        onChange={(e) =>
                          setPriority(
                            e.target.value as "low" | "medium" | "high"
                          )
                        }
                      >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Важное уведомление
                      </label>
                      <p className="text-sm text-gray-500">
                        Отметьте, если уведомление требует особого внимания
                      </p>
                    </div>
                    <Switch
                      checked={isImportant}
                      onCheckedChange={setIsImportant}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Отправка...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    <span>Отправить уведомление</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Вкладка истории уведомлений */}
      {activeTab === "history" && (
        <Card className="bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900">История уведомлений</CardTitle>
            <CardDescription className="text-gray-500">
              Список всех отправленных уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-gray-700">Заголовок</TableHead>
                    <TableHead className="text-gray-700">Приоритет</TableHead>
                    <TableHead className="text-gray-700">Получатели</TableHead>
                    <TableHead className="text-gray-700">Прочитано</TableHead>
                    <TableHead className="text-gray-700">
                      Дата отправки
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow
                      key={notification.id}
                      className="border-t border-gray-200"
                    >
                      <TableCell className="text-gray-900">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          {notification.content}
                        </div>
                        {notification.is_important && (
                          <Badge
                            variant="outline"
                            className="mt-1 border-red-200 text-red-600 bg-red-50"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Важное
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getPriorityBadgeVariant(
                            notification.priority
                          )}
                        >
                          {getPriorityText(notification.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {notification.recipients_count}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (notification.read_count /
                                    notification.recipients_count) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {notification.read_count}/
                            {notification.recipients_count}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {formatDate(notification.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
