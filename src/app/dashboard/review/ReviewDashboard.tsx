"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Badge } from "@/shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  Calendar,
  FileText,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  Download,
  Eye,
} from "lucide-react";
import { ReviewService, TeamWithProject, StageStatus } from "./reviewApi";
import { useAuthContext } from "@/app/providers/auth-provider";

interface FileComment {
  id: number;
  file_id: number;
  reviewer_id: number;
  comment: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ProjectFile {
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

const ReviewDashboard: React.FC = () => {
  const { user, token } = useAuthContext();

  const [teams, setTeams] = useState<TeamWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<TeamWithProject | null>(
    null
  );
  const [selectedStage, setSelectedStage] = useState<string>("initial");
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [comment, setComment] = useState("");
  const [fileStatus, setFileStatus] = useState<string>("approved");
  const [stageComment, setStageComment] = useState("");
  const [stageStatus, setStageStatus] = useState<string>("completed");

  const stages = [
    { value: "initial", label: "Начальный этап" },
    { value: "technical", label: "Технический этап" },
    { value: "methodological", label: "Методологический этап" },
    { value: "final", label: "Финальный этап" },
  ];

  const statusColors = {
    waiting: "bg-amber-100 text-amber-900 border-amber-200",
    in_progress: "bg-blue-100 text-blue-900 border-blue-200",
    completed: "bg-emerald-100 text-emerald-900 border-emerald-200",
    failed: "bg-red-100 text-red-900 border-red-200",
  };

  const fileStatusColors = {
    approved: "bg-emerald-100 text-emerald-900 border-emerald-200",
    rejected: "bg-red-100 text-red-900 border-red-200",
    needs_revision: "bg-amber-100 text-amber-900 border-amber-200",
  };

  useEffect(() => {
    if (token) {
      fetchTeamsWithProjects();
    }
  }, [token]);

  const fetchTeamsWithProjects = async () => {
    try {
      setLoading(true);
      const teamsData = await ReviewService.getTeamsWithProjects(token!);
      setTeams(teamsData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFiles = async (projectId: number, stage: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/projects/${projectId}/files?stage=${stage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const files = await response.json();
        setProjectFiles(files);
      }
    } catch (error) {
      console.error("Error fetching project files:", error);
    }
  };

  const handleTeamSelect = (team: TeamWithProject) => {
    setSelectedTeam(team);
    if (team.project) {
      fetchProjectFiles(team.project.id, selectedStage);
    }
  };

  const handleStageChange = (stage: string) => {
    setSelectedStage(stage);
    if (selectedTeam?.project) {
      fetchProjectFiles(selectedTeam.project.id, stage);
    }
  };

  const handleFileComment = async () => {
    if (!selectedFile || !comment.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8000/reviews/files/${selectedFile.id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
            status: fileStatus,
          }),
        }
      );

      if (response.ok) {
        // Обновляем локальное состояние файлов
        setProjectFiles((prevFiles) =>
          prevFiles.map((file) => {
            if (file.id === selectedFile.id) {
              return {
                ...file,
                status: fileStatus,
                comment: comment,
              };
            }
            return file;
          })
        );

        setComment("");
        setCommentDialogOpen(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error adding file comment:", error);
    }
  };

  const handleStageStatusUpdate = async () => {
    if (!selectedTeam?.project) return;

    try {
      const response = await fetch(
        `http://localhost:8000/reviews/projects/${selectedTeam.project.id}/stage-status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stage: selectedStage,
            status: stageStatus,
            supervisor_comment: stageComment,
          }),
        }
      );

      if (response.ok) {
        // Обновляем локальное состояние команды
        setSelectedTeam((prevTeam) => {
          if (!prevTeam?.project) return prevTeam;

          const updatedStageStatuses = prevTeam.project.stage_statuses || [];
          const existingStageIndex = updatedStageStatuses.findIndex(
            (s) => s.stage === selectedStage
          );

          const updatedStageStatus = {
            stage: selectedStage,
            status: stageStatus,
            supervisor_comment: stageComment,
            updated_by_name: user?.name || "Ревьюер",
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          };

          if (existingStageIndex >= 0) {
            // Обновляем существующий статус
            updatedStageStatuses[existingStageIndex] = updatedStageStatus;
          } else {
            // Добавляем новый статус
            updatedStageStatuses.push(updatedStageStatus);
          }

          return {
            ...prevTeam,
            project: {
              ...prevTeam.project,
              stage_statuses: updatedStageStatuses,
            },
          };
        });

        // Также обновляем общий список команд
        setTeams((prevTeams) =>
          prevTeams.map((team) => {
            if (team.id === selectedTeam.id && team.project) {
              const updatedStageStatuses = team.project.stage_statuses || [];
              const existingStageIndex = updatedStageStatuses.findIndex(
                (s) => s.stage === selectedStage
              );

              const updatedStageStatus = {
                stage: selectedStage,
                status: stageStatus,
                supervisor_comment: stageComment,
                updated_by_name: user?.name || "Ревьюер",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
              };

              if (existingStageIndex >= 0) {
                updatedStageStatuses[existingStageIndex] = updatedStageStatus;
              } else {
                updatedStageStatuses.push(updatedStageStatus);
              }

              return {
                ...team,
                project: {
                  ...team.project,
                  stage_statuses: updatedStageStatuses,
                },
              };
            }
            return team;
          })
        );

        setStageComment("");
        setReviewDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating stage status:", error);
    }
  };

  const getStageStatus = (stageStatuses: StageStatus[], stage: string) => {
    return stageStatuses.find((s) => s.stage === stage);
  };

  const downloadFile = async (file: ProjectFile) => {
    try {
      const response = await fetch(
        `http://localhost:8000/projects/files/${file.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.file_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Панель ревьюера
          </h1>
          <Badge
            variant="outline"
            className="text-sm sm:text-base px-3 sm:px-4 py-2 bg-white border-2 border-blue-200 text-blue-800 font-semibold self-start sm:self-auto"
          >
            {teams.length} команд для проверки
          </Badge>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Teams List */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <Card className="border-2 border-gray-200 shadow-lg bg-white sticky top-4">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200 p-4 lg:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl text-gray-900">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Команды с проектами</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[70vh] overflow-y-auto">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTeam?.id === team.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleTeamSelect(team)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-2">
                        {team.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 border border-gray-300 font-medium text-xs sm:text-sm flex-shrink-0 self-start"
                      >
                        #{team.project?.id}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 font-medium line-clamp-2">
                      {team.project?.name || "Без названия"}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                      <span className="font-medium">
                        {team.members?.length || 0} участников
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            {selectedTeam ? (
              <div className="space-y-6 lg:space-y-8">
                {/* Project Info */}
                <Card className="border-2 border-gray-200 shadow-lg bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-gray-200 p-4 lg:p-6">
                    <CardTitle className="flex items-start gap-2 sm:gap-3 text-lg sm:text-xl text-gray-900">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="break-words">
                        {selectedTeam.project?.name || "Проект без названия"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">
                          Команда
                        </p>
                        <p className="font-bold text-gray-900 text-base sm:text-lg break-words">
                          {selectedTeam.name}
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">
                          Участники
                        </p>
                        <p className="font-bold text-gray-900 text-base sm:text-lg">
                          {selectedTeam.members?.length || 0}
                        </p>
                      </div>
                    </div>
                    {selectedTeam.project?.description && (
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs sm:text-sm font-semibold text-blue-800 mb-2">
                          Описание проекта
                        </p>
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                          {selectedTeam.project.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stage Tabs */}
                <Card className="border-2 border-gray-200 shadow-lg bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-200 p-4 lg:p-6">
                    <CardTitle className="text-lg sm:text-xl text-gray-900">
                      Этапы проекта
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <Tabs
                      value={selectedStage}
                      onValueChange={handleStageChange}
                    >
                      {/* Mobile: Vertical tabs, Desktop: Horizontal tabs */}
                      <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-gray-100 p-1 rounded-lg border-2 border-gray-200 gap-1 sm:gap-0">
                        {stages.map((stage) => {
                          const stageStatus = getStageStatus(
                            selectedTeam.project?.stage_statuses || [],
                            stage.value
                          );
                          return (
                            <TabsTrigger
                              key={stage.value}
                              value={stage.value}
                              className="relative font-semibold text-xs sm:text-sm text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-md border-2 border-transparent data-[state=active]:border-gray-300 p-2 sm:p-3 min-h-[3rem] sm:min-h-[2.5rem] flex flex-col sm:flex-row items-center justify-center text-center"
                            >
                              <span className="break-words leading-tight">
                                {stage.label}
                              </span>
                              {stageStatus && (
                                <div
                                  className={`absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                                    stageStatus.status === "completed"
                                      ? "bg-emerald-500"
                                      : stageStatus.status === "failed"
                                      ? "bg-red-500"
                                      : stageStatus.status === "in_progress"
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                  }`}
                                />
                              )}
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      {stages.map((stage) => {
                        const stageStatus = getStageStatus(
                          selectedTeam.project?.stage_statuses || [],
                          stage.value
                        );

                        return (
                          <TabsContent
                            key={stage.value}
                            value={stage.value}
                            className="mt-6 sm:mt-8"
                          >
                            <div className="space-y-4 sm:space-y-6">
                              {/* Stage Status */}
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                                    {stage.label}
                                  </h4>
                                  {stageStatus && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                      <Badge
                                        className={`px-3 py-1 font-semibold border w-fit ${
                                          statusColors[
                                            stageStatus.status as keyof typeof statusColors
                                          ]
                                        }`}
                                      >
                                        {stageStatus.status === "waiting" &&
                                          "Ожидание"}
                                        {stageStatus.status === "in_progress" &&
                                          "В процессе"}
                                        {stageStatus.status === "completed" &&
                                          "Завершен"}
                                        {stageStatus.status === "failed" &&
                                          "Провален"}
                                      </Badge>
                                      {stageStatus.updated_by_name && (
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                          от {stageStatus.updated_by_name}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <Dialog
                                  open={reviewDialogOpen}
                                  onOpenChange={setReviewDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      size="lg"
                                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 shadow-lg w-full sm:w-auto text-sm sm:text-base flex-shrink-0"
                                    >
                                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                      Оценить этап
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-white border-2 border-gray-300 shadow-2xl w-[95vw] max-w-md mx-auto">
                                    <DialogHeader className="border-b border-gray-200 pb-4">
                                      <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                                        Оценка этапа: {stage.label}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 sm:space-y-6 pt-4">
                                      <div>
                                        <Label
                                          htmlFor="stage-status"
                                          className="text-sm font-semibold text-gray-700 mb-2 block"
                                        >
                                          Статус
                                        </Label>
                                        <Select
                                          value={stageStatus}
                                          onValueChange={setStageStatus}
                                        >
                                          <SelectTrigger className="border-2 border-gray-300 bg-white text-gray-900 font-medium">
                                            <SelectValue placeholder="Выберите статус" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-white border-2 border-gray-300 shadow-lg">
                                            <SelectItem
                                              value="completed"
                                              className="font-medium text-emerald-700"
                                            >
                                              Завершен успешно
                                            </SelectItem>
                                            <SelectItem
                                              value="failed"
                                              className="font-medium text-red-700"
                                            >
                                              Провален
                                            </SelectItem>
                                            <SelectItem
                                              value="in_progress"
                                              className="font-medium text-blue-700"
                                            >
                                              В процессе
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label
                                          htmlFor="stage-comment"
                                          className="text-sm font-semibold text-gray-700 mb-2 block"
                                        >
                                          Комментарий
                                        </Label>
                                        <Textarea
                                          id="stage-comment"
                                          value={stageComment}
                                          onChange={(e) =>
                                            setStageComment(e.target.value)
                                          }
                                          placeholder="Оставьте комментарий к этапу..."
                                          rows={4}
                                          className="border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 font-medium resize-none"
                                        />
                                      </div>
                                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setReviewDialogOpen(false)
                                          }
                                          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold order-2 sm:order-1"
                                        >
                                          Отмена
                                        </Button>
                                        <Button
                                          onClick={handleStageStatusUpdate}
                                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg order-1 sm:order-2"
                                        >
                                          Сохранить оценку
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              {/* Stage Comment */}
                              {stageStatus?.supervisor_comment && (
                                <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                                  <h5 className="font-bold text-blue-900 mb-3 text-sm sm:text-base">
                                    Комментарий ревьюера
                                  </h5>
                                  <p className="text-blue-800 leading-relaxed font-medium text-sm sm:text-base break-words">
                                    {stageStatus.supervisor_comment}
                                  </p>
                                </div>
                              )}

                              {/* Files */}
                              <div>
                                <h5 className="font-bold text-lg sm:text-xl text-gray-900 mb-4">
                                  Файлы этапа
                                </h5>
                                {projectFiles.length === 0 ? (
                                  <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
                                    <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 font-medium text-base sm:text-lg">
                                      Файлы для этого этапа не найдены
                                    </p>
                                  </div>
                                ) : (
                                  <div className="space-y-3 sm:space-y-4">
                                    {projectFiles.map((file) => (
                                      <div
                                        key={file.id}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-2 border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow"
                                      >
                                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                          <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0 mt-1" />
                                          <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 text-base sm:text-lg break-words">
                                              {file.file_name}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                              Версия {file.version_number} •{" "}
                                              {new Date(
                                                file.created_at
                                              ).toLocaleDateString()}
                                            </p>
                                            {file.status && (
                                              <Badge
                                                className={`mt-2 px-2 sm:px-3 py-1 font-semibold border text-xs sm:text-sm w-fit ${
                                                  fileStatusColors[
                                                    file.status as keyof typeof fileStatusColors
                                                  ]
                                                }`}
                                              >
                                                {file.status === "approved" &&
                                                  "Одобрено"}
                                                {file.status === "rejected" &&
                                                  "Отклонено"}
                                                {file.status ===
                                                  "needs_revision" &&
                                                  "Требует доработки"}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                          <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={() => downloadFile(file)}
                                            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold p-2 sm:p-3"
                                          >
                                            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                                          </Button>
                                          <Dialog
                                            open={commentDialogOpen}
                                            onOpenChange={setCommentDialogOpen}
                                          >
                                            <DialogTrigger asChild>
                                              <Button
                                                size="lg"
                                                onClick={() =>
                                                  setSelectedFile(file)
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
                                              >
                                                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                                                <span className="hidden sm:inline">
                                                  Комментарий
                                                </span>
                                                <span className="sm:hidden">
                                                  Ком.
                                                </span>
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white border-2 border-gray-300 shadow-2xl w-[95vw] max-w-md mx-auto">
                                              <DialogHeader className="border-b border-gray-200 pb-4">
                                                <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
                                                  Комментарий к файлу
                                                </DialogTitle>
                                              </DialogHeader>
                                              <div className="space-y-4 sm:space-y-6 pt-4">
                                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                  <Label className="text-sm font-semibold text-gray-700 mb-1 block">
                                                    Файл
                                                  </Label>
                                                  <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
                                                    {selectedFile?.file_name}
                                                  </p>
                                                </div>
                                                <div>
                                                  <Label
                                                    htmlFor="file-status"
                                                    className="text-sm font-semibold text-gray-700 mb-2 block"
                                                  >
                                                    Статус
                                                  </Label>
                                                  <Select
                                                    value={fileStatus}
                                                    onValueChange={
                                                      setFileStatus
                                                    }
                                                  >
                                                    <SelectTrigger className="border-2 border-gray-300 bg-white text-gray-900 font-medium">
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-2 border-gray-300 shadow-lg">
                                                      <SelectItem
                                                        value="approved"
                                                        className="font-medium text-emerald-700"
                                                      >
                                                        Одобрено
                                                      </SelectItem>
                                                      <SelectItem
                                                        value="rejected"
                                                        className="font-medium text-red-700"
                                                      >
                                                        Отклонено
                                                      </SelectItem>
                                                      <SelectItem
                                                        value="needs_revision"
                                                        className="font-medium text-amber-700"
                                                      >
                                                        Требует доработки
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                                <div>
                                                  <Label
                                                    htmlFor="comment"
                                                    className="text-sm font-semibold text-gray-700 mb-2 block"
                                                  >
                                                    Комментарий
                                                  </Label>
                                                  <Textarea
                                                    id="comment"
                                                    value={comment}
                                                    onChange={(e) =>
                                                      setComment(e.target.value)
                                                    }
                                                    placeholder="Оставьте комментарий к файлу..."
                                                    rows={4}
                                                    className="border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 font-medium resize-none"
                                                  />
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                                                  <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                      setCommentDialogOpen(
                                                        false
                                                      );
                                                      setSelectedFile(null);
                                                      setComment("");
                                                    }}
                                                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold order-2 sm:order-1"
                                                  >
                                                    Отмена
                                                  </Button>
                                                  <Button
                                                    onClick={handleFileComment}
                                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg order-1 sm:order-2"
                                                  >
                                                    Сохранить
                                                  </Button>
                                                </div>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-2 border-gray-200 shadow-lg bg-white">
                <CardContent className="flex items-center justify-center py-12 sm:py-20">
                  <div className="text-center px-4">
                    <Users className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mx-auto mb-4 sm:mb-6" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                      Выберите команду
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">
                      Выберите команду из списка для просмотра деталей проекта
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDashboard;
