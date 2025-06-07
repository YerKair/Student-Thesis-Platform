export interface Project {
  id: number;
  name: string;
  description?: string;
  team_id: number;
  created_at: string;
  updated_at: string;
}

export interface StageDeadlineInfo {
  id: number;
  project_id: number;
  stage: "initial" | "technical" | "methodological" | "final";
  deadline: string;
  set_by_id: number;
  set_by_name: string;
  set_by_email: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectStageStatus {
  id: number;
  project_id: number;
  stage: "initial" | "technical" | "methodological" | "final";
  status: "waiting" | "in_progress" | "completed" | "failed";
  supervisor_comment?: string;
  updated_by_id?: number;
  updated_by_name?: string;
  updated_by_email?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithDeadlines {
  id: number;
  name: string;
  description?: string;
  team_id: number;
  created_at: string;
  updated_at: string;
  team?: {
    id: number;
    name: string;
    members: Array<{
      id: number;
      fullname: string;
      email: string;
      role?: string;
    }>;
  };
  deadlines: StageDeadlineInfo[];
  stage_statuses: ProjectStageStatus[];
}

export interface CreateProjectDto {
  name: string;
  description?: string | null;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string | null;
  team_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithDeadlinesResponse {
  id: number;
  name: string;
  description: string | null;
  team_id: number;
  created_at: string;
  updated_at: string;
  deadlines: StageDeadlineInfo[];
}

export interface FileVersion {
  id: number;
  projectId: number;
  fileName: string;
  filePath: string;
  versionNumber: number;
  uploadedById: number;
  uploadedAt: string;
  comment: string | null;
}

export interface FileVersionResponse {
  id: number;
  project_id: number;
  file_name: string;
  file_path: string;
  version_number: number;
  uploaded_by_id: number;
  uploaded_at: string;
  comment: string | null;
}

export interface UploadFileDto {
  file: File;
  comment?: string;
}
