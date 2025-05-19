"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { useToast } from "@/shared/ui/use-toast";
import { Search, UserPlus, Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Пример данных пользователей (в реальности будут загружаться с сервера)
const users = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    email: "ivanov@example.com",
    role: "student",
  },
  {
    id: "2",
    name: "Петров Петр Петрович",
    email: "petrov@example.com",
    role: "teacher",
  },
  {
    id: "3",
    name: "Администратов Админ Админович",
    email: "admin@example.com",
    role: "admin",
  },
];

export default function UsersPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  // Проверка, что пользователь имеет права администратора
  useEffect(() => {
    if (user && user.role !== "admin") {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав для просмотра этой страницы",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
  }, [user, router, toast]);

  const handleAddUser = () => {
    toast({
      title: "Информация",
      description: "Функция добавления пользователя пока в разработке",
    });
  };

  const handleEditUser = (id: string) => {
    toast({
      title: "Информация",
      description: `Редактирование пользователя с ID: ${id} пока в разработке`,
    });
  };

  const handleDeleteUser = (id: string) => {
    toast({
      title: "Информация",
      description: `Удаление пользователя с ID: ${id} пока в разработке`,
    });
  };

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <div className="space-y-6 m-15">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Управление пользователями
        </h1>
        <p className="text-muted-foreground">
          Создание и управление аккаунтами пользователей в системе
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Пользователи системы</CardTitle>
              <CardDescription>
                Список всех зарегистрированных пользователей
              </CardDescription>
            </div>
            <Button onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Добавить пользователя
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск пользователей..." className="pl-8" />
            </div>
            <div className="ml-2">
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">Все роли</option>
                <option value="student">Студенты</option>
                <option value="teacher">Преподаватели</option>
                <option value="admin">Администраторы</option>
              </select>
            </div>
          </div>

          <Table>
            <TableCaption>Список пользователей системы</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "student"
                      ? "Студент"
                      : user.role === "teacher"
                      ? "Преподаватель"
                      : "Администратор"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
