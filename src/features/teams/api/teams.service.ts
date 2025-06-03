"use client";

import { API_BASE_URL } from "@/shared/constants/config";
import {
  CreateTeamDto,
  Team,
  TeamResponse,
  TeamMember,
  JoinTeamDto,
  TeamMemberResponse,
} from "@/entities/team/model/types";

export class TeamsService {
  static async createTeam(data: CreateTeamDto): Promise<Team> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при создании команды");
    }

    const teamResponse: TeamResponse = await response.json();
    const team = this.mapTeamResponse(teamResponse);

    // Автоматически присоединяемся к созданной команде
    try {
      await this.joinTeam({ team_code: team.code });
    } catch (error) {
      console.error(
        "Ошибка при автоматическом присоединении к команде:",
        error
      );
    }

    return team;
  }

  static async getTeamById(teamId: number): Promise<Team> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/get_by_id/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при получении команды");
    }

    const teamResponse: TeamResponse = await response.json();
    return this.mapTeamResponse(teamResponse);
  }

  static async getTeamByCode(code: string): Promise<Team> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/get_by_code/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Команда не найдена");
    }

    const teamResponse: TeamResponse = await response.json();
    return this.mapTeamResponse(teamResponse);
  }

  static async joinTeam(data: JoinTeamDto): Promise<TeamMemberResponse> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при присоединении к команде");
    }

    return await response.json();
  }

  static async getMyTeams(): Promise<Team[]> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/my-teams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при получении списка команд");
    }

    const teamsResponse: TeamResponse[] = await response.json();
    return teamsResponse.map(this.mapTeamResponse);
  }

  static async getTeamMembers(teamId: number): Promise<TeamMember[]> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при получении участников команды");
    }

    return await response.json();
  }

  static async deleteTeam(teamId: number): Promise<void> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/teams/${teamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при удалении команды");
    }
  }

  private static mapTeamResponse(response: TeamResponse): Team {
    return {
      id: response.id,
      name: response.name,
      code: response.code,
      creator_id: response.creator_id,
    };
  }
}
