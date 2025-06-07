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

export interface Project {
  id: number;
  name: string;
  description: string;
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
  project?: ProjectWithDetails;
  project_id?: number;
  created_at: string;
}

export interface ReviewerDashboard {
  pending_reviews: any[];
  in_progress_reviews: any[];
  completed_reviews: any[];
  upcoming_deadlines: any[];
}

export interface ProjectWithDetails {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  stage_statuses: StageStatus[];
  deadlines: Deadline[];
}
