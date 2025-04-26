"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useToast } from "@/shared/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Общие настройки
  const [siteName, setSiteName] = useState("Диплом.Платформа");
  const [siteDescription, setSiteDescription] = useState(
    "Цифровое сопровождение дипломных работ"
  );
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Email настройки
  const [smtpHost, setSmtpHost] = useState("smtp.example.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("no-reply@example.com");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [emailFrom, setEmailFrom] = useState(
    "Диплом.Платформа <no-reply@example.com>"
  );

  // Настройки пользователей
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailConfirmation, setEmailConfirmation] = useState(true);
  const [defaultUserRole, setDefaultUserRole] = useState("student");

  // Обработчик сохранения настроек
  const handleSaveSettings = (tab: string) => {
    setIsLoading(true);

    // Имитация сохранения настроек
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Настройки сохранены",
        description: `Настройки раздела "${tab}" успешно сохранены`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
        </TabsList>

        {/* Общие настройки */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>
                Настройки названия и описания системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Название системы</Label>
                <Input
                  id="site-name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Описание системы</Label>
                <Input
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
                <Label htmlFor="maintenance-mode">Режим обслуживания</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("Общие")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Сохранение...</span>
                  </div>
                ) : (
                  "Сохранить настройки"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email настройки */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Настройки Email</CardTitle>
              <CardDescription>
                Настройки SMTP-сервера для отправки писем
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Хост</Label>
                  <Input
                    id="smtp-host"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Порт</Label>
                  <Input
                    id="smtp-port"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Пользователь</Label>
                  <Input
                    id="smtp-user"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Пароль</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-from">Email отправителя</Label>
                <Input
                  id="email-from"
                  value={emailFrom}
                  onChange={(e) => setEmailFrom(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("Email")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Сохранение...</span>
                  </div>
                ) : (
                  "Сохранить настройки"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки пользователей */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Настройки пользователей</CardTitle>
              <CardDescription>
                Настройки регистрации и управления пользователями
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow-registration"
                  checked={allowRegistration}
                  onCheckedChange={setAllowRegistration}
                />
                <Label htmlFor="allow-registration">
                  Разрешить регистрацию новых пользователей
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-confirmation"
                  checked={emailConfirmation}
                  onCheckedChange={setEmailConfirmation}
                />
                <Label htmlFor="email-confirmation">
                  Требовать подтверждение email
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-role">Роль по умолчанию</Label>
                <select
                  id="default-role"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={defaultUserRole}
                  onChange={(e) => setDefaultUserRole(e.target.value)}
                >
                  <option value="student">Студент</option>
                  <option value="teacher">Преподаватель</option>
                  <option value="supervisor">Научный руководитель</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("Пользователи")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Сохранение...</span>
                  </div>
                ) : (
                  "Сохранить настройки"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
