import {
  Team,
  CreateTeamDto,
  JoinTeamDto,
  TeamMember,
  TeamResponse,
} from "@/entities/team/model/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class TeamsService {
  static async getTeams(token: string): Promise<Team[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }

      const data = await response.json();
      return data.teams;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  }

  static async getAvailableTeams(token: string): Promise<Team[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/available`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch available teams");
      }

      const data = await response.json();
      return data.teams;
    } catch (error) {
      console.error("Error fetching available teams:", error);
      throw error;
    }
  }

  static async getMySupervisedTeams(token: string): Promise<Team[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch supervised teams");
      }

      const data = await response.json();
      return data.teams;
    } catch (error) {
      console.error("Error fetching supervised teams:", error);
      throw error;
    }
  }

  static async assignSupervisor(teamId: number, token: string): Promise<Team> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/teams/${teamId}/supervisor`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to assign supervisor");
      }

      const teamResponse: TeamResponse = await response.json();
      return this.mapTeamResponse(teamResponse);
    } catch (error) {
      console.error("Error assigning supervisor:", error);
      throw error;
    }
  }

  static async removeSupervisor(teamId: number, token: string): Promise<Team> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/teams/${teamId}/supervisor`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );

      if (response.status === 500) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updatedTeam = await this.getTeamById(teamId, token);
        return updatedTeam;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to remove supervisor");
      }

      const teamResponse: TeamResponse = await response.json();
      return this.mapTeamResponse(teamResponse);
    } catch (error) {
      console.error("Error removing supervisor:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updatedTeam = await this.getTeamById(teamId, token);
        return updatedTeam;
      }
      throw error;
    }
  }

  static async getMyTeams(token: string): Promise<Team[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/my-teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch my teams");
      }

      const data = await response.json();
      console.log("DEBUG: Teams data received:", JSON.stringify(data, null, 2));
      return data.teams.map((team: TeamResponse) => this.mapTeamResponse(team));
    } catch (error) {
      console.error("Error fetching my teams:", error);
      throw error;
    }
  }

  static async createTeam(data: CreateTeamDto, token: string): Promise<Team> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create team");
      }

      const teamResponse: TeamResponse = await response.json();
      return this.mapTeamResponse(teamResponse);
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }

  static async joinTeam(data: JoinTeamDto, token: string): Promise<Team> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to join team");
      }

      const teamResponse: TeamResponse = await response.json();
      return this.mapTeamResponse(teamResponse);
    } catch (error) {
      console.error("Error joining team:", error);
      throw error;
    }
  }

  static async getTeamByCode(code: string, token: string): Promise<Team> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/teams/get_by_code/${code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting team by code:", error);
      throw error;
    }
  }

  static async getTeamById(id: number, token: string): Promise<Team> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/get_by_id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting team by id:", error);
      throw error;
    }
  }

  static async getTeamMembers(
    teamId: number,
    token: string
  ): Promise<TeamMember[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }

      const data = await response.json();
      return data.members;
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  }

  static async deleteTeam(teamId: number, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  }

  private static mapTeamResponse(response: TeamResponse): Team {
    console.log("DEBUG: Mapping team response:", response);
    return {
      id: response.id,
      name: response.name,
      code: response.code,
      creator_id: response.creator_id,
      supervisor_id: response.supervisor_id || null,
      supervisor_name: response.supervisor_name || undefined,
      members:
        response.members?.map((member) => ({
          id: member.id,
          fullname: member.fullname,
          email: member.email,
          role: member.role,
        })) || [],
      created_at: response.created_at,
    };
  }
}
