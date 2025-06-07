"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { UsersService } from "@/features/users/api/users-service";
import { User } from "@/entities/user/model/types";
import type { UserRole } from "@/entities/user/model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_ROLES = [
  { value: "student", label: "Студент" },
  { value: "supervisor", label: "Руководитель" },
  { value: "reviewer", label: "Рецензент" },
  { value: "admin", label: "Администратор" },
] as const;

export default function UsersPage() {
  const { token } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const response = await UsersService.getUsers(token);
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Не удалось загрузить список пользователей");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleRoleToggle = async (userId: string, role: UserRole) => {
    if (!token) return;
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const currentRoles = user.roles ?? [user.role];
      let newRoles: UserRole[];

      if (currentRoles.includes(role)) {
        // Не позволяем удалить последнюю роль
        if (currentRoles.length === 1) {
          toast.error("У пользователя должна быть хотя бы одна роль");
          return;
        }
        newRoles = currentRoles.filter((r: UserRole) => r !== role);
      } else {
        newRoles = [...currentRoles, role];
      }

      await UsersService.updateRoles(userId, newRoles, token);
      toast.success("Роли пользователя успешно обновлены");
      await fetchUsers(); // Обновляем список
    } catch (error) {
      console.error("Failed to update user roles:", error);
      toast.error("Не удалось обновить роли пользователя");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Управление пользователями</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роли</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата регистрации</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ROLES.map((role) => {
                    const hasRole = (user.roles ?? [user.role]).includes(
                      role.value as UserRole
                    );
                    return (
                      <Button
                        key={role.value}
                        variant={hasRole ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          handleRoleToggle(user.id, role.value as UserRole)
                        }
                        className="flex items-center gap-1"
                      >
                        {hasRole ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        {role.label}
                      </Button>
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                {user.isActive === undefined
                  ? "Неизвестно"
                  : user.isActive
                  ? "Активный"
                  : "Неактивный"}
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("ru-RU")
                  : "Неизвестно"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
