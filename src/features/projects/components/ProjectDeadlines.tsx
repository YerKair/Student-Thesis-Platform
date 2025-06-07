"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader,
} from "lucide-react";
import { StageDeadlineInfo } from "@/entities/project/model/types";
import { ProjectStageStatus } from "@/lib/api";
import { StageFiles } from "./StageFiles";

interface ProjectDeadlinesProps {
  deadlines: StageDeadlineInfo[];
  stageStatuses?: ProjectStageStatus[];
  projectId?: number;
}

const stageNames = {
  initial: "Начальный этап",
  technical: "Технический этап",
  methodological: "Методологический этап",
  final: "Финальный этап",
};

const statusNames = {
  waiting: "Ожидание",
  in_progress: "В процессе",
  completed: "Завершен",
  failed: "Провален",
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "initial":
      return "bg-blue-100 text-blue-800";
    case "technical":
      return "bg-green-100 text-green-800";
    case "methodological":
      return "bg-yellow-100 text-yellow-800";
    case "final":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
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

const isDeadlineClose = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays >= 0;
};

const isDeadlinePassed = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  return deadlineDate < now;
};

export function ProjectDeadlines({
  deadlines,
  stageStatuses = [],
  projectId,
}: ProjectDeadlinesProps) {
  // Создаем карту статусов для быстрого поиска
  const statusMap = stageStatuses.reduce((acc, status) => {
    acc[status.stage] = status;
    return acc;
  }, {} as Record<string, ProjectStageStatus>);

  // Создаем объединенный список этапов
  const allStages = [
    "initial",
    "technical",
    "methodological",
    "final",
  ] as const;
  const stageData = allStages.map((stage) => {
    const deadline = deadlines.find((d) => d.stage === stage);
    const status = statusMap[stage];
    return { stage, deadline, status };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Этапы проекта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stageData.map(({ stage, deadline, status }) => {
          const isClose = deadline ? isDeadlineClose(deadline.deadline) : false;
          const isPassed = deadline
            ? isDeadlinePassed(deadline.deadline)
            : false;

          return (
            <div
              key={stage}
              className={`p-4 rounded-lg border ${
                isPassed && status?.status !== "completed"
                  ? "border-red-200 bg-red-50"
                  : isClose && status?.status !== "completed"
                  ? "border-yellow-200 bg-yellow-50"
                  : status?.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={getStageColor(stage)}>
                    {stageNames[stage]}
                  </Badge>
                  {status && (
                    <Badge className={getStatusColor(status.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(status.status)}
                        {statusNames[status.status]}
                      </div>
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {isPassed && status?.status !== "completed" && (
                    <Badge variant="destructive">Просрочен</Badge>
                  )}
                  {isClose && !isPassed && status?.status !== "completed" && (
                    <Badge
                      variant="outline"
                      className="text-yellow-600 border-yellow-600"
                    >
                      Скоро истекает
                    </Badge>
                  )}
                </div>
              </div>

              {deadline && (
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      Дедлайн:{" "}
                      {new Date(deadline.deadline).toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>
                      Установлен:{" "}
                      {deadline.set_by_name || `ID: ${deadline.set_by_id}`}
                    </span>
                  </div>
                </div>
              )}

              {!deadline && (
                <div className="text-sm text-gray-500 mb-2">
                  Дедлайн не установлен
                </div>
              )}

              {status?.supervisor_comment && (
                <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <User className="h-5 w-5 text-blue-600 mt-0.5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Комментарий ревьюера
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        {status.supervisor_comment}
                      </p>
                      {status.updated_by_name && (
                        <p className="text-xs text-blue-600 mt-2">
                          — {status.updated_by_name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Файлы этапа */}
              {projectId && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <StageFiles
                    projectId={projectId}
                    stage={stage}
                    stageName={stageNames[stage]}
                    disabled={status?.status === "completed"}
                  />
                </div>
              )}

              {status && (
                <div className="text-xs text-gray-500 mt-2">
                  Статус обновлен:{" "}
                  {new Date(status.updated_at).toLocaleDateString("ru-RU")}
                  {status.updated_by_name &&
                    ` пользователем ${status.updated_by_name}`}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
