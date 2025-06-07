"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { ProjectsService } from "../api/projects.service";
import {
  Project,
  CreateProjectDto,
  ProjectWithDeadlines,
} from "@/entities/project/model/types";

interface UseProjectsState {
  project: Project | null;
  projectWithDeadlines: ProjectWithDeadlines | null;
  isLoading: boolean;
  error: string | null;
}

interface UseProjectsReturn extends UseProjectsState {
  createProject: (teamId: number, data: CreateProjectDto) => Promise<void>;
  getTeamProject: (teamId: number) => Promise<void>;
  getProjectWithDeadlines: (projectId: number) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [state, setState] = useState<UseProjectsState>({
    project: null,
    projectWithDeadlines: null,
    isLoading: false,
    error: null,
  });

  const { toast } = useToast();

  const createProject = useCallback(
    async (teamId: number, data: CreateProjectDto) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const project = await ProjectsService.createProject(teamId, data);
        setState((prev) => ({ ...prev, project, isLoading: false }));

        toast({
          title: "Успех",
          description: "Проект успешно создан",
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ошибка при создании проекта";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));
        toast({
          title: "Ошибка",
          description: message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const getTeamProject = useCallback(async (teamId: number) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const project = await ProjectsService.getTeamProject(teamId);
      setState((prev) => ({ ...prev, project, isLoading: false }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при получении проекта";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
    }
  }, []);

  const getProjectWithDeadlines = useCallback(async (projectId: number) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const projectWithDeadlines =
        await ProjectsService.getProjectWithDeadlines(projectId);
      setState((prev) => ({ ...prev, projectWithDeadlines, isLoading: false }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ошибка при получении проекта с дедлайнами";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
    }
  }, []);

  return {
    ...state,
    createProject,
    getTeamProject,
    getProjectWithDeadlines,
  };
}
