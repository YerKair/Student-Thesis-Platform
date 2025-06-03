"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { TeamsService } from "../api/teams-service";
import { Team, CreateTeamDto, TeamMember } from "@/entities/team/model/types";
import { useAuthContext } from "@/app/providers/auth-provider";

interface UseTeamsState {
  teams: Team[];
  myTeams: Team[];
  currentTeam: Team | null;
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  availableTeams: Team[];
}

export function useTeams() {
  const { token } = useAuthContext();
  const [state, setState] = useState<UseTeamsState>({
    teams: [],
    myTeams: [],
    currentTeam: null,
    teamMembers: [],
    isLoading: false,
    error: null,
    availableTeams: [],
  });

  const fetchTeams = useCallback(async () => {
    if (!token) return;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const teams = await TeamsService.getTeams(token);
      setState((prev) => ({ ...prev, teams, isLoading: false }));
    } catch (error) {
      console.error("Error fetching teams:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch teams",
        isLoading: false,
      }));
    }
  }, [token]);

  const fetchMyTeams = useCallback(async () => {
    if (!token) return;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const teams = await TeamsService.getMyTeams(token);
      setState((prev) => ({ ...prev, myTeams: teams, isLoading: false }));
    } catch (error) {
      console.error("Error fetching my teams:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch my teams",
        isLoading: false,
      }));
    }
  }, [token]);

  const fetchAvailableTeams = useCallback(async () => {
    if (!token) return;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const teams = await TeamsService.getAvailableTeams(token);
      setState((prev) => ({
        ...prev,
        availableTeams: teams,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching available teams:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch available teams",
        isLoading: false,
      }));
    }
  }, [token]);

  const createTeam = useCallback(
    async (name: string) => {
      if (!token) return;
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const team = await TeamsService.createTeam({ name, code }, token);
        setState((prev) => ({
          ...prev,
          teams: [...prev.teams, team],
          isLoading: false,
        }));
        return team;
      } catch (error) {
        console.error("Error creating team:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to create team",
          isLoading: false,
        }));
        throw error;
      }
    },
    [token]
  );

  const joinTeam = useCallback(
    async (code: string) => {
      if (!token) return;
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const team = await TeamsService.joinTeam({ team_code: code }, token);
        setState((prev) => ({
          ...prev,
          teams: [...prev.teams, team],
          isLoading: false,
        }));
        return team;
      } catch (error) {
        console.error("Error joining team:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to join team",
          isLoading: false,
        }));
        throw error;
      }
    },
    [token]
  );

  const getTeamMembers = useCallback(
    async (teamId: number) => {
      if (!token) return;
      try {
        return await TeamsService.getTeamMembers(teamId, token);
      } catch (error) {
        console.error("Error getting team members:", error);
        throw error;
      }
    },
    [token]
  );

  const deleteTeam = useCallback(
    async (teamId: number) => {
      if (!token) return;
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        await TeamsService.deleteTeam(teamId, token);
        setState((prev) => ({
          ...prev,
          teams: prev.teams.filter((t) => t.id !== teamId),
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error deleting team:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to delete team",
          isLoading: false,
        }));
        throw error;
      }
    },
    [token]
  );

  const assignSupervisor = useCallback(
    async (teamId: number) => {
      if (!token) return;
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const team = await TeamsService.assignSupervisor(teamId, token);
        setState((prev) => ({
          ...prev,
          teams: prev.teams.map((t) => (t.id === teamId ? team : t)),
          isLoading: false,
        }));
        return team;
      } catch (error) {
        console.error("Error assigning supervisor:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to assign supervisor",
          isLoading: false,
        }));
        throw error;
      }
    },
    [token]
  );

  return {
    ...state,
    fetchTeams,
    fetchMyTeams,
    fetchAvailableTeams,
    createTeam,
    joinTeam,
    getTeamMembers,
    deleteTeam,
    assignSupervisor,
  };
}
