"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { useToast } from "@/shared/ui/use-toast";
import { useTeams } from "@/features/teams/lib/use-teams";
import { TeamMember } from "@/entities/team/model/types";
import { useAuthContext } from "@/app/providers/auth-provider";

export default function TeamsPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    myTeams: teams,
    isLoading,
    createTeam,
    joinTeam,
    getTeamMembers,
    deleteTeam,
    fetchMyTeams,
  } = useTeams();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [teamMembers, setTeamMembers] = useState<{
    [key: number]: TeamMember[];
  }>({});
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  useEffect(() => {
    console.log("Current user:", user);
    console.log("User roles:", user?.roles);
    console.log("User role:", user?.role);

    if (!user) {
      console.log("No user found");
      return;
    }

    const isStudent =
      (user.roles && user.roles.includes("student")) || user.role === "student";

    if (!isStudent) {
      console.log("User is not a student");
      toast({
        title: "Доступ запрещен",
        description: "Эта страница доступна только для студентов",
        variant: "destructive",
      });
      router.push("/dashboard");
      return;
    }

    console.log("User is a student, fetching teams");
    fetchMyTeams();
  }, [user, fetchMyTeams, router, toast]);

  const handleShowMembers = async (teamId: number) => {
    try {
      const members = await getTeamMembers(teamId);
      if (members) {
        setTeamMembers((prev) => ({ ...prev, [teamId]: members }));
        setSelectedTeam(teamId);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список участников",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTeam = (teamId: number) => {
    setTeamToDelete(teamId);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTeamName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название команды",
        variant: "destructive",
      });
      return;
    }

    try {
      await createTeam(newTeamName);
      setIsCreateDialogOpen(false);
      setNewTeamName("");
      await fetchMyTeams();
      toast({
        title: "Успешно",
        description: "Команда успешно создана",
      });
    } catch (error) {
      console.error("Error creating team:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать команду",
        variant: "destructive",
      });
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите код команды",
        variant: "destructive",
      });
      return;
    }

    try {
      await joinTeam(joinCode);
      setIsJoinDialogOpen(false);
      setJoinCode("");
      await fetchMyTeams();
      toast({
        title: "Успешно",
        description: "Вы успешно присоединились к команде",
      });
    } catch (error) {
      console.error("Error joining team:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось присоединиться к команде",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!teamToDelete) return;

    try {
      await deleteTeam(teamToDelete);
      setIsDeleteDialogOpen(false);
      setTeamToDelete(null);
      await fetchMyTeams();
      toast({
        title: "Успешно",
        description: "Команда успешно удалена",
      });
    } catch (error) {
      console.error("Error deleting team:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить команду",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Моя команда</h1>
        <div className="space-x-4">
          {!teams.length && (
            <>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Создать команду
              </Button>
              <Button
                onClick={() => setIsJoinDialogOpen(true)}
                variant="outline"
              >
                Присоединиться к команде
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{team.name}</h2>
                <p className="text-gray-500">Код: {team.code}</p>
                <p className="text-gray-500">
                  Участников: {team.members?.length || 0}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteTeam(team.id)}
              >
                Удалить
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShowMembers(team.id)}
            >
              {selectedTeam === team.id
                ? "Скрыть участников"
                : "Показать участников"}
            </Button>
            {selectedTeam === team.id && teamMembers[team.id] && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Участники команды:</h3>
                <ul className="space-y-2">
                  {teamMembers[team.id].map((member) => (
                    <li
                      key={member.id}
                      className="flex flex-col space-y-1 border-b pb-2"
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
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать команду</DialogTitle>
            <DialogDescription>
              Введите название для новой команды
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateTeam}>
            <div className="space-y-4">
              <Input
                placeholder="Название команды"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Присоединиться к команде</DialogTitle>
            <DialogDescription>
              Введите код команды для присоединения
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJoinTeam}>
            <div className="space-y-4">
              <Input
                placeholder="Код команды"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Присоединиться</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить команду</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту команду? Это действие нельзя
              отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
