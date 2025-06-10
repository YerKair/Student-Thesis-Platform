"use client";

import { useState } from "react";
import { Calendar, Send, AlertTriangle, MessageSquare } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Badge } from "@/shared/ui/badge";
import { CreateMessageRequest } from "@/entities/message/model/types";

interface Team {
  id: number;
  name: string;
  memberCount?: number;
}

interface SendMessageFormProps {
  teams: Team[];
  onSubmit: (data: CreateMessageRequest) => Promise<void>;
  isLoading?: boolean;
}

export function SendMessageForm({
  teams,
  onSubmit,
  isLoading = false,
}: SendMessageFormProps) {
  const [formData, setFormData] = useState({
    team_id: 0,
    title: "",
    content: "",
    message_type: "message" as "message" | "meeting",
    is_urgent: false,
    meeting_date: "",
    meeting_location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.team_id) {
      newErrors.team_id = "Выберите команду";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Заголовок обязателен";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Содержание обязательно";
    }
    if (formData.message_type === "meeting") {
      if (!formData.meeting_date) {
        newErrors.meeting_date = "Дата встречи обязательна";
      }
      if (!formData.meeting_location.trim()) {
        newErrors.meeting_location = "Место проведения обязательно";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const messageData: CreateMessageRequest = {
        team_id: formData.team_id,
        title: formData.title,
        content: formData.content,
        message_type: formData.message_type,
        is_urgent: formData.is_urgent,
      };

      if (formData.message_type === "meeting") {
        messageData.meeting_date = formData.meeting_date;
        messageData.meeting_location = formData.meeting_location;
      }

      await onSubmit(messageData);

      // Reset form
      setFormData({
        team_id: 0,
        title: "",
        content: "",
        message_type: "message",
        is_urgent: false,
        meeting_date: "",
        meeting_location: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {formData.message_type === "meeting" ? (
            <Calendar className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
          {formData.message_type === "meeting"
            ? "Назначить встречу"
            : "Отправить сообщение"}
        </CardTitle>
        <CardDescription>
          {formData.message_type === "meeting"
            ? "Создайте встречу для выбранной команды"
            : "Отправьте важное сообщение участникам команды"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Выбор команды */}
          <div className="space-y-2">
            <Label htmlFor="team_id">Команда</Label>
            <Select
              onValueChange={(value) =>
                updateFormData("team_id", parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите команду" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{team.name}</span>
                      {team.memberCount && (
                        <Badge variant="secondary" className="ml-2">
                          {team.memberCount} чел.
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.team_id && (
              <p className="text-sm text-red-600">{errors.team_id}</p>
            )}
          </div>

          {/* Тип сообщения */}
          <div className="space-y-2">
            <Label htmlFor="message_type">Тип</Label>
            <Select
              onValueChange={(value: "message" | "meeting") => {
                updateFormData("message_type", value);
              }}
              defaultValue="message"
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="message">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Сообщение
                  </div>
                </SelectItem>
                <SelectItem value="meeting">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Встреча
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Заголовок */}
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder={
                formData.message_type === "meeting"
                  ? "Название встречи"
                  : "Заголовок сообщения"
              }
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Содержание */}
          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => updateFormData("content", e.target.value)}
              placeholder={
                formData.message_type === "meeting"
                  ? "Описание встречи, повестка дня..."
                  : "Текст сообщения..."
              }
              className="min-h-[120px]"
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Поля для встречи */}
          {formData.message_type === "meeting" && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Детали встречи
              </h4>

              <div className="space-y-2">
                <Label htmlFor="meeting_date">Дата и время</Label>
                <Input
                  type="datetime-local"
                  value={formData.meeting_date}
                  onChange={(e) =>
                    updateFormData("meeting_date", e.target.value)
                  }
                />
                {errors.meeting_date && (
                  <p className="text-sm text-red-600">{errors.meeting_date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting_location">Место проведения</Label>
                <Input
                  value={formData.meeting_location}
                  onChange={(e) =>
                    updateFormData("meeting_location", e.target.value)
                  }
                  placeholder="Аудитория, онлайн ссылка..."
                />
                {errors.meeting_location && (
                  <p className="text-sm text-red-600">
                    {errors.meeting_location}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Срочность */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Срочное сообщение
              </Label>
              <p className="text-sm text-muted-foreground">
                Участники команды получат уведомление с высоким приоритетом
              </p>
            </div>
            <Switch
              checked={formData.is_urgent}
              onCheckedChange={(checked) =>
                updateFormData("is_urgent", checked)
              }
            />
          </div>

          {/* Предварительный просмотр */}
          {formData.is_urgent && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                <AlertTriangle className="h-4 w-4" />
                Срочное сообщение
              </div>
              <p className="text-sm text-red-700">
                Это сообщение будет отправлено как срочное. Участники команды
                получат немедленное уведомление.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {isLoading
                ? "Отправка..."
                : formData.message_type === "meeting"
                ? "Назначить встречу"
                : "Отправить сообщение"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  team_id: 0,
                  title: "",
                  content: "",
                  message_type: "message",
                  is_urgent: false,
                  meeting_date: "",
                  meeting_location: "",
                });
                setErrors({});
              }}
              disabled={isLoading}
            >
              Очистить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
