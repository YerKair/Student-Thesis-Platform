import { User } from "@/entities/user/model/types";

export interface TeamMember {
  id: number;
  fullname: string;
  email?: string;
  role: string;
}

export interface Team {
  id: number;
  name: string;
  code: string;
  creator_id: number;
  supervisor_id: number | null;
  supervisor_name?: string;
  members: TeamMember[];
  created_at?: string;
}

export interface CreateTeamDto {
  name: string;
  code: string;
}

export interface TeamResponse {
  id: number;
  name: string;
  code: string;
  creator_id: number;
  supervisor_id?: number | null;
  supervisor_name?: string;
  members?: TeamMember[];
  created_at?: string;
}

export interface JoinTeamDto {
  team_code: string;
}

export interface TeamMemberResponse {
  id: number;
  team_id: number;
  user_id: number;
}
