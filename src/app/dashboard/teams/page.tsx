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
import {
  Users,
  UserPlus,
  ExternalLink,
  X,
  User,
  UserPlus2,
} from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { Textarea } from "@/shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Badge } from "@/shared/ui/badge";

// Тип для команды
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
}

export default function TeamsPage() {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("join");

  // Состояния для создания команды
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamTopic, setTeamTopic] = useState("");

  // Состояние для присоединения к команде
  const [inviteCode, setInviteCode] = useState("");

  // Состояние для отображения команды пользователя
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [allTeams, setAllTeams] = useState<Team[]>([]);

  // Состояния для работы с модальным окном для приглашения
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  // Загрузка существующих команд из localStorage при инициализации
  useEffect(() => {
    const teamsFromStorage = localStorage.getItem("teams");
    if (teamsFromStorage) {
      const parsedTeams = JSON.parse(teamsFromStorage);
      setAllTeams(parsedTeams);

      // Проверяем, является ли текущий пользователь членом какой-либо команды
      if (user) {
        const userTeam = parsedTeams.find((team: Team) =>
          team.members.some((member: TeamMember) => member.id === user.id)
        );

        if (userTeam) {
          setMyTeam(userTeam);
          setActiveTab("my-team");
        }
      }
    }
  }, [user]);

  // Функция для генерации уникального кода приглашения
  const generateInviteCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Функция для создания новой команды
  const handleCreateTeam = () => {
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо авторизоваться для создания команды",
        variant: "destructive",
      });
      return;
    }

    if (!teamName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название команды",
        variant: "destructive",
      });
      return;
    }

    // Проверка, является ли пользователь уже членом команды
    if (myTeam) {
      toast({
        title: "Ошибка",
        description: "Вы уже состоите в команде",
        variant: "destructive",
      });
      return;
    }

    // Создаем новую команду
    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      description: teamDescription,
      topic: teamTopic,
      inviteCode: generateInviteCode(),
      createdAt: new Date().toISOString(),
      members: [
        {
          id: user.id,
          name: user.name || "Пользователь",
          role: "Владелец",
          email: user.email,
        },
      ],
      createdBy: user.id,
    };

    // Обновляем список всех команд
    const updatedTeams = [...allTeams, newTeam];
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setAllTeams(updatedTeams);
    setMyTeam(newTeam);

    // Сбрасываем поля формы
    setTeamName("");
    setTeamDescription("");
    setTeamTopic("");

    // Переключаемся на вкладку "Моя команда"
    setActiveTab("my-team");

    toast({
      title: "Успех",
      description: "Команда успешно создана",
    });
  };

  // Функция для присоединения к команде по коду приглашения
  const handleJoinTeam = () => {
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо авторизоваться для присоединения к команде",
        variant: "destructive",
      });
      return;
    }

    if (!inviteCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите код приглашения",
        variant: "destructive",
      });
      return;
    }

    // Проверка, является ли пользователь уже членом команды
    if (myTeam) {
      toast({
        title: "Ошибка",
        description: "Вы уже состоите в команде",
        variant: "destructive",
      });
      return;
    }

    // Ищем команду по коду приглашения
    const foundTeam = allTeams.find((team) => team.inviteCode === inviteCode);

    if (!foundTeam) {
      toast({
        title: "Ошибка",
        description: "Команда с указанным кодом не найдена",
        variant: "destructive",
      });
      return;
    }

    // Проверяем, не состоит ли пользователь уже в этой команде
    if (foundTeam.members.some((member) => member.id === user.id)) {
      toast({
        title: "Информация",
        description: "Вы уже являетесь членом этой команды",
      });
      setMyTeam(foundTeam);
      setActiveTab("my-team");
      return;
    }

    // Добавляем пользователя в команду
    const newMember: TeamMember = {
      id: user.id,
      name: user.name || "Пользователь",
      role: "Участник",
      email: user.email,
    };

    const updatedTeam = {
      ...foundTeam,
      members: [...foundTeam.members, newMember],
    };

    // Обновляем список всех команд
    const updatedTeams = allTeams.map((team) =>
      team.id === updatedTeam.id ? updatedTeam : team
    );

    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setAllTeams(updatedTeams);
    setMyTeam(updatedTeam);
    setInviteCode("");
    setActiveTab("my-team");

    toast({
      title: "Успех",
      description: "Вы успешно присоединились к команде",
    });
  };

  // Функция для выхода из команды
  const handleLeaveTeam = () => {
    if (!user || !myTeam) {
      return;
    }

    // Проверяем, является ли пользователь создателем команды
    if (myTeam.createdBy === user.id) {
      if (myTeam.members.length > 1) {
        toast({
          title: "Ошибка",
          description:
            "Вы не можете покинуть созданную вами команду, пока в ней есть другие участники",
          variant: "destructive",
        });
        return;
      }

      // Если пользователь - единственный член и создатель команды, удаляем команду
      const updatedTeams = allTeams.filter((team) => team.id !== myTeam.id);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      setAllTeams(updatedTeams);
      setMyTeam(null);

      toast({
        title: "Информация",
        description:
          "Команда была удалена, так как вы были единственным участником",
      });
      return;
    }

    // Удаляем пользователя из членов команды
    const updatedMembers = myTeam.members.filter(
      (member) => member.id !== user.id
    );
    const updatedTeam = { ...myTeam, members: updatedMembers };

    // Обновляем список всех команд
    const updatedTeams = allTeams.map((team) =>
      team.id === myTeam.id ? updatedTeam : team
    );

    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setAllTeams(updatedTeams);
    setMyTeam(null);

    toast({
      title: "Информация",
      description: "Вы покинули команду",
    });
  };

  // Функция для приглашения нового участника
  const handleInviteMember = () => {
    if (!myTeam || !inviteEmail.trim() || !inviteRole.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    // В реальном приложении здесь был бы запрос к API
    // Сейчас просто показываем сообщение с кодом приглашения

    toast({
      title: "Приглашение отправлено",
      description: `Отправлено приглашение на email: ${inviteEmail}. Код приглашения: ${myTeam.inviteCode}`,
    });

    setIsInviteDialogOpen(false);
    setInviteEmail("");
    setInviteRole("");
  };

  return (
    <div className="space-y-6 p-3 xxs:p-4 sm:p-6">
      <div>
        <h1 className="text-xl xxs:text-2xl md:text-3xl font-bold tracking-tight">
          Команды
        </h1>
        <p className="text-xs xxs:text-sm md:text-base text-gray-600">
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
              <TabsTrigger
                value="join"
                className="flex-1 sm:flex-none text-xs xxs:text-sm"
                disabled={!!myTeam}
              >
                Присоединиться
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="flex-1 sm:flex-none text-xs xxs:text-sm"
                disabled={!!myTeam}
              >
                Создать команду
              </TabsTrigger>
              <TabsTrigger
                value="my-team"
                className="flex-1 sm:flex-none text-xs xxs:text-sm"
              >
                Моя команда
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="join" className="mt-3 xxs:mt-4">
            <Card>
              <CardHeader className="p-3 xxs:p-4 sm:p-6">
                <CardTitle className="text-base xxs:text-lg sm:text-xl">
                  Присоединиться к команде
                </CardTitle>
                <CardDescription className="text-xs xxs:text-sm">
                  Введите код приглашения, чтобы присоединиться к существующей
                  команде
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 xxs:space-y-4 p-3 xxs:p-4 sm:p-6 pt-0 xxs:pt-0 sm:pt-0">
                <div className="space-y-2">
                  <Label htmlFor="team-code" className="text-xs xxs:text-sm">
                    Код команды
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="team-code"
                      placeholder="Например: ABC123"
                      className="flex-1"
                      value={inviteCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInviteCode(e.target.value)
                      }
                    />
                    <Button
                      onClick={handleJoinTeam}
                      className="w-full sm:w-auto mt-2 sm:mt-0 text-xs xxs:text-sm h-8 xxs:h-10"
                    >
                      <UserPlus className="mr-2 h-3 w-3 xxs:h-4 xxs:w-4" />
                      Присоединиться
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-3 xxs:mt-4">
            <Card>
              <CardHeader className="p-3 xxs:p-4 sm:p-6">
                <CardTitle className="text-base xxs:text-lg sm:text-xl">
                  Создать новую команду
                </CardTitle>
                <CardDescription className="text-xs xxs:text-sm">
                  Создайте команду и пригласите участников для работы над
                  дипломом
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 xxs:space-y-4 p-3 xxs:p-4 sm:p-6 pt-0 xxs:pt-0 sm:pt-0">
                <div className="space-y-2">
                  <Label htmlFor="team-name" className="text-xs xxs:text-sm">
                    Название команды*
                  </Label>
                  <Input
                    id="team-name"
                    placeholder="Введите название команды"
                    value={teamName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTeamName(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-topic" className="text-xs xxs:text-sm">
                    Тема проекта
                  </Label>
                  <Input
                    id="team-topic"
                    placeholder="Тема дипломного проекта"
                    value={teamTopic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTeamTopic(e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="team-description"
                    className="text-xs xxs:text-sm"
                  >
                    Описание
                  </Label>
                  <Textarea
                    id="team-description"
                    placeholder="Краткое описание команды и проекта"
                    value={teamDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setTeamDescription(e.target.value)
                    }
                    className="min-h-[100px]"
                  />
                </div>
                <div className="pt-3 xxs:pt-4">
                  <Button
                    onClick={handleCreateTeam}
                    className="w-full sm:w-auto text-xs xxs:text-sm h-8 xxs:h-10"
                  >
                    <Users className="mr-2 h-3 w-3 xxs:h-4 xxs:w-4" />
                    Создать команду
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-team" className="mt-3 xxs:mt-4">
            {myTeam ? (
              <Card>
                <CardHeader className="p-3 xxs:p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-base xxs:text-lg sm:text-xl">
                        {myTeam.name}
                      </CardTitle>
                      <CardDescription className="text-xs xxs:text-sm">
                        {myTeam.topic
                          ? myTeam.topic
                          : "Тема проекта не указана"}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      Код приглашения: {myTeam.inviteCode}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-3 xxs:p-4 sm:p-6 pt-0 xxs:pt-0 sm:pt-0">
                  {myTeam.description && (
                    <div>
                      <h3 className="text-sm font-medium mb-1">Описание:</h3>
                      <p className="text-sm text-gray-600">
                        {myTeam.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Участники команды:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {myTeam.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center p-2 border rounded-md"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {member.role}
                            </p>
                          </div>
                          {member.id === myTeam.createdBy && (
                            <Badge className="ml-2" variant="secondary">
                              Владелец
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between p-3 xxs:p-4 sm:p-6">
                  <Dialog
                    open={isInviteDialogOpen}
                    onOpenChange={setIsInviteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-xs xxs:text-sm h-8 xxs:h-10"
                      >
                        <UserPlus2 className="mr-2 h-3 w-3 xxs:h-4 xxs:w-4" />
                        Пригласить участника
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Пригласить участника</DialogTitle>
                        <DialogDescription>
                          Отправьте приглашение новому участнику команды
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="invite-email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="invite-email"
                            type="email"
                            placeholder="email@example.com"
                            className="col-span-3"
                            value={inviteEmail}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setInviteEmail(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="invite-role" className="text-right">
                            Роль
                          </Label>
                          <Input
                            id="invite-role"
                            placeholder="Разработчик, Дизайнер и т.д."
                            className="col-span-3"
                            value={inviteRole}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setInviteRole(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleInviteMember}>
                          Отправить приглашение
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto text-xs xxs:text-sm h-8 xxs:h-10"
                    onClick={handleLeaveTeam}
                  >
                    <X className="mr-2 h-3 w-3 xxs:h-4 xxs:w-4" />
                    {myTeam.createdBy === user?.id
                      ? "Удалить команду"
                      : "Покинуть команду"}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader className="p-3 xxs:p-4 sm:p-6">
                  <CardTitle className="text-base xxs:text-lg sm:text-xl">
                    Моя команда
                  </CardTitle>
                  <CardDescription className="text-xs xxs:text-sm">
                    У вас пока нет команды
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-4 xxs:py-6 sm:py-8 px-3 xxs:px-4 sm:px-6">
                  <Users className="h-12 w-12 xxs:h-16 xxs:w-16 text-gray-300 mb-3 xxs:mb-4" />
                  <p className="text-center text-gray-600 max-w-md text-xs xxs:text-sm">
                    Присоединитесь к команде или создайте свою для совместной
                    работы над дипломным проектом
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 xxs:gap-3 justify-center sm:justify-between p-3 xxs:p-4 sm:p-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("join")}
                    className="w-full sm:w-auto text-xs xxs:text-sm h-8 xxs:h-10"
                  >
                    Присоединиться к команде
                  </Button>
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="w-full sm:w-auto text-xs xxs:text-sm h-8 xxs:h-10"
                  >
                    Создать команду
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
