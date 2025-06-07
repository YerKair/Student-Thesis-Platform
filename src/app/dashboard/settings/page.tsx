"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";
import { Switch } from "@/shared/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useState } from "react";
import { Check, User, Bell, Lock, Palette, Shield } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("account");

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки успешно сохранены",
    });
  };

  // Настройки безопасности
  const securitySettings = [
    {
      id: "two-factor",
      label: "Двухфакторная аутентификация",
      description: "Повысьте безопасность вашего аккаунта с помощью 2FA",
      defaultChecked: false,
    },
    {
      id: "activity-log",
      label: "Журнал активности",
      description: "Сохранять историю ваших действий в системе",
      defaultChecked: true,
    },
    {
      id: "public-profile",
      label: "Публичный профиль",
      description: "Ваш профиль будет виден другим пользователям",
      defaultChecked: false,
    },
  ];

  // Настройки уведомлений
  const notificationSettings = [
    {
      id: "email-notifications",
      label: "Email уведомления",
      description: "Получать уведомления на почту",
      defaultChecked: true,
    },
    {
      id: "browser-notifications",
      label: "Браузерные уведомления",
      description: "Показывать уведомления в браузере",
      defaultChecked: false,
    },
    {
      id: "team-notifications",
      label: "Уведомления о командах",
      description: "Уведомления об изменениях в командах",
      defaultChecked: true,
    },
    {
      id: "contract-notifications",
      label: "Уведомления о договорах",
      description: "Уведомления о статусе договоров",
      defaultChecked: true,
    },
  ];

  return (
    <div className="space-y-6 m-15">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Настройки
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Управление настройками вашей учетной записи
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <Tabs
          defaultValue="account"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="account" className="flex-1 sm:flex-none">
                <Shield className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Аккаунт
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex-1 sm:flex-none"
              >
                <Bell className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Уведомления
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1 sm:flex-none">
                <Palette className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Внешний вид
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>
                  Управление основными настройками вашего аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="space-y-0.5">
                      <Label
                        htmlFor={setting.id}
                        className="text-base font-medium"
                      >
                        {setting.label}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={setting.id}
                      defaultChecked={setting.defaultChecked}
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
                  className="w-full sm:w-auto"
                >
                  Сохранить настройки
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>
                  Настройка способов и типов уведомлений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="space-y-0.5">
                      <Label
                        htmlFor={setting.id}
                        className="text-base font-medium"
                      >
                        {setting.label}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={setting.id}
                      defaultChecked={setting.defaultChecked}
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
                  className="w-full sm:w-auto"
                >
                  Сохранить настройки
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Внешний вид</CardTitle>
                <CardDescription>
                  Настройка внешнего вида системы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 py-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="animations"
                        className="text-base font-medium"
                      >
                        Анимации
                      </Label>
                      <p className="text-sm text-gray-500">
                        Включить анимации интерфейса
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 py-3 border-b border-gray-100">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="compact-mode"
                        className="text-base font-medium"
                      >
                        Компактный режим
                      </Label>
                      <p className="text-sm text-gray-500">
                        Уменьшить размер элементов интерфейса
                      </p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
                  className="w-full sm:w-auto"
                >
                  Сохранить настройки
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
