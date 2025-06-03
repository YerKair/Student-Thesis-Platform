"use client";

import { Team } from "@/entities/team/model/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { User, Users } from "lucide-react";

interface TeamCardProps {
  team: Team;
  actionLabel?: string;
  onAction?: () => void;
  showMembers?: boolean;
}

export function TeamCard({
  team,
  actionLabel,
  onAction,
  showMembers = false,
}: TeamCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Дата не указана";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Дата не указана";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Код команды: {team.code}</p>
          <p>Создана: {formatDate(team.created_at)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>
            {team.members?.length || 0}{" "}
            {team.members?.length === 1 ? "участник" : "участников"}
          </span>
        </div>
        {showMembers && team.members && team.members.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Участники команды:</h4>
            <div className="space-y-1">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{member.fullname}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {member.role === "creator" ? "Создатель" : "Участник"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {actionLabel && onAction && (
        <CardFooter>
          <Button className="w-full" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
