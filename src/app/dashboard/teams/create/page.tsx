"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamsService } from "@/features/teams/api/teams.service";
import { useToast } from "@/shared/ui/use-toast";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function CreateTeamPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Название команды обязательно",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Генерируем код команды
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();

      await TeamsService.createTeam({
        name: name.trim(),
        code,
      });
      toast({
        title: "Успех",
        description: "Команда успешно создана",
      });
      router.push("/dashboard/thesis");
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось создать команду",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Создание команды</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Название команды
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название команды"
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать команду"}
          </Button>
        </form>
      </div>
    </div>
  );
}
