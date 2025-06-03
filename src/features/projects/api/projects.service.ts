"use client";

import { API_BASE_URL } from "@/shared/constants/config";
import {
  CreateProjectDto,
  Project,
  ProjectResponse,
} from "@/entities/project/model/types";

export class ProjectsService {
  static async createProject(
    teamId: number,
    data: CreateProjectDto
  ): Promise<Project> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/projects/teams/${teamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при создании проекта");
    }

    const projectResponse: ProjectResponse = await response.json();
    return this.mapProjectResponse(projectResponse);
  }

  static async getTeamProject(teamId: number): Promise<Project | null> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/projects/teams/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при получении проекта");
    }

    const projectResponse: ProjectResponse = await response.json();
    return this.mapProjectResponse(projectResponse);
  }

  private static mapProjectResponse(response: ProjectResponse): Project {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      teamId: response.team_id,
      createdAt: response.created_at,
      updatedAt: response.updated_at,
    };
  }
}
