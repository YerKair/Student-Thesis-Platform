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
import { useProfileCompletion } from "@/features/dashboard/hooks/use-profile-completion";
import { useContracts } from "@/features/dashboard/hooks/use-contracts";
import { useAuthContext } from "@/app/providers/auth-provider";

export default function DashboardStats() {
  const { user, token } = useAuthContext();
  const {
    team,
    projectProgress,
    isInTeam,
    hasProject,
    isLoading: dashboardLoading,
  } = useDashboardData();
  const { completionPercentage, isLoading: profileLoading } =
    useProfileCompletion(token);
  const { stats: contractsStats, isLoading: contractsLoading } =
    useContracts(token);

  const isLoading = dashboardLoading || profileLoading || contractsLoading;

  // Проверяем, является ли пользователь студентом
  const isStudent =
    user &&
    ((user.roles && user.roles.includes("student")) || user.role === "student");

  // Функция для получения описания договоров
  const getContractsDescription = () => {
    if (contractsLoading) return "Загрузка...";
    if (!contractsStats.hasContracts) return "Нет договоров";

    const { pending, approved, draft, rejected, signed } = contractsStats;

    if (pending > 0) {
      return `${pending} ожидает подписания`;
    } else if (signed > 0) {
      return `${signed} подписан${signed > 1 ? "о" : ""}`;
    } else if (approved > 0) {
      return `${approved} одобрен${approved > 1 ? "о" : ""}`;
    } else if (draft > 0) {
      return `${draft} черновик${draft > 1 ? "ов" : ""}`;
    } else if (rejected > 0) {
      return `${rejected} отклонен${rejected > 1 ? "о" : ""}`;
    }

    return `Всего: ${contractsStats.total}`;
  };

  // Функция для получения значения карточки договоров
  const getContractsValue = () => {
    if (contractsLoading) {
      return <div className="h-2 bg-gray-200 rounded animate-pulse mt-2"></div>;
    }

    if (!contractsStats.hasContracts) {
      return (
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs mt-2 inline-block">
          Нет договоров
        </span>
      );
    }

    const { pending, approved, draft, rejected, signed } = contractsStats;

    if (pending > 0) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="text-sm text-gray-600">Требуется подпись</span>
        </div>
      );
    } else if (signed > 0) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600">Подписано</span>
        </div>
      );
    } else if (approved > 0) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-600">Одобрено</span>
        </div>
      );
    } else if (draft > 0) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600">Черновик</span>
        </div>
      );
    } else if (rejected > 0) {
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          <span className="text-sm text-gray-600">Отклонено</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="h-2 w-2 rounded-full bg-gray-500"></span>
        <span className="text-sm text-gray-600">Договоры</span>
      </div>
    );
  };

  // Функция для получения цвета карточки договоров
  const getContractsColor = () => {
    if (contractsLoading || !contractsStats.hasContracts) return "bg-gray-400";

    const { pending, approved, rejected, signed } = contractsStats;

    if (pending > 0) return "bg-amber-500";
    if (signed > 0) return "bg-blue-500";
    if (approved > 0) return "bg-green-500";
    if (rejected > 0) return "bg-red-500";

    return "bg-blue-500";
  };

  // Если не студент, показываем базовую статистику
  if (!isStudent) {
    const defaultStats = [
      {
        title: "Профиль",
        description: `Заполнено на ${completionPercentage}%`,
        icon: <User className="h-5 w-5" />,
        value: (
          <Progress value={completionPercentage} className="h-2 w-full mt-2" />
        ),
        color:
          completionPercentage >= 80
            ? "bg-green-500"
            : completionPercentage >= 50
            ? "bg-blue-500"
            : "bg-red-500",
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
        description: getContractsDescription(),
        icon: <FileText className="h-5 w-5" />,
        value: getContractsValue(),
        color: getContractsColor(),
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
      description: `Заполнено на ${completionPercentage}%`,
      icon: <User className="h-5 w-5" />,
      value: (
        <Progress value={completionPercentage} className="h-2 w-full mt-2" />
      ),
      color:
        completionPercentage >= 80
          ? "bg-green-500"
          : completionPercentage >= 50
          ? "bg-blue-500"
          : "bg-red-500",
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
      description: getContractsDescription(),
      icon: <FileText className="h-5 w-5" />,
      value: getContractsValue(),
      color: getContractsColor(),
      link: "/dashboard/contracts",
    },
    {
      title: "Проект",
      description: getProjectDescription(),
      icon: <BookOpen className="h-5 w-5" />,
      value: getProjectValue(),
      color:
        hasProject && projectProgress
          ? projectProgress.progressPercentage >= 75
            ? "bg-green-500"
            : projectProgress.progressPercentage >= 25
            ? "bg-blue-500"
            : "bg-amber-500"
          : "bg-gray-400",
      link: "/dashboard/thesis",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="overflow-hidden transition-shadow">
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
