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
import { useState } from "react";

export default function TeamsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("join");

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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Команды
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Создание и управление командами для дипломных проектов
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <Tabs
          defaultValue="join"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="join" className="flex-1 sm:flex-none">
                Присоединиться
              </TabsTrigger>
              <TabsTrigger value="create" className="flex-1 sm:flex-none">
                Создать команду
              </TabsTrigger>
              <TabsTrigger value="my-team" className="flex-1 sm:flex-none">
                Моя команда
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="join" className="mt-4">
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="team-code"
                      placeholder="Например: ABC123"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleJoinTeam}
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Присоединиться
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Создать новую команду</CardTitle>
                <CardDescription>
                  Создайте команду и пригласите участников для работы над
                  дипломом
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Название команды</Label>
                  <Input
                    id="team-name"
                    placeholder="Введите название команды"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Описание</Label>
                  <Input
                    id="team-description"
                    placeholder="Краткое описание команды"
                  />
                </div>
                <div className="pt-4">
                  <Button
                    onClick={handleCreateTeam}
                    className="w-full sm:w-auto"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Создать команду
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-team" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Моя команда</CardTitle>
                <CardDescription>У вас пока нет команды</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Users className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-center text-gray-600 max-w-md">
                  Присоединитесь к команде или создайте свою для совместной
                  работы над дипломным проектом
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("join")}
                  className="w-full sm:w-auto"
                >
                  Присоединиться к команде
                </Button>
                <Button
                  onClick={() => setActiveTab("create")}
                  className="w-full sm:w-auto"
                >
                  Создать команду
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
