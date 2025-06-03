"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/features/projects/components/Stage";
import { CreateProject } from "@/features/projects/components/CreateProject";
import { TeamProjectsService } from "@/features/projects/api/team-projects.service";
import { TeamsService } from "@/features/teams/api/teams-service";
import { useToast } from "@/shared/ui/use-toast";
import { Progress } from "@/shared/ui/progress";
import { Project } from "@/entities/project/model/types";
import { Team } from "@/entities/team/model/types";
import { Button } from "@/shared/ui/button";
import { useAuthContext } from "@/app/providers/auth-provider";
import { Card } from "@/shared/ui/card";
import { AlertCircle } from "lucide-react";

interface ThesisStage {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: "completed" | "in_progress" | "waiting";
  supervisorComment?: string;
}

export default function ThesisPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuthContext();

  const [stages] = useState<ThesisStage[]>([
    {
      id: 1,
      title: "Первая преддзащита",
      description: "Загрузите план-график и предварительный план работы.",
      deadline: "2024-04-12",
      status: "completed",
      supervisorComment:
        "Хорошая подготовка и четкое понимание целей исследования. Рекомендую больше внимания уделить методологии.",
    },
    {
      id: 2,
      title: "Вторая преддзащита",
      description:
        "Презентация первых результатов исследования и черновой версии теоретической части работы. Загрузите черновик первой главы и презентацию.",
      deadline: "2024-04-26",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Преддипломная практика",
      description:
        "Прохождение преддипломной практики и подготовка соответствующей документации.",
      deadline: "2024-05-21",
      status: "waiting",
    },
    {
      id: 4,
      title: "Финальная версия дипломной работы",
      description:
        "Загрузка финальной версии дипломной работы и всех необходимых документов.",
      deadline: "2024-06-11",
      status: "waiting",
    },
  ]);

  const loadTeamAndProject = async () => {
    if (!token) {
      toast({
        title: "Ошибка",
        description: "Необходима авторизация",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Получаем список команд пользователя
      const teams = await TeamsService.getMyTeams(token);

      // Если у пользователя нет команд, перенаправляем на страницу создания команды
      if (teams.length === 0) {
        router.push("/dashboard/teams/create");
        return;
      }

      // Берем первую команду (в будущем можно добавить выбор команды)
      const team = teams[0];
      setTeam(team);

      // Проверяем наличие руководителя
      if (!team.supervisor_id) {
        setIsLoading(false);
        return;
      }

      // Получаем проект команды
      const project = await TeamProjectsService.getTeamProject(team.id);
      setProject(project);
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить данные",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeamAndProject();
  }, [token]);

  // Получение прогресса выполнения диплома
  const getOverallProgress = () => {
    const completedStages = stages.filter(
      (stage) => stage.status === "completed"
    ).length;
    return (completedStages / stages.length) * 100;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-bold mb-4">У вас нет команды</h2>
        <p className="text-gray-600 mb-6">
          Для работы над дипломным проектом необходимо создать или
          присоединиться к команде
        </p>
        <Button onClick={() => router.push("/dashboard/teams/create")}>
          Создать команду
        </Button>
      </div>
    );
  }

  if (!team.supervisor_id) {
    return (
      <div className="container mx-auto py-6">
        <Card className="mb-6 p-6 border-yellow-500 bg-yellow-50">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-900">Нет руководителя</h3>
              <p className="text-yellow-800 mt-1">
                Для начала работы над дипломным проектом необходимо, чтобы у
                вашей команды был назначен руководитель. Дождитесь, пока
                преподаватель возьмет вашу команду на руководство.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Информация о команде</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="font-medium mb-2">Название команды</h3>
              <p className="text-gray-600">{team.name}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Код команды</h3>
              <p className="font-mono bg-muted p-2 rounded">{team.code}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Участники</h3>
              <div className="space-y-2">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{member.fullname}</span>
                      <span className="text-sm text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                    <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                      {member.role === "creator" ? "Создатель" : "Участник"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <CreateProject
        teamId={team.id}
        onProjectCreated={(newProject) => {
          setProject(newProject);
        }}
      />
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Дипломная работа</h1>
            <p className="text-gray-600">
              Отслеживайте прогресс вашей дипломной работы и загружайте
              необходимые файлы на каждом этапе.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-2">Общий прогресс</div>
            <Progress value={getOverallProgress()} className="w-[200px]" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <Stage
            key={stage.id}
            projectId={project.id}
            title={stage.title}
            description={stage.description}
            deadline={stage.deadline}
            status={stage.status}
            supervisorComment={stage.supervisorComment}
            defaultExpanded={stage.status === "in_progress"}
          />
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-bold mb-4">
          Информация о дипломной работе
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Тема</h3>
            <p className="text-gray-600">{project.name}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Команда</h3>
            <p className="text-gray-600">{team.name}</p>
          </div>
          {project.description && (
            <div className="col-span-2">
              <h3 className="font-medium mb-2">Описание</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
