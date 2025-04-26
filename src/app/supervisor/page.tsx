"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/shared/ui/use-toast";
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
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Search,
  Calendar,
  AlarmClock,
  User,
  UserPlus,
  UserCheck,
  Info,
} from "lucide-react";
import { Label } from "@/shared/ui/label";
import { useAuthContext } from "@/app/providers/auth-provider";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  topic: string;
  inviteCode: string;
  createdAt: string;
  members: TeamMember[];
  createdBy: string;
  supervisor?: string;
  supervisorId?: string;
  supervisorName?: string;
  progress?: number;
  nextMeeting?: string | null;
}

export default function SupervisorPage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isAddMeetingDialogOpen, setIsAddMeetingDialogOpen] = useState(false);
  const [isTeamDetailsDialogOpen, setIsTeamDetailsDialogOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingNote, setMeetingNote] = useState("");

  useEffect(() => {
    const loadTeams = () => {
      try {
        const teamsFromStorage = localStorage.getItem("teams");
        if (teamsFromStorage) {
          const parsedTeams = JSON.parse(teamsFromStorage);
          const enrichedTeams = parsedTeams.map((team: Team) => ({
            ...team,
            supervisorId: team.supervisorId || "",
            supervisorName: team.supervisorName || "",
            progress: team.progress || Math.floor(Math.random() * 100),
            nextMeeting: team.nextMeeting || null,
          }));
          setTeams(enrichedTeams);
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных о командах:", error);
        setTeams([]);
      }
    };

    loadTeams();
  }, []);

  const mySupervisedTeams = teams.filter(
    (team) => team.supervisorId === user?.id
  );
  const teamsWithoutSupervisor = teams.filter((team) => !team.supervisorId);
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.supervisorName &&
        team.supervisorName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      team.members.some((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Не запланировано";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleTakeTeam = (team: Team) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Необходимо авторизоваться для этого действия",
      });
      return;
    }

    const updatedTeam = {
      ...team,
      supervisorId: user.id,
      supervisorName: user.name || "Супервайзер",
    };
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);

    toast({
      title: "Успех",
      description: `Вы стали супервайзером команды "${team.name}"`,
    });
  };

  const handleLeaveTeam = (team: Team) => {
    if (!user) return;
    const updatedTeam = {
      ...team,
      supervisorId: "",
      supervisorName: "",
    };
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);

    toast({
      title: "Информация",
      description: `Вы больше не являетесь супервайзером команды "${team.name}"`,
    });
  };

  const handleScheduleMeeting = () => {
    if (!selectedTeam) return;
    if (!meetingDate || !meetingTime) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Выберите дату и время встречи",
      });
      return;
    }

    const dateTime = new Date(`${meetingDate}T${meetingTime}`);
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? { ...team, nextMeeting: dateTime.toISOString() }
        : team
    );
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);

    toast({
      title: "Встреча запланирована",
      description: `Встреча для команды "${
        selectedTeam.name
      }" запланирована на ${formatDate(dateTime.toISOString())}`,
    });

    setIsAddMeetingDialogOpen(false);
    setMeetingDate("");
    setMeetingTime("");
    setMeetingNote("");
    setSelectedTeam(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Панель супервайзера</h1>
        </div>

        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Поиск команд..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="my-teams" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="my-teams">Мои команды</TabsTrigger>
          <TabsTrigger value="available-teams">Доступные команды</TabsTrigger>
          <TabsTrigger value="all-teams">Все команды</TabsTrigger>
        </TabsList>

        <TabsContent value="my-teams" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Мои команды</CardTitle>
              <CardDescription>
                Команды, которые вы курируете как супервайзер
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mySupervisedTeams.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-10 w-10 mx-auto mb-3" />
                  <p>
                    У вас пока нет команд для кураторства. Перейдите на вкладку
                    "Доступные команды", чтобы выбрать команду.
                  </p>
                </div>
              ) : (
                <div className="rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Тема</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Участники
                        </TableHead>
                        <TableHead>Прогресс</TableHead>
                        <TableHead>Встреча</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mySupervisedTeams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">
                            {team.name}
                          </TableCell>
                          <TableCell>{team.topic}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {team.members.length} участников
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full rounded-full h-2.5 bg-blue-100">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${team.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">
                                {team.progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {team.nextMeeting ? (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Calendar className="h-3 w-3" />
                                {formatDate(team.nextMeeting)}
                              </Badge>
                            ) : (
                              <Badge variant="outline">Не запланировано</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTeam(team);
                                setIsTeamDetailsDialogOpen(true);
                              }}
                            >
                              <User className="h-4 w-4 mr-2" />
                              Детали
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedTeam(team);
                                setIsAddMeetingDialogOpen(true);
                              }}
                            >
                              <AlarmClock className="h-4 w-4 mr-2" />
                              Встреча
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available-teams" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Доступные команды</CardTitle>
              <CardDescription>
                Команды, которые еще не имеют супервайзера
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teamsWithoutSupervisor.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-10 w-10 mx-auto mb-3" />
                  <p>
                    Нет доступных команд. Все команды уже имеют супервайзеров.
                  </p>
                </div>
              ) : (
                <div className="rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Тема</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Участники
                        </TableHead>
                        <TableHead>Создана</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamsWithoutSupervisor.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">
                            {team.name}
                          </TableCell>
                          <TableCell>{team.topic}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {team.members.length} участников
                          </TableCell>
                          <TableCell>
                            {new Date(team.createdAt).toLocaleDateString(
                              "ru-RU"
                            )}
                          </TableCell>
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-teams" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Все команды</CardTitle>
              <CardDescription>Просмотр всех команд в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Тема</TableHead>
                      <TableHead>Супервайзер</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Участники
                      </TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Команды не найдены
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTeams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">
                            {team.name}
                          </TableCell>
                          <TableCell>{team.topic}</TableCell>
                          <TableCell>
                            {team.supervisorName ? (
                              <div className="flex items-center">
                                <span className="mr-2">
                                  {team.supervisorName}
                                </span>
                                {team.supervisorId === user?.id && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Вы
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span>Не назначен</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {team.members.length} участников
                          </TableCell>
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
                            {team.supervisorId === user?.id ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleLeaveTeam(team)}
                              >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Отказаться
                              </Button>
                            ) : !team.supervisorId ? (
                              <Button
                                size="sm"
                                onClick={() => handleTakeTeam(team)}
                              >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Взять команду
                              </Button>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isAddMeetingDialogOpen}
        onOpenChange={setIsAddMeetingDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Запланировать встречу</DialogTitle>
            <DialogDescription>
              {selectedTeam
                ? `Планирование встречи для команды "${selectedTeam.name}"`
                : "Выберите команду для планирования встречи"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meeting-date" className="text-right">
                Дата
              </Label>
              <Input
                id="meeting-date"
                type="date"
                className="col-span-3"
                value={meetingDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMeetingDate(e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meeting-time" className="text-right">
                Время
              </Label>
              <Input
                id="meeting-time"
                type="time"
                className="col-span-3"
                value={meetingTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMeetingTime(e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meeting-note" className="text-right">
                Примечание
              </Label>
              <Input
                id="meeting-note"
                placeholder="Необязательное примечание"
                className="col-span-3"
                value={meetingNote}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMeetingNote(e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddMeetingDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button type="button" onClick={handleScheduleMeeting}>
              Запланировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

              <div className="space-y-1">
                <h3 className="font-medium">Тема проекта</h3>
                <p>{selectedTeam.topic || "Не указана"}</p>
              </div>

              {selectedTeam.description && (
                <div className="space-y-1">
                  <h3 className="font-medium">Описание</h3>
                  <p className="text-sm">{selectedTeam.description}</p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Участники команды</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTeam.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center p-2 border rounded-md"
                    >
                      <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {member.name}
                        </p>
                        <p className="text-xs truncate">{member.role}</p>
                      </div>
                      {member.id === selectedTeam.createdBy && (
                        <Badge className="ml-2" variant="secondary">
                          Владелец
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">Код приглашения</h3>
                  <Badge variant="outline">{selectedTeam.inviteCode}</Badge>
                </div>

                <div className="space-y-1 text-right">
                  <h3 className="font-medium">Создана</h3>
                  <p>
                    {new Date(selectedTeam.createdAt).toLocaleDateString(
                      "ru-RU"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedTeam && selectedTeam.supervisorId === user?.id ? (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  handleLeaveTeam(selectedTeam);
                  setIsTeamDetailsDialogOpen(false);
                }}
              >
                Отказаться от кураторства
              </Button>
            ) : selectedTeam && !selectedTeam.supervisorId ? (
              <Button
                type="button"
                onClick={() => {
                  handleTakeTeam(selectedTeam);
                  setIsTeamDetailsDialogOpen(false);
                }}
              >
                Стать супервайзером
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTeamDetailsDialogOpen(false)}
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
