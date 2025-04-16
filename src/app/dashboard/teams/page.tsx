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
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Users, UserPlus, ExternalLink } from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";

export default function TeamsPage() {
  const { toast } = useToast();

  const handleCreateTeam = () => {
    toast({
      title: "Внимание",
      description: "Функция создания команды пока в разработке",
    });
  };

  const handleJoinTeam = () => {
    toast({
      title: "Внимание",
      description: "Функция присоединения к команде пока в разработке",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Команды</h1>
        <p className="text-muted-foreground">
          Создание и управление командами для дипломных проектов
        </p>
      </div>

      <Tabs defaultValue="join" className="space-y-4">
        <TabsList>
          <TabsTrigger value="join">Присоединиться</TabsTrigger>
          <TabsTrigger value="create">Создать команду</TabsTrigger>
          <TabsTrigger value="my-team">Моя команда</TabsTrigger>
        </TabsList>

        <TabsContent value="join" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Присоединиться к команде</CardTitle>
              <CardDescription>
                Введите код приглашения, чтобы присоединиться к существующей
                команде
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-code">Код команды</Label>
                <Input id="team-code" placeholder="Например: ABC123" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleJoinTeam}>
                <UserPlus className="mr-2 h-4 w-4" />
                Присоединиться
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Создать новую команду</CardTitle>
              <CardDescription>
                Создайте команду и пригласите участников для работы над дипломом
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Название команды</Label>
                <Input id="team-name" placeholder="Введите название команды" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-description">Описание</Label>
                <Input
                  id="team-description"
                  placeholder="Краткое описание команды"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateTeam}>
                <Users className="mr-2 h-4 w-4" />
                Создать команду
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Моя команда</CardTitle>
              <CardDescription>У вас пока нет команды</CardDescription>
            </CardHeader>
            <CardContent className="h-[150px] flex items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  Присоединитесь к команде или создайте свою
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.querySelector(
                    'button[value="join"]'
                  );
                  if (element instanceof HTMLButtonElement) {
                    element.click();
                  }
                }}
              >
                Присоединиться к команде
              </Button>

              <Button
                onClick={() => {
                  const element = document.querySelector(
                    'button[value="create"]'
                  );
                  if (element instanceof HTMLButtonElement) {
                    element.click();
                  }
                }}
              >
                Создать команду
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
