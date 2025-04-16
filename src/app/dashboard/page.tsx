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
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Progress } from "@/shared/ui/progress";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthContext();

  const stats = [
    {
      title: "Профиль",
      description: "Заполнено на 75%",
      icon: <User className="h-5 w-5" />,
      value: <Progress value={75} className="h-2 w-full mt-2" />,
      color: "from-blue-500 to-blue-600",
      link: "/dashboard/profile",
    },
    {
      title: "Команда",
      description: "Не состоите в команде",
      icon: <Users className="h-5 w-5" />,
      value: (
        <Badge variant="outline" className="mt-2">
          Требуется действие
        </Badge>
      ),
      color: "from-purple-500 to-purple-600",
      link: "/dashboard/teams",
    },
    {
      title: "Договоры",
      description: "1 ожидает подписания",
      icon: <FileText className="h-5 w-5" />,
      value: (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="text-sm text-muted-foreground">
            Требуется подпись
          </span>
        </div>
      ),
      color: "from-amber-500 to-amber-600",
      link: "/dashboard/contracts",
    },
    {
      title: "Дипломная работа",
      description: "Прогресс 40%",
      icon: <BookOpen className="h-5 w-5" />,
      value: <Progress value={40} className="h-2 w-full mt-2" />,
      color: "from-green-500 to-green-600",
      link: "/dashboard/thesis",
    },
  ];

  // Ближайшие события
  const events = [
    {
      title: "Встреча с научным руководителем",
      date: "18 апреля, 15:00",
      status: "upcoming",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Дедлайн подачи первой главы",
      date: "25 апреля, 23:59",
      status: "warning",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Предзащита дипломной работы",
      date: "10 мая, 12:00",
      status: "upcoming",
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ];

  // Активности
  const activities = [
    {
      title: "Вы добавлены в команду",
      description: "Андрей Петров добавил вас в команду «Разработчики»",
      time: "2 часа назад",
    },
    {
      title: "Договор подписан",
      description: "Договор о прохождении практики подписан всеми сторонами",
      time: "Вчера, 15:42",
    },
    {
      title: "Добро пожаловать в систему",
      description: "Вы успешно зарегистрировались в системе",
      time: "15 апреля, 10:00",
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

  // Анимация для карточек
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Добро пожаловать, {user?.name.split(" ")[0] || "пользователь"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Здесь вы можете отслеживать прогресс вашей дипломной работы
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="overflow-hidden hover-card-effect">
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${stat.color}`}
              ></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 bg-primary/10 text-primary`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
                {stat.value}
                <Button variant="link" size="sm" asChild className="mt-4 px-0">
                  <Link href={stat.link}>Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Ближайшие события */}
        <Card className="md:col-span-2 lg:col-span-2 hover-card-effect">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Ближайшие события</CardTitle>
              <CardDescription>
                График предстоящих дедлайнов и встреч
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Все события
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div
                    className={`rounded-full p-2 ${
                      event.status === "warning"
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Подробнее
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Карточка рекомендаций */}
        <Card className="hover-card-effect bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Рекомендации</CardTitle>
            </div>
            <CardDescription>
              Что стоит сделать в первую очередь
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-primary/20 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {rec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Последние активности */}
      <Card className="hover-card-effect">
        <CardHeader>
          <CardTitle>Последние активности</CardTitle>
          <CardDescription>История ваших действий в системе</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-muted">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="absolute mt-1 h-2 w-2 rounded-full bg-primary ring-4 ring-background"></div>
                <div className="pl-8">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
