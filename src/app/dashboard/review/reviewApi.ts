export interface TeamMember {
  id: number;
  fullname: string;
  email: string;
  role: string;
}

export interface StageStatus {
  id: number;
  stage: string;
  status: string;
  supervisor_comment: string | null;
  updated_by_name: string | null;
  updated_by_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deadline {
  id: number;
  stage: string;
  deadline: string;
  set_by_name: string;
  set_by_email: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithDetails {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  stage_statuses: StageStatus[];
  deadlines: Deadline[];
}

export interface TeamWithProject {
  id: number;
  name: string;
  code: string;
  supervisor_name: string | null;
  supervisor_email: string | null;
  members: TeamMember[];
  project: ProjectWithDetails;
  created_at: string;
}

export interface ReviewerDashboard {
  pending_reviews: any[];
  in_progress_reviews: any[];
  completed_reviews: any[];
  upcoming_deadlines: any[];
}

export interface ProjectFile {
  id: number;
  file_name: string;
  file_path: string;
  stage: string;
  version_number: number;
  uploaded_by_id: number;
  created_at: string;
  file_size: number;
  file_type: string;
  status: string;
  comment: string;
}

export interface FileComment {
  id: number;
  file_id: number;
  reviewer_id: number;
  comment: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface StageStatusUpdate {
  stage: string;
  status: string;
  supervisor_comment?: string;
}

export class ReviewService {
  private static baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  static async getTeamsWithProjects(token: string): Promise<TeamWithProject[]> {
    const response = await fetch(`${this.baseUrl}/reviews/teams-projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch teams with projects: ${response.statusText}`
      );
    }

    return response.json();
  }

  static async getReviewerDashboard(token: string): Promise<ReviewerDashboard> {
    const response = await fetch(`${this.baseUrl}/reviews/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch reviewer dashboard: ${response.statusText}`
      );
    }

    return response.json();
  }

  static async getProjectFiles(
    token: string,
    projectId: number,
    stage: string
  ): Promise<ProjectFile[]> {
    const response = await fetch(
      `${this.baseUrl}/reviews/projects/${projectId}/files?stage=${stage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project files: ${response.statusText}`);
    }

    return response.json();
  }

  static async addFileComment(
    token: string,
    fileId: number,
    comment: string,
    status: string
  ): Promise<FileComment> {
    const response = await fetch(
      `${this.baseUrl}/reviews/files/${fileId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add file comment: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateStageStatus(
    token: string,
    projectId: number,
    stageUpdate: StageStatusUpdate
  ): Promise<StageStatus> {
    const response = await fetch(
      `${this.baseUrl}/reviews/projects/${projectId}/stage-status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stageUpdate),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update stage status: ${response.statusText}`);
    }

    return response.json();
  }

  static async downloadFile(token: string, fileId: number): Promise<Blob> {
    const response = await fetch(
      `${this.baseUrl}/projects/files/${fileId}/download`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    return response.blob();
  }

  static async getProjectStageStatuses(
    token: string,
    projectId: number
  ): Promise<StageStatus[]> {
    const response = await fetch(
      `${this.baseUrl}/reviews/projects/${projectId}/stage-statuses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch project stage statuses: ${response.statusText}`
      );
    }

    return response.json();
  }

  static async initializeProjectStages(
    token: string,
    projectId: number
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/reviews/projects/${projectId}/initialize-stages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to initialize project stages: ${response.statusText}`
      );
    }
  }
}
