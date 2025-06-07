"use client";

import { Calendar, Clock, Users, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { useAuthContext } from "@/app/providers/auth-provider";

interface Event {
  title: string;
  date: string;
  icon: React.ReactNode;
  type: "deadline" | "meeting" | "reminder" | "info";
  priority: "high" | "medium" | "low";
}

export default function DashboardEvents() {
  const { user } = useAuthContext();
  const { team, projectProgress, isInTeam, hasProject, isLoading } =
    useDashboardData();

  // Проверяем, является ли пользователь студентом
  const isStudent =
    user &&
    ((user.roles && user.roles.includes("student")) || user.role === "student");

  // Базовые события для не-студентов
  const defaultEvents: Event[] = [
    {
      title: "Изучите возможности платформы",
      date: "Сегодня",
      icon: <FileText className="h-4 w-4" />,
      type: "info",
      priority: "low",
    },
    {
      title: "Настройте профиль",
      date: "В ближайшее время",
      icon: <Users className="h-4 w-4" />,
      type: "reminder",
      priority: "medium",
    },
  ];

  if (!isStudent) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Ближайшие события</CardTitle>
              <CardDescription>
                График предстоящих дедлайнов и встреч
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Все события
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {defaultEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg border transition-colors hover:bg-gray-50"
              >
                <div className="rounded-full p-2 bg-blue-50 text-blue-600">
                  {event.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">
                    {event.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {event.date}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full sm:hidden">
            Все события
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Ближайшие события</CardTitle>
              <CardDescription>
                График предстоящих дедлайнов и встреч
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Все события
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg border"
              >
                <div className="rounded-full p-2 bg-gray-200 animate-pulse w-10 h-10"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Генерируем события для студентов
  const getStudentEvents = (): Event[] => {
    const events: Event[] = [];
    const now = new Date();

    // События на основе статуса команды
    if (!isInTeam) {
      events.push({
        title: "Создайте или присоединитесь к команде",
        date: "Срочно",
        icon: <AlertTriangle className="h-4 w-4" />,
        type: "reminder",
        priority: "high",
      });
    } else if (team) {
      // Если в команде, но нет проекта
      if (!hasProject) {
        events.push({
          title: "Создайте проект для команды",
          date: "В ближайшее время",
          icon: <FileText className="h-4 w-4" />,
          type: "reminder",
          priority: "high",
        });
      }

      // Встреча с научным руководителем (если есть)
      if (team.supervisor_name) {
        const meetingDate = new Date(now);
        meetingDate.setDate(meetingDate.getDate() + 3); // Через 3 дня
        events.push({
          title: `Встреча с научным руководителем ${team.supervisor_name}`,
          date: meetingDate.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          }),
          icon: <Calendar className="h-4 w-4" />,
          type: "meeting",
          priority: "medium",
        });
      } else {
        events.push({
          title: "Ожидание назначения научного руководителя",
          date: "Ожидание",
          icon: <Users className="h-4 w-4" />,
          type: "info",
          priority: "medium",
        });
      }
    }

    // События на основе прогресса проекта
    if (hasProject && projectProgress) {
      const stages = ["initial", "technical", "methodological", "final"];
      const stageNames = {
        initial: "Начальный этап",
        technical: "Техническая часть",
        methodological: "Методологическая часть",
        final: "Финальная защита",
      };

      // Дедлайн для текущего этапа
      if (
        projectProgress.currentStage &&
        projectProgress.currentStage !== "completed"
      ) {
        const deadlineDate = new Date(now);
        deadlineDate.setDate(deadlineDate.getDate() + 14); // Через 2 недели

        events.push({
          title: `Дедлайн: ${
            stageNames[projectProgress.currentStage as keyof typeof stageNames]
          }`,
          date: deadlineDate.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          }),
          icon: <Clock className="h-4 w-4" />,
          type: "deadline",
          priority: "high",
        });
      }

      // Если проект близок к завершению
      if (projectProgress.progressPercentage >= 75) {
        const defenseDate = new Date(now);
        defenseDate.setDate(defenseDate.getDate() + 30); // Через месяц

        events.push({
          title: "Подготовка к защите дипломной работы",
          date: defenseDate.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
          }),
          icon: <FileText className="h-4 w-4" />,
          type: "deadline",
          priority: "high",
        });
      }
    }

    // Сортируем по приоритету и дате
    return events
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 3); // Показываем максимум 3 события
  };

  const events = getStudentEvents();

  const getEventStyles = (event: Event) => {
    switch (event.priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-amber-200 bg-amber-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getIconStyles = (event: Event) => {
    switch (event.priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Ближайшие события</CardTitle>
            <CardDescription>
              График предстоящих дедлайнов и встреч
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Все события
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-3 rounded-lg border transition-colors hover:shadow-sm ${getEventStyles(
                  event
                )}`}
              >
                <div className={`rounded-full p-2 ${getIconStyles(event)}`}>
                  {event.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">
                    {event.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {event.date}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Подробнее
                </Button>
              </div>
            ))
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-500">
              У вас нет предстоящих событий
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="mt-4 w-full sm:hidden">
          Все события
        </Button>
      </CardContent>
    </Card>
  );
}
