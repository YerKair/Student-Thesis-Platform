import { fetchWithAuth } from "@/lib/api";
import {
  Project,
  ProjectWithDeadlines,
  ProjectStageStatus,
} from "../model/types";

export class ProjectsService {
  static async getProjectWithDeadlines(
    token: string,
    projectId: number
  ): Promise<ProjectWithDeadlines> {
    return fetchWithAuth(`/projects/${projectId}/with-deadlines`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getProjectStageStatuses(
    token: string,
    projectId: number
  ): Promise<ProjectStageStatus[]> {
    return fetchWithAuth(`/reviews/projects/${projectId}/stage-statuses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async updateProjectStageStatus(
    token: string,
    projectId: number,
    stage: string,
    status: string,
    comment?: string
  ): Promise<ProjectStageStatus> {
    return fetchWithAuth(`/reviews/projects/${projectId}/stage-status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stage,
        status,
        supervisor_comment: comment,
      }),
    });
  }

  static async initializeProjectStages(
    token: string,
    projectId: number
  ): Promise<void> {
    await fetchWithAuth(`/reviews/projects/${projectId}/initialize-stages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
