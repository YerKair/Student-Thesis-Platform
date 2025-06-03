"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { ProjectsService } from "../api/projects.service";
import { Project, CreateProjectDto } from "@/entities/project/model/types";

interface UseProjectsState {
  project: Project | null;
  isLoading: boolean;
  error: string | null;
}

export function useProjects(teamId: number) {
  const [state, setState] = useState<UseProjectsState>({
    project: null,
    isLoading: false,
    error: null,
  });
  const { toast } = useToast();

  const createProject = useCallback(
    async (data: CreateProjectDto) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const project = await ProjectsService.createProject(teamId, data);
        setState((prev) => ({ ...prev, project, isLoading: false }));

        toast({
          title: "Успешно!",
          description: "Проект создан",
        });

        return project;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ошибка при создании проекта";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));

        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: message,
        });

        throw error;
      }
    },
    [teamId, toast]
  );

  const fetchProject = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const project = await ProjectsService.getTeamProject(teamId);
      setState((prev) => ({ ...prev, project, isLoading: false }));
      return project;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при получении проекта";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
      throw error;
    }
  }, [teamId]);

  return {
    ...state,
    createProject,
    fetchProject,
  };
}
