"use client";

import {
  CheckCircle2,
  AlertCircle,
  Users,
  FileText,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { useProfileCompletion } from "@/features/dashboard/hooks/use-profile-completion";
import { useAuthContext } from "@/app/providers/auth-provider";

export default function DashboardRecommendations() {
  const { user, token } = useAuthContext();
  const {
    team,
    projectProgress,
    isInTeam,
    hasProject,
    isLoading: dashboardLoading,
  } = useDashboardData();
  const {
    completionPercentage,
    isComplete,
    isLoading: profileLoading,
  } = useProfileCompletion(token);

  const isLoading = dashboardLoading || profileLoading;

  // Проверяем, является ли пользователь студентом
  const isStudent =
    user &&
    ((user.roles && user.roles.includes("student")) || user.role === "student");

  // Базовые рекомендации для не-студентов
  const getDefaultRecommendations = () => {
    const recommendations = [];

    // Рекомендация по профилю
    if (!isComplete) {
      recommendations.push({
        title: "Заполните профиль",
        description: `Заполните данные профиля для более эффективной работы (${completionPercentage}%)`,
        icon: <CheckCircle2 className="h-4 w-4" />,
        completed: false,
        priority: 1,
      });
    }

    recommendations.push(
      {
        title: "Изучите функционал",
        description: "Ознакомьтесь с возможностями платформы",
        icon: <CheckCircle2 className="h-4 w-4" />,
        completed: false,
        priority: 2,
      },
      {
        title: "Настройте уведомления",
        description: "Настройте уведомления для важных событий",
        icon: <CheckCircle2 className="h-4 w-4" />,
        completed: false,
        priority: 3,
      }
    );

    return recommendations.slice(0, 3);
  };

  if (!isStudent) {
    const recommendations = getDefaultRecommendations();

    return (
      <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg">Рекомендации</CardTitle>
          <CardDescription>Что стоит сделать в первую очередь</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`rounded-full p-1.5 mt-0.5 ${
                    rec.completed
                      ? "bg-green-100 text-green-600"
                      : rec.priority === 1
                      ? "bg-red-100 text-red-600"
                      : rec.priority === 2
                      ? "bg-amber-100 text-amber-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {rec.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg">Рекомендации</CardTitle>
          <CardDescription>Что стоит сделать в первую очередь</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="rounded-full p-1.5 bg-gray-200 animate-pulse mt-0.5 w-7 h-7"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Динамические рекомендации для студентов
  const getStudentRecommendations = () => {
    const recommendations = [];

    // Рекомендация по профилю
    if (!isComplete) {
      recommendations.push({
        title: "Заполните профиль",
        description: `Заполните данные профиля для более эффективной работы (${completionPercentage}%)`,
        icon: <CheckCircle2 className="h-4 w-4" />,
        completed: false,
        priority: 1,
      });
    }

    // Рекомендация по команде
    if (!isInTeam) {
      recommendations.push({
        title: "Создайте проект",
        description: "Создайте проект для вашей команды",
        icon: <BookOpen className="h-4 w-4" />,
        completed: false,
        priority: 2,
      });
    } else if (team && team.members.length < 3) {
      recommendations.push({
        title: "Пригласите участников",
        description: "Оптимальный размер команды - 3-4 человека",
        icon: <Users className="h-4 w-4" />,
        completed: false,
        priority: 3,
      });
    }

    // Рекомендация по проекту
    if (isInTeam && !hasProject) {
      recommendations.push({
        title: "Создайте проект",
        description: "Создайте проект для вашей команды",
        icon: <BookOpen className="h-4 w-4" />,
        completed: false,
        priority: 2,
      });
    } else if (hasProject && projectProgress) {
      if (projectProgress.progressPercentage < 25) {
        recommendations.push({
          title: "Начните работу над проектом",
          description: "Загрузите первые материалы и начните работу",
          icon: <BookOpen className="h-4 w-4" />,
          completed: false,
          priority: 2,
        });
      } else if (projectProgress.progressPercentage < 75) {
        recommendations.push({
          title: "Продолжите работу над проектом",
          description: `Текущий прогресс: ${projectProgress.progressPercentage}%`,
          icon: <BookOpen className="h-4 w-4" />,
          completed: false,
          priority: 3,
        });
      }
    }

    // Рекомендация по договорам
    recommendations.push({
      title: "Подпишите договор",
      description: "Требуется подписать договор о прохождении практики",
      icon: <FileText className="h-4 w-4" />,
      completed: false,
      priority: 2,
    });

    // Сортируем по приоритету и берем первые 3
    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 3);
  };

  const recommendations = getStudentRecommendations();

  return (
    <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg">Рекомендации</CardTitle>
        <CardDescription>Что стоит сделать в первую очередь</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`rounded-full p-1.5 mt-0.5 ${
                  rec.completed
                    ? "bg-green-100 text-green-600"
                    : rec.priority === 1
                    ? "bg-red-100 text-red-600"
                    : rec.priority === 2
                    ? "bg-amber-100 text-amber-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {rec.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
