"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useToast } from "@/shared/ui/use-toast";
import { TeamProjectsService } from "../api/team-projects.service";
import { Project } from "@/entities/project/model/types";

interface CreateProjectProps {
  teamId: number;
  onProjectCreated: (project: Project) => void;
}

export function CreateProject({
  teamId,
  onProjectCreated,
}: CreateProjectProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Название проекта обязательно",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const project = await TeamProjectsService.createProject(teamId, {
        name,
        description: description || undefined,
      });
      toast({
        title: "Успех",
        description: "Проект успешно создан",
      });
      onProjectCreated(project);
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось создать проект",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Создание проекта</h1>
        <div className="bg-yellow-50 p-4 rounded-md mb-6">
          <p className="text-sm text-yellow-800">
            Для начала работы над дипломом необходимо создать проект. После
            создания проекта вы сможете отслеживать прогресс и загружать файлы
            для каждого этапа работы.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Название проекта
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название проекта"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Описание
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите ваш проект"
              disabled={isLoading}
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать проект"}
          </Button>
        </form>
      </div>
    </div>
  );
}
