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

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки успешно сохранены",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
        <p className="text-muted-foreground">
          Управление настройками вашей учетной записи
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Аккаунт</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
              <CardDescription>
                Управление основными настройками вашего аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">
                      Двухфакторная аутентификация
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Повысьте безопасность вашего аккаунта с помощью 2FA
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="activity-log">Журнал активности</Label>
                    <p className="text-sm text-muted-foreground">
                      Сохранять историю ваших действий в системе
                    </p>
                  </div>
                  <Switch id="activity-log" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-profile">Публичный профиль</Label>
                    <p className="text-sm text-muted-foreground">
                      Ваш профиль будет виден другим пользователям
                    </p>
                  </div>
                  <Switch id="public-profile" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Настройка способов и типов уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">
                      Email уведомления
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления на почту
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser-notifications">
                      Браузерные уведомления
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Показывать уведомления в браузере
                    </p>
                  </div>
                  <Switch id="browser-notifications" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="team-notifications">
                      Уведомления о командах
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления об изменениях в командах
                    </p>
                  </div>
                  <Switch id="team-notifications" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contract-notifications">
                      Уведомления о договорах
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о статусе договоров
                    </p>
                  </div>
                  <Switch id="contract-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройка внешнего вида системы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Тема</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="border-2 border-primary p-0 h-16 justify-center"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-full h-8 bg-background"></div>
                      <span className="text-xs">Светлая</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 p-0 h-16 justify-center"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-full h-8 bg-black"></div>
                      <span className="text-xs">Темная</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 p-0 h-16 justify-center"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-full h-8 bg-gradient-to-r from-white to-black"></div>
                      <span className="text-xs">Системная</span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Анимации</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить анимации интерфейса
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Компактный режим</Label>
                    <p className="text-sm text-muted-foreground">
                      Уменьшить размер элементов интерфейса
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
