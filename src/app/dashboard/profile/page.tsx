"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // В реальном приложении здесь был бы API-запрос на обновление данных
    console.log("Форма отправлена:", formState);

    // Имитация успешного сохранения
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Профиль обновлен",
        description: "Ваши данные успешно сохранены",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Профиль</h1>
        <p className="text-muted-foreground">Управление личной информацией</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>
              Управляйте информацией вашего профиля
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ФИО</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль</Label>
                <Input
                  id="role"
                  value={
                    user?.role === "student"
                      ? "Студент"
                      : user?.role === "teacher"
                      ? "Преподаватель"
                      : "Администратор"
                  }
                  disabled
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSubmit}>Сохранить</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>
            <CardDescription>
              Управление паролем и безопасностью аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтверждение пароля</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                toast({
                  title: "Внимание",
                  description: "Функция смены пароля пока недоступна",
                  variant: "destructive",
                });
              }}
            >
              Сменить пароль
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
