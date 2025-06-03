"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { TeamsService } from "@/features/teams/api/teams-service";
import { Team } from "@/entities/team/model/types";
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
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { Info, User, UserPlus, UserMinus } from "lucide-react";
import { toast } from "sonner";

export default function SupervisorPage() {
  const { user, token } = useAuthContext();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsWithoutSupervisor, setTeamsWithoutSupervisor] = useState<Team[]>(
    []
  );
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isTeamDetailsDialogOpen, setIsTeamDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myTeams = teams.filter(
    (team) => team.supervisor_id === Number(user?.id)
  );

  useEffect(() => {
    if (!token) {
      toast.error("Необходима авторизация");
      return;
    }

    const fetchTeams = async () => {
      try {
        const [allTeams, availableTeams, supervisedTeams] = await Promise.all([
          TeamsService.getTeams(token),
          TeamsService.getAvailableTeams(token),
          TeamsService.getMySupervisedTeams(token),
        ]);

        // Убираем дубликаты при установке начального состояния
        setTeams(
          allTeams.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          )
        );
        setTeamsWithoutSupervisor(
          availableTeams.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          )
        );
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast.error("Ошибка при загрузке команд");
      }
    };

    if (token) {
      fetchTeams();
    }
  }, [token]);

  const handleTakeTeam = async (team: Team) => {
    if (!token) return;

    try {
      const updatedTeam = await TeamsService.assignSupervisor(team.id, token);
      setTeams((prev) => prev.map((t) => (t.id === team.id ? updatedTeam : t)));
      setTeamsWithoutSupervisor((prev) => prev.filter((t) => t.id !== team.id));
      toast.success("Вы успешно стали руководителем команды");
    } catch (error) {
      console.error("Error taking team:", error);
      toast.error("Не удалось взять команду");
    }
  };

  const handleLeaveTeam = async (teamId: number) => {
    if (!token) {
      toast.error("Необходима авторизация");
      return;
    }

    try {
      await TeamsService.removeSupervisor(teamId, token);

      // Получаем обновленные списки команд
      const [allTeams, availableTeams, supervisedTeams] = await Promise.all([
        TeamsService.getTeams(token),
        TeamsService.getAvailableTeams(token),
        TeamsService.getMySupervisedTeams(token),
      ]);

      // Обновляем состояния, убедившись что нет дубликатов
      setTeams(
        allTeams.filter(
          (team, index, self) =>
            index === self.findIndex((t) => t.id === team.id)
        )
      );
      setTeamsWithoutSupervisor(
        availableTeams.filter(
          (team, index, self) =>
            index === self.findIndex((t) => t.id === team.id)
        )
      );

      toast.success("Вы успешно отказались от руководства командой");
    } catch (error: any) {
      console.error("Error leaving team:", error);

      if (!token) {
        toast.error("Необходима авторизация");
        return;
      }

      // Если ошибка связана с отсутствием прав, показываем соответствующее сообщение
      if (
        error.message.includes(
          "Only team supervisor or admin can remove supervisor"
        )
      ) {
        toast.error("У вас нет прав для выполнения этого действия");
      }
      // Если команда не найдена, обновляем списки команд
      else if (error.message.includes("Not Found")) {
        const [allTeams, availableTeams, supervisedTeams] = await Promise.all([
          TeamsService.getTeams(token),
          TeamsService.getAvailableTeams(token),
          TeamsService.getMySupervisedTeams(token),
        ]);

        setTeams(
          allTeams.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          )
        );
        setTeamsWithoutSupervisor(
          availableTeams.filter(
            (team, index, self) =>
              index === self.findIndex((t) => t.id === team.id)
          )
        );

        toast.success("Список команд обновлен");
      } else {
        toast.error("Произошла ошибка при отказе от руководства командой");
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Управление командами</h1>

      <Tabs defaultValue="my-teams" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="my-teams">Мои команды</TabsTrigger>
          <TabsTrigger value="available">Доступные команды</TabsTrigger>
          <TabsTrigger value="all-teams">Все команды</TabsTrigger>
        </TabsList>

        <TabsContent value="my-teams">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Мои команды</CardTitle>
              <CardDescription>Команды, которыми вы руководите</CardDescription>
            </CardHeader>
            <CardContent>
              {myTeams.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  У вас пока нет команд. Вы можете взять команду на руководство
                  во вкладке "Доступные команды"
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Участники</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myTeams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">
                          {team.name}
                        </TableCell>
                        <TableCell>{team.members.length} участников</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTeam(team);
                              setIsTeamDetailsDialogOpen(true);
                            }}
                          >
                            <Info className="h-4 w-4 mr-2" />
                            Детали
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleLeaveTeam(team.id)}
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            Отказаться
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Доступные команды</CardTitle>
              <CardDescription>
                Команды, которые ищут руководителя
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teamsWithoutSupervisor.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Нет доступных команд
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Участники</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamsWithoutSupervisor.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">
                          {team.name}
                        </TableCell>
                        <TableCell>{team.members.length} участников</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTeam(team);
                              setIsTeamDetailsDialogOpen(true);
                            }}
                          >
                            <Info className="h-4 w-4 mr-2" />
                            Детали
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleTakeTeam(team)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Взять команду
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-teams">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Все команды</CardTitle>
              <CardDescription>
                <div className="flex items-center justify-between">
                  <span>Полный список всех команд</span>
                  <Input
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Супервайзер</TableHead>
                    <TableHead>Участники</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>
                        {team.supervisor_name ? (
                          <div className="flex items-center">
                            <span className="mr-2">{team.supervisor_name}</span>
                            {team.supervisor_id === Number(user?.id) && (
                              <Badge variant="secondary" className="text-xs">
                                Вы
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">Не назначен</span>
                        )}
                      </TableCell>
                      <TableCell>{team.members.length} участников</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTeam(team);
                            setIsTeamDetailsDialogOpen(true);
                          }}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Детали
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isTeamDetailsDialogOpen}
        onOpenChange={setIsTeamDetailsDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Информация о команде</DialogTitle>
            <DialogDescription>
              {selectedTeam ? `Детали команды "${selectedTeam.name}"` : ""}
            </DialogDescription>
          </DialogHeader>
          {selectedTeam && (
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <h3 className="font-medium">Название команды</h3>
                <p>{selectedTeam.name}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Участники команды</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedTeam.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col space-y-1 border rounded-md p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">{member.fullname}</span>
                          <span className="text-sm text-muted-foreground">
                            {member.email}
                          </span>
                        </div>
                        <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                          {member.role === "creator" ? "Создатель" : "Участник"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Код команды</h3>
                <p className="font-mono bg-muted p-2 rounded">
                  {selectedTeam.code}
                </p>
              </div>

              {selectedTeam.created_at && (
                <div className="space-y-1">
                  <h3 className="font-medium">Дата создания</h3>
                  <p>
                    {new Date(selectedTeam.created_at).toLocaleDateString(
                      "ru-RU",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
