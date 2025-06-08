"use client";

import { useAuthContext } from "@/app/providers/auth-provider";
import { useProfile } from "@/features/auth/lib/use-profile";
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
import { useState, useEffect } from "react";
import { User, Mail, Book, Calendar, School, Lock } from "lucide-react";
import { UserProfileResponse } from "@/entities/user/model/types";

export default function ProfilePage() {
  const { user, token } = useAuthContext();
  const { toast } = useToast();
  const { getProfile, updateProfile, changePassword, isLoading } =
    useProfile(token);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [formState, setFormState] = useState({
    fullname: "",
    specialization: "",
    course: "",
    group: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Загружаем профиль при монтировании компонента
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setProfile(profileData);
          setFormState({
            fullname: profileData.fullname || "",
            specialization: profileData.specialization || "",
            course: profileData.course || "",
            group: profileData.group || "",
          });
        }
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить профиль",
          variant: "destructive",
        });
      }
    };

    if (token) {
      loadProfile();
    }
  }, [token, getProfile, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedProfile = await updateProfile({
        fullname: formState.fullname,
        specialization: formState.specialization || undefined,
        course: formState.course || undefined,
        group: formState.group || undefined,
      });

      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditing(false);
        toast({
          title: "Профиль обновлен",
          description: "Ваши данные успешно сохранены",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.new_password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive",
      });
      return;
    }

    try {
      await changePassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      toast({
        title: "Пароль изменен",
        description: "Ваш пароль успешно изменен",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить пароль. Проверьте текущий пароль.",
        variant: "destructive",
      });
    }
  };

  // Массив полей профиля
  const profileFields = [
    {
      id: "fullname",
      label: "ФИО",
      value: formState.fullname,
      icon: <User className="h-4 w-4" />,
      required: true,
    },
    {
      id: "specialization",
      label: "Специальность",
      value: formState.specialization,
      icon: <Book className="h-4 w-4" />,
      required: false,
    },
    {
      id: "course",
      label: "Курс",
      value: formState.course,
      icon: <Calendar className="h-4 w-4" />,
      required: false,
    },
    {
      id: "group",
      label: "Группа",
      value: formState.group,
      icon: <School className="h-4 w-4" />,
      required: false,
    },
  ];

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
                <Button onClick={() => setIsEditing(true)} disabled={isLoading}>
                  Редактировать
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email (только для чтения) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled={true}
                    className="bg-gray-50"
                  />
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {profileFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label
                        htmlFor={field.id}
                        className="flex items-center gap-2"
                      >
                        {field.icon}
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                      <Input
                        id={field.id}
                        name={field.id}
                        value={field.value}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required={field.required}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  ))}
                </div>

                {/* Роль (только для чтения) */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Роль
                  </Label>
                  <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {profile.roles
                      .map((role) => {
                        switch (role) {
                          case "student":
                            return "Студент";
                          case "supervisor":
                            return "Научный руководитель";
                          case "reviewer":
                            return "Рецензент";
                          case "admin":
                            return "Администратор";
                          default:
                            return role;
                        }
                      })
                      .join(", ")}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Сохранение..." : "Сохранить"}
                    </Button>
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
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Текущий пароль
                  </Label>
                  <Input
                    id="current-password"
                    name="current_password"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="new-password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Новый пароль
                  </Label>
                  <Input
                    id="new-password"
                    name="new_password"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Подтверждение пароля
                  </Label>
                  <Input
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Изменение..." : "Сменить пароль"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
