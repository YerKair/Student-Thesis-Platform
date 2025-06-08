const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiError extends Error {
  status?: number;
}

export interface Review {
  id: number;
  project_id: number;
  stage: "initial" | "technical" | "methodological" | "final";
  status: "pending" | "in_progress" | "passed" | "failed";
  comments: string | null;
  score: number | null;
  created_at: string;
  updated_at: string;
  reviewer_id: number;
}

export interface ReviewUpdateData {
  status: Review["status"];
  comments: string | null;
  score?: number | null;
}

export interface StageDeadline {
  id: number;
  project_id: number;
  stage: "initial" | "technical" | "methodological" | "final";
  deadline: string;
  set_by_id: number;
  created_at: string;
  updated_at: string;
}

export interface StageDeadlineCreate {
  project_id: number;
  stage: "initial" | "technical" | "methodological" | "final";
  deadline: string;
}

export interface ReviewerDashboard {
  total_reviews: number;
  pending_reviews: number;
  in_progress_reviews: number;
  completed_reviews: number;
  recent_reviews: Review[];
  upcoming_deadlines: StageDeadline[];
}

export interface ProjectFile {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  version_number: number;
  uploaded_by_id: number;
  created_at: string;
  status: string;
  comment: string | null;
  stage: string | null;
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

export interface UpdateStageStatusData {
  stage: string;
  status: string;
  supervisor_comment?: string;
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = new Error("API request failed") as ApiError;
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export const api = {
  reviews: {
    getMyReviews: async (token: string | null): Promise<Review[]> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/reviews/my-reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    updateReview: async (
      token: string | null,
      reviewId: number,
      data: ReviewUpdateData
    ): Promise<Review> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth(`/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    getDashboard: async (token: string | null): Promise<ReviewerDashboard> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/reviews/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    getProjectFiles: async (
      token: string | null,
      projectId: number,
      stage?: string
    ): Promise<ProjectFile[]> => {
      if (!token) throw new Error("No authentication token");

      const params = stage ? `?stage=${stage}` : "";
      return fetchWithAuth(`/reviews/projects/${projectId}/files${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    setDeadline: async (
      token: string | null,
      data: StageDeadlineCreate
    ): Promise<StageDeadline> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/reviews/deadlines", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    getProjectDeadlines: async (
      token: string | null,
      projectId: number
    ): Promise<StageDeadline[]> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth(`/reviews/projects/${projectId}/deadlines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    getProjectStageStatuses: async (
      token: string | null,
      projectId: number
    ): Promise<ProjectStageStatus[]> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth(`/reviews/projects/${projectId}/stage-statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    updateProjectStageStatus: async (
      token: string | null,
      projectId: number,
      data: UpdateStageStatusData
    ): Promise<ProjectStageStatus> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth(`/reviews/projects/${projectId}/stage-status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    initializeProjectStages: async (
      token: string | null,
      projectId: number
    ): Promise<{ message: string }> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth(`/reviews/projects/${projectId}/initialize-stages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
  teams: {
    getMyTeams: async (token: string | null): Promise<{ teams: any[] }> => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/teams/my-teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
  profile: {
    getProfile: async (token: string | null) => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    updateProfile: async (
      token: string | null,
      data: {
        fullname: string;
        specialization?: string;
        course?: string;
        group?: string;
      }
    ) => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    changePassword: async (
      token: string | null,
      data: {
        current_password: string;
        new_password: string;
      }
    ) => {
      if (!token) throw new Error("No authentication token");

      return fetchWithAuth("/users/password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
  },
};
