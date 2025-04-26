"use client";

import { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Loader2, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";
import { useAuthContext } from "@/app/providers/auth-provider";

// Тип пользователя из API
interface ApiUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// Моковые данные для тестирования
const mockUsers: ApiUser[] = [
  {
    id: 1,
    email: "admin@diplom.ru",
    full_name: "Администратор Системы",
    role: "admin",
    is_active: true,
    created_at: "2025-01-10T12:00:00.000Z",
  },
  {
    id: 2,
    email: "ivanov@student.ru",
    full_name: "Иванов Иван Иванович",
    role: "student",
    is_active: true,
    created_at: "2025-02-15T14:30:00.000Z",
  },
  {
    id: 3,
    email: "petrova@teacher.ru",
    full_name: "Петрова Анна Сергеевна",
    role: "teacher",
    is_active: true,
    created_at: "2025-01-20T10:15:00.000Z",
  },
  {
    id: 4,
    email: "sidorov@student.ru",
    full_name: "Сидоров Павел Николаевич",
    role: "student",
    is_active: false,
    created_at: "2025-03-05T09:45:00.000Z",
  },
  {
    id: 5,
    email: "kuznetsov@supervisor.ru",
    full_name: "Кузнецов Дмитрий Алексеевич",
    role: "supervisor",
    is_active: true,
    created_at: "2025-02-01T16:20:00.000Z",
  },
  {
    id: 6,
    email: "smirnova@student.ru",
    full_name: "Смирнова Елена Владимировна",
    role: "student",
    is_active: true,
    created_at: "2025-03-15T11:10:00.000Z",
  },
  {
    id: 7,
    email: "novikov@teacher.ru",
    full_name: "Новиков Артем Игоревич",
    role: "teacher",
    is_active: true,
    created_at: "2025-01-25T13:40:00.000Z",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { token } = useAuthContext();
  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    // Для тестирования используем мок-данные вместо API
    setIsLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 800); // Имитируем задержку загрузки

    /* Реальный код для подключения к API (закомментирован)
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Не удалось получить список пользователей");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось загрузить список пользователей",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
    */
  }, [token, toast]);

  const handleChangeRole = async (userId: number, newRole: string) => {
    // Для тестирования обновляем локальный state
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast({
        title: "Успешно",
        description: `Роль пользователя изменена на ${newRole}`,
      });

      /* Реальный код для API (закомментирован)
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error(`Не удалось изменить роль пользователя`);
      }
      */
    } catch (error) {
      console.error("Ошибка при изменении роли:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось изменить роль пользователя",
      });
    }
  };

  const handleToggleActive = async (userId: number, isActive: boolean) => {
    // Для тестирования обновляем локальный state
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_active: !isActive } : user
        )
      );

      toast({
        title: "Успешно",
        description: `Пользователь ${
          !isActive ? "активирован" : "деактивирован"
        }`,
      });

      /* Реальный код для API (закомментирован)
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}/active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: !isActive }),
      });

      if (!response.ok) {
        throw new Error(`Не удалось изменить статус пользователя`);
      }
      */
    } catch (error) {
      console.error("Ошибка при изменении статуса:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось изменить статус пользователя",
      });
    }
  };

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция для форматирования даты
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

  // Список возможных ролей
  const availableRoles = ["admin", "student", "teacher", "supervisor"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <CardDescription>
            Просмотр и управление пользователями системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Поиск пользователей..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Добавить пользователя
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "admin"
                                ? "destructive"
                                : user.role === "teacher"
                                ? "outline"
                                : user.role === "supervisor"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.is_active ? "success" : "destructive"}
                          >
                            {user.is_active ? "Активен" : "Неактивен"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Открыть меню</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  console.log("Просмотр профиля", user.id)
                                }
                              >
                                Просмотр профиля
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleToggleActive(user.id, user.is_active)
                                }
                              >
                                {user.is_active
                                  ? "Деактивировать"
                                  : "Активировать"}
                              </DropdownMenuItem>
                              {availableRoles.map((role) => (
                                <DropdownMenuItem
                                  key={role}
                                  onClick={() =>
                                    handleChangeRole(user.id, role)
                                  }
                                  disabled={user.role === role}
                                >
                                  Назначить роль: {role}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Пользователи не найдены
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
