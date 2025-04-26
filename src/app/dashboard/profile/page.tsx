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
import { User, Mail, Book, Calendar, School } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    specialization: "Разработка программного обеспечения",
    course: "4",
    group: "ИСП-405",
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

  // Массив полей профиля
  const profileFields = [
    {
      id: "name",
      label: "ФИО",
      value: formState.name,
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "email",
      label: "Email",
      value: formState.email,
      icon: <Mail className="h-4 w-4" />,
    },
    {
      id: "specialization",
      label: "Специальность",
      value: formState.specialization,
      icon: <Book className="h-4 w-4" />,
    },
    {
      id: "course",
      label: "Курс",
      value: formState.course,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "group",
      label: "Группа",
      value: formState.group,
      icon: <School className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6 m-15">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Профиль
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Управление личной информацией
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Карточка профиля */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Личные данные</CardTitle>
                <CardDescription>
                  Управляйте информацией вашего профиля
                </CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {profileFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label
                        htmlFor={field.id}
                        className="flex items-center gap-2"
                      >
                        {field.icon}
                        {field.label}
                      </Label>
                      {field.id === "email" ? (
                        <Input
                          id={field.id}
                          name={field.id}
                          type="email"
                          value={field.value}
                          onChange={handleChange}
                          disabled={!isEditing || field.id === "email"}
                          className="bg-gray-50"
                        />
                      ) : (
                        <Input
                          id={field.id}
                          name={field.id}
                          value={field.value}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Роль */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Роль
                  </Label>
                  <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {user?.role === "student"
                      ? "Студент"
                      : user?.role === "teacher"
                      ? "Преподаватель"
                      : "Администратор"}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Отмена
                    </Button>
                    <Button type="submit">Сохранить</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Карточка безопасности */}
        <div>
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
                className="w-full"
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
    </div>
  );
}
