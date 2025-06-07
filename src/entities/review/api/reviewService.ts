import { api } from "@/lib/api";

export class ReviewService {
  static async getMyReviews(token: string) {
    return api.reviews.getMyReviews(token);
  }

  static async getDashboard(token: string) {
    return api.reviews.getDashboard(token);
  }

  static async updateReview(token: string, reviewId: number, data: any) {
    return api.reviews.updateReview(token, reviewId, data);
  }

  static async getProjectFiles(
    token: string,
    projectId: number,
    stage: string
  ) {
    return api.reviews.getProjectFiles(token, projectId, stage);
  }

  static async setDeadline(token: string, data: any) {
    return api.reviews.setDeadline(token, data);
  }

  static async getTeamsWithProjects(token: string) {
    return api.teams.getMyTeams(token);
  }
}
