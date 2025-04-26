"use client";

import { useState } from "react";
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
import { Badge } from "@/shared/ui/badge";
import { Loader2 } from "lucide-react";

// Типы ролей и их описания
const roles = [
  {
    id: "admin",
    name: "Администратор",
    description: "Полный доступ ко всем функциям системы",
    permissions: [
      "Управление пользователями",
      "Управление ролями",
      "Управление проектами",
      "Настройки системы",
      "Доступ к аналитике",
    ],
  },
  {
    id: "student",
    name: "Студент",
    description: "Базовая роль для студентов, выполняющих дипломные работы",
    permissions: [
      "Просмотр заданий",
      "Загрузка материалов",
      "Общение с руководителем",
      "Просмотр оценок и комментариев",
    ],
  },
  {
    id: "teacher",
    name: "Преподаватель",
    description: "Роль для преподавателей, проверяющих работы студентов",
    permissions: [
      "Просмотр студенческих работ",
      "Оценка работ",
      "Добавление комментариев",
      "Создание заданий",
      "Общение со студентами",
    ],
  },
  {
    id: "supervisor",
    name: "Научный руководитель",
    description: "Роль для научных руководителей дипломных работ",
    permissions: [
      "Назначение заданий",
      "Просмотр и проверка работ",
      "Общение со студентами",
      "Утверждение работ к защите",
      "Оценка прогресса студентов",
    ],
  },
];

export default function AdminRolesPage() {
  const [isLoading] = useState(false);

  // Определение цвета для бейджа роли
  const getRoleBadgeVariant = (roleId: string) => {
    switch (roleId) {
      case "admin":
        return "destructive";
      case "teacher":
        return "outline";
      case "supervisor":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Роли и привилегии</CardTitle>
          <CardDescription>
            Информация о ролях пользователей и их правах доступа
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Роль</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead>Привилегии</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <Badge
                            variant={getRoleBadgeVariant(role.id)}
                            className="w-fit mb-1"
                          >
                            {role.id}
                          </Badge>
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5 space-y-1">
                          {role.permissions.map((permission, index) => (
                            <li key={index} className="text-sm">
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
