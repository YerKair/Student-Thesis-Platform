"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { CreateProject } from "@/features/projects/components/CreateProject";
import { ProjectDeadlines } from "@/features/projects/components/ProjectDeadlines";
import { ProjectsService } from "@/entities/project/api/projectsService";
import { ProjectWithDeadlines } from "@/entities/project/model/types";
import { useAuthContext } from "@/app/providers/auth-provider";
import { api, ProjectStageStatus } from "@/lib/api";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader,
  RefreshCw,
} from "lucide-react";

interface TeamMember {
  id: number;
  fullname: string;
  email: string;
  role?: string;
}

interface Team {
  id: number;
  name: string;
  project_id?: number;
  members: TeamMember[];
}

const statusNames = {
  waiting: "Ожидание",
  in_progress: "В процессе",
  completed: "Завершен",
  failed: "Провален",
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "waiting":
      return <Clock className="h-4 w-4" />;
    case "in_progress":
      return <Loader className="h-4 w-4" />;
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "failed":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting":
      return "bg-gray-100 text-gray-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ThesisPage() {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuthContext();
  const [team, setTeam] = useState<Team | null>(null);
  const [projectWithDeadlines, setProjectWithDeadlines] =
    useState<ProjectWithDeadlines | null>(null);
  const [stageStatuses, setStageStatuses] = useState<ProjectStageStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadTeamAndProject = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        throw new Error("Токен авторизации не найден");
      }

      // Загружаем команду
      const teamResponse = await fetch("/api/teams/my-team", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        setTeam(teamData);

        // Если у команды есть проект, загружаем его с дедлайнами и статусами
        if (teamData.project_id) {
          try {
            const projectData = await ProjectsService.getProjectWithDeadlines(
              token,
              teamData.project_id
            );
            setProjectWithDeadlines(projectData);

            // Загружаем статусы этапов
            try {
              const statuses = await api.reviews.getProjectStageStatuses(
                token,
                teamData.project_id
              );
              setStageStatuses(statuses);
            } catch (statusError) {
              console.error(
                "Ошибка при загрузке статусов этапов:",
                statusError
              );
              // Пытаемся инициализировать статусы, если их нет
              try {
                await api.reviews.initializeProjectStages(
                  token,
                  teamData.project_id
                );
                const statuses = await api.reviews.getProjectStageStatuses(
                  token,
                  teamData.project_id
                );
                setStageStatuses(statuses);
              } catch (initError) {
                console.error("Ошибка при инициализации статусов:", initError);
              }
            }
          } catch (error) {
            console.error("Ошибка при загрузке проекта:", error);
            // Не показываем ошибку пользователю, так как проект может не существовать
          }
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Проверяем авторизацию
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Загружаем данные только если пользователь авторизован
    if (isAuthenticated && token) {
      loadTeamAndProject();
    }
  }, [isAuthenticated, token, authLoading, router]);

  // Автоматическое обновление статусов этапов каждые 30 секунд
  useEffect(() => {
    if (!isAuthenticated || !token || !team?.project_id) {
      return;
    }

    const projectId = team.project_id;
    if (!projectId) return;

    const interval = setInterval(async () => {
      try {
        // Обновляем только статусы этапов, не весь проект
        const statuses = await api.reviews.getProjectStageStatuses(
          token,
          projectId
        );
        setStageStatuses(statuses);
      } catch (error) {
        console.error("Ошибка при автоматическом обновлении статусов:", error);
      }
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, [isAuthenticated, token, team?.project_id]);

  const onProjectCreated = async (projectData: any) => {
    // Обновляем команду
    await loadTeamAndProject();

    // Инициализируем статусы этапов для нового проекта
    try {
      if (token) {
        await api.reviews.initializeProjectStages(token, projectData.id);
        // Перезагружаем данные проекта после инициализации
        const updatedProjectData =
          await ProjectsService.getProjectWithDeadlines(token, projectData.id);
        setProjectWithDeadlines(updatedProjectData);

        // Загружаем статусы этапов
        const statuses = await api.reviews.getProjectStageStatuses(
          token,
          projectData.id
        );
        setStageStatuses(statuses);
      }
    } catch (error) {
      console.error("Ошибка при инициализации статусов этапов:", error);
    }
  };

  const refreshStageStatuses = async () => {
    if (!token || !team?.project_id) return;

    try {
      setRefreshing(true);
      const statuses = await api.reviews.getProjectStageStatuses(
        token,
        team.project_id
      );
      setStageStatuses(statuses);
    } catch (error) {
      console.error("Ошибка при обновлении статусов:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Показываем загрузку пока проверяется авторизация
  if (authLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Проверка авторизации...</p>
          </div>
        </div>
      </div>
    );
  }

  // Если не авторизован, ничего не показываем (произойдет редирект)
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <AlertCircle className="h-8 w-8 mx-auto mb-4" />
              <p>{error}</p>
              <Button onClick={loadTeamAndProject} className="mt-4">
                Попробовать снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Команда не найдена</h3>
              <p className="text-gray-600">
                Вы не состоите в команде. Обратитесь к администратору для
                добавления в команду.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const project = projectWithDeadlines;

  // Вычисляем прогресс на основе статусов этапов
  const calculateProgress = () => {
    if (!stageStatuses || stageStatuses.length === 0) {
      return 0;
    }

    const completedStages = stageStatuses.filter(
      (status) => status.status === "completed"
    ).length;
    return Math.round((completedStages / 4) * 100); // 4 этапа всего
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Дипломная работа</h1>
        <Badge variant="outline" className="text-sm">
          Команда: {team.name}
        </Badge>
      </div>

      {/* Информация о команде */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Команда
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{member.fullname}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
                {member.role && (
                  <Badge variant="secondary">{member.role}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Проект */}
      {project ? (
        <div className="space-y-6">
          {/* Информация о проекте */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.description && (
                <p className="text-gray-600 mb-4">{project.description}</p>
              )}

              {/* Прогресс проекта */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Прогресс проекта</span>
                  <span className="text-sm text-gray-600">
                    {calculateProgress()}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Краткая информация о статусах этапов */}
              {stageStatuses && stageStatuses.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stageStatuses.map((status) => (
                    <div
                      key={status.stage}
                      className="text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-center mb-2">
                        {getStatusIcon(status.status)}
                      </div>
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        {status.stage === "initial"
                          ? "Начальный"
                          : status.stage === "technical"
                          ? "Технический"
                          : status.stage === "methodological"
                          ? "Методологический"
                          : "Финальный"}
                      </p>
                      <Badge
                        className={getStatusColor(status.status)}
                        variant="secondary"
                      >
                        {statusNames[status.status]}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                Создан:{" "}
                {new Date(project.created_at).toLocaleDateString("ru-RU")}
              </div>
            </CardContent>
          </Card>

          {/* Дедлайны и статусы этапов */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Этапы проекта
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshStageStatuses}
                  disabled={refreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Обновление..." : "Обновить статусы"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ProjectDeadlines
                deadlines={project.deadlines}
                stageStatuses={stageStatuses}
                projectId={project.id}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <CreateProject teamId={team.id} onProjectCreated={onProjectCreated} />
      )}
    </div>
  );
}
