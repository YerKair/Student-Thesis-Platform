"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { useTeams } from "@/features/teams/lib/use-teams";
import { Team } from "@/entities/team/model/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TeamCard } from "@/features/teams/ui/team-card";
import { toast } from "sonner";

export default function SupervisorPage() {
  const { user, token } = useAuthContext();
  const {
    availableTeams,
    myTeams,
    isLoading,
    fetchAvailableTeams,
    fetchMyTeams,
    assignSupervisor,
  } = useTeams();

  useEffect(() => {
    if (!token) return;

    console.log("Current user:", user);
    console.log("User roles:", user?.roles);

    // Check if user has supervisor role
    const isSupervisor = user?.roles?.some(
      (role) => role.toLowerCase() === "supervisor"
    );

    if (!isSupervisor) {
      toast.error("У вас нет прав для доступа к этой странице");
      return;
    }

    fetchAvailableTeams();
    fetchMyTeams();
  }, [token, user, fetchAvailableTeams, fetchMyTeams]);

  const handleAssignSupervisor = async (teamId: number) => {
    if (!token) {
      toast.error("Необходимо авторизоваться");
      return;
    }

    try {
      await assignSupervisor(teamId);
      toast.success("Вы успешно назначены руководителем команды");

      // Refresh both lists
      await Promise.all([fetchAvailableTeams(), fetchMyTeams()]);
    } catch (error) {
      console.error("Error assigning supervisor:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Не удалось назначить руководителя");
      }
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Управление командами</h1>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Доступные команды</TabsTrigger>
          <TabsTrigger value="supervised">Мои команды</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTeams.length > 0 ? (
              availableTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  actionLabel="Стать руководителем"
                  onAction={() => handleAssignSupervisor(team.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Нет доступных команд
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="supervised">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myTeams.length > 0 ? (
              myTeams.map((team) => (
                <TeamCard key={team.id} team={team} showMembers />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Вы пока не руководите ни одной командой
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
