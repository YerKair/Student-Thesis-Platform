"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/app/providers/auth-provider";
import { TeamsService } from "@/features/teams/api/teams-service";
import { ProjectsService } from "@/entities/project/api/projectsService";
import { api } from "@/lib/api";
import { Team, TeamMember } from "@/entities/team/model/types";

interface ProjectProgress {
  totalStages: number;
  completedStages: number;
  progressPercentage: number;
  currentStage?: string;
}

interface DashboardData {
  team: Team | null;
  projectProgress: ProjectProgress | null;
  isInTeam: boolean;
  hasProject: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardData() {
  const { user, token, isAuthenticated } = useAuthContext();
  const [data, setData] = useState<DashboardData>({
    team: null,
    projectProgress: null,
    isInTeam: false,
    hasProject: false,
    isLoading: true,
    error: null,
  });

  const calculateProjectProgress = useCallback((stageStatuses: any[]) => {
    if (!stageStatuses || stageStatuses.length === 0) {
      return {
        totalStages: 4,
        completedStages: 0,
        progressPercentage: 0,
        currentStage: "initial",
      };
    }

    const totalStages = stageStatuses.length;
    const completedStages = stageStatuses.filter(
      (status) => status.status === "completed"
    ).length;
    const progressPercentage = Math.round(
      (completedStages / totalStages) * 100
    );

    // Найдем текущий этап (первый не завершенный)
    const currentStageStatus = stageStatuses.find(
      (status) => status.status !== "completed"
    );
    const currentStage = currentStageStatus?.stage || "completed";

    return {
      totalStages,
      completedStages,
      progressPercentage,
      currentStage,
    };
  }, []);

  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated || !token || !user) {
      setData((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    // Проверяем, является ли пользователь студентом
    const isStudent =
      (user.roles && user.roles.includes("student")) || user.role === "student";

    if (!isStudent) {
      setData((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setData((prev) => ({ ...prev, isLoading: true, error: null }));

      // Получаем команды пользователя
      const teams = await TeamsService.getMyTeams(token);
      const userTeam = teams.length > 0 ? teams[0] : null;

      let projectProgress: ProjectProgress | null = null;

      if (userTeam) {
        // Проверяем, есть ли проект у команды
        try {
          const teamResponse = await fetch("/api/teams/my-team", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (teamResponse.ok) {
            const teamData = await teamResponse.json();

            if (teamData.project_id) {
              // Получаем статусы этапов проекта
              try {
                const stageStatuses = await api.reviews.getProjectStageStatuses(
                  token,
                  teamData.project_id
                );
                projectProgress = calculateProjectProgress(stageStatuses);
              } catch (error) {
                console.error("Error fetching project stage statuses:", error);
                // Если статусы не найдены, пытаемся их инициализировать
                try {
                  await api.reviews.initializeProjectStages(
                    token,
                    teamData.project_id
                  );
                  const stageStatuses =
                    await api.reviews.getProjectStageStatuses(
                      token,
                      teamData.project_id
                    );
                  projectProgress = calculateProjectProgress(stageStatuses);
                } catch (initError) {
                  console.error(
                    "Error initializing project stages:",
                    initError
                  );
                  projectProgress = {
                    totalStages: 4,
                    completedStages: 0,
                    progressPercentage: 0,
                    currentStage: "initial",
                  };
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching team project data:", error);
        }
      }

      setData({
        team: userTeam,
        projectProgress,
        isInTeam: !!userTeam,
        hasProject: !!projectProgress,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setData((prev) => ({
        ...prev,
        isLoading: false,
        error: "Ошибка при загрузке данных",
      }));
    }
  }, [isAuthenticated, token, user, calculateProjectProgress]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    ...data,
    refetch: loadDashboardData,
  };
}
