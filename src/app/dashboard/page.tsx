"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  User,
  FileText,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/shared/ui/progress";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthContext();

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
      description: "Не состоите в команде",
      icon: <Users className="h-5 w-5" />,
      value: (
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs mt-2 inline-block">
          Требуется действие
        </span>
      ),
      color: "bg-purple-500",
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
      title: "Дипломная работа",
      description: "Прогресс 40%",
      icon: <BookOpen className="h-5 w-5" />,
      value: <Progress value={40} className="h-2 w-full mt-2" />,
      color: "bg-green-500",
      link: "/dashboard/thesis",
    },
  ];

  // Ближайшие события
  const events = [
    {
      title: "Встреча с научным руководителем",
      date: "18 апреля, 15:00",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Дедлайн подачи первой главы",
      date: "25 апреля, 23:59",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  // Рекомендации
  const recommendations = [
    {
      title: "Заполните профиль",
      description: "Заполните данные профиля для более эффективной работы",
    },
    {
      title: "Присоединитесь к команде",
      description: "Работа в команде улучшает качество дипломного проекта",
    },
    {
      title: "Подпишите договор",
      description: "Требуется подписать договор о прохождении практики",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Добро пожаловать, {user?.name.split(" ")[0] || "пользователь"}!
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Здесь вы можете отслеживать прогресс вашей дипломной работы
        </p>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
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

      {/* Ближайшие события и рекомендации */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Ближайшие события */}
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
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex"
                    >
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
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full sm:hidden"
            >
              Все события
            </Button>
          </CardContent>
        </Card>

        {/* Рекомендации */}
        <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Рекомендации</CardTitle>
            <CardDescription>
              Что стоит сделать в первую очередь
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-blue-100 text-blue-600 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
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
      </div>
    </div>
  );
}
