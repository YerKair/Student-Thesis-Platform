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
      <span className="px-2 py-1 rounded-full bg-gray-100 text-xs mt-2 inline-block">
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
    title: "Проект",
    description: "Прогресс 40%",
    icon: <BookOpen className="h-5 w-5" />,
    value: <Progress value={40} className="h-2 w-full mt-2" />,
    color: "bg-green-500",
    link: "/dashboard/thesis",
  },
];

export default function DashboardStats() {
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
