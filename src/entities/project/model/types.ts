export interface Project {
  id: number;
  name: string;
  description: string | null;
  teamId: number;
  createdAt: string;
  updatedAt: string;
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
