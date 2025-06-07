"use client";

import { User, FileText, Users, BookOpen } from "lucide-react";
import { Progress } from "@/shared/ui/progress";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { useAuthContext } from "@/app/providers/auth-provider";

export default function DashboardStats() {
  const { user } = useAuthContext();
  const { team, projectProgress, isInTeam, hasProject, isLoading } =
    useDashboardData();

  // Проверяем, является ли пользователь студентом
  const isStudent =
    user &&
    ((user.roles && user.roles.includes("student")) || user.role === "student");

  // Если не студент, показываем базовую статистику
  if (!isStudent) {
    const defaultStats = [
      {
        title: "Профиль",
        description: "Заполнено на 75%",
        icon: <User className="h-5 w-5" />,
        value: <Progress value={75} className="h-2 w-full mt-2" />,
        color: "bg-blue-500",
        link: "/dashboard/profile",
      },
      {
        title: "Команда",
        description: "Доступно для студентов",
        icon: <Users className="h-5 w-5" />,
        value: (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-xs mt-2 inline-block">
            Недоступно
          </span>
        ),
        color: "bg-gray-400",
        link: "/dashboard/teams",
      },
      {
        title: "Договоры",
        description: "1 ожидает подписания",
        icon: <FileText className="h-5 w-5" />,
        value: (
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span className="text-sm text-gray-600">Требуется подпись</span>
          </div>
        ),
        color: "bg-amber-500",
        link: "/dashboard/contracts",
      },
      {
        title: "Проект",
        description: "Доступно для студентов",
        icon: <BookOpen className="h-5 w-5" />,
        value: (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-xs mt-2 inline-block">
            Недоступно
          </span>
        ),
        color: "bg-gray-400",
        link: "/dashboard/thesis",
      },
    ];

    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {defaultStats.map((stat, i) => (
          <Card key={i} className="overflow-hidden transition-shadow">
            <div className={`h-1 w-full ${stat.color}`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="rounded-full p-2 bg-blue-50 text-blue-600">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">
                {stat.description}
              </CardDescription>
              {stat.value}
              <Button variant="link" size="sm" asChild className="mt-3 p-0">
                <Link href={stat.link}>Подробнее</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Для студентов показываем динамическую статистику
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-1 w-full bg-gray-200 animate-pulse"></div>
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getTeamDescription = () => {
    if (!isInTeam) {
      return "Не состоите в команде";
    }
    if (team?.members) {
      const memberCount = team.members.length;
      return `${memberCount} ${
        memberCount === 1
          ? "участник"
          : memberCount < 5
          ? "участника"
          : "участников"
      }`;
    }
    return "В команде";
  };

  const getTeamValue = () => {
    if (!isInTeam) {
      return (
        <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs mt-2 inline-block">
          Требуется действие
        </span>
      );
    }
    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span className="text-sm text-gray-600">{team?.name}</span>
      </div>
    );
  };

  const getProjectDescription = () => {
    if (!hasProject || !projectProgress) {
      return "Проект не создан";
    }
    return `Прогресс ${projectProgress.progressPercentage}%`;
  };

  const getProjectValue = () => {
    if (!hasProject || !projectProgress) {
      return (
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs mt-2 inline-block">
          Нет проекта
        </span>
      );
    }
    return (
      <Progress
        value={projectProgress.progressPercentage}
        className="h-2 w-full mt-2"
      />
    );
  };

  const stats = [
    {
      title: "Профиль",
      description: "Заполнено на 75%",
      icon: <User className="h-5 w-5" />,
      value: <Progress value={75} className="h-2 w-full mt-2" />,
      color: "bg-blue-500",
      link: "/dashboard/profile",
    },
    {
      title: "Команда",
      description: getTeamDescription(),
      icon: <Users className="h-5 w-5" />,
      value: getTeamValue(),
      color: isInTeam ? "bg-green-500" : "bg-red-500",
      link: "/dashboard/teams",
    },
    {
      title: "Договоры",
      description: "1 ожидает подписания",
      icon: <FileText className="h-5 w-5" />,
      value: (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="text-sm text-gray-600">Требуется подпись</span>
        </div>
      ),
      color: "bg-amber-500",
      link: "/dashboard/contracts",
    },
    {
      title: "Проект",
      description: getProjectDescription(),
      icon: <BookOpen className="h-5 w-5" />,
      value: getProjectValue(),
      color: hasProject ? "bg-green-500" : "bg-gray-400",
      link: "/dashboard/thesis",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="overflow-hidden transition-shadow hover:shadow-md"
        >
          <div className={`h-1 w-full ${stat.color}`}></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="rounded-full p-2 bg-blue-50 text-blue-600">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">
              {stat.description}
            </CardDescription>
            {stat.value}
            <Button variant="link" size="sm" asChild className="mt-3 p-0">
              <Link href={stat.link}>Подробнее</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
