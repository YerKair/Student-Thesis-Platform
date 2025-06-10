"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  AlertTriangle,
  Users,
  Eye,
  EyeOff,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
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
import { Message } from "@/entities/message/model/types";

interface MessagesListProps {
  messages: Message[];
  onMarkAsRead?: (messageId: number) => Promise<void>;
  isLoading?: boolean;
}

type FilterType = "all" | "message" | "meeting" | "unread" | "urgent";
type SortType = "newest" | "oldest" | "priority";

export function MessagesList({
  messages,
  onMarkAsRead,
  isLoading = false,
}: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("newest");
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  const filteredAndSortedMessages = messages
    .filter((message) => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = message.title.toLowerCase().includes(query);
        const matchesContent = message.content.toLowerCase().includes(query);
        const matchesTeam = message.team_name?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesContent && !matchesTeam) {
          return false;
        }
      }

      // Type filter
      switch (filterType) {
        case "message":
          return message.message_type === "message";
        case "meeting":
          return message.message_type === "meeting";
        case "unread":
          return !message.is_read;
        case "urgent":
          return message.is_urgent;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortType) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "priority":
          if (a.is_urgent && !b.is_urgent) return -1;
          if (!a.is_urgent && b.is_urgent) return 1;
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "newest":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  const handleToggleExpand = async (message: Message) => {
    if (expandedMessage === message.id) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(message.id);

      // Mark as read when expanding
      if (!message.is_read && onMarkAsRead) {
        try {
          await onMarkAsRead(message.id);
        } catch (error) {
          console.error("Ошибка при отметке как прочитанное:", error);
        }
      }
    }
  };

  const getMessageIcon = (message: Message) => {
    if (message.message_type === "meeting") {
      return <Calendar className="h-4 w-4" />;
    }
    return <MessageSquare className="h-4 w-4" />;
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case "meeting":
        return "Встреча";
      case "message":
      default:
        return "Сообщение";
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const urgentCount = messages.filter((m) => m.is_urgent && !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-sm text-muted-foreground">Всего сообщений</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Непрочитанных</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{urgentCount}</p>
                <p className="text-sm text-muted-foreground">Срочных</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {messages.filter((m) => m.message_type === "meeting").length}
                </p>
                <p className="text-sm text-muted-foreground">Встреч</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по заголовку, содержанию или команде..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter by type */}
            <Select
              value={filterType}
              onValueChange={(value: FilterType) => setFilterType(value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Фильтр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все сообщения</SelectItem>
                <SelectItem value="unread">Непрочитанные</SelectItem>
                <SelectItem value="urgent">Срочные</SelectItem>
                <SelectItem value="message">Сообщения</SelectItem>
                <SelectItem value="meeting">Встречи</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={sortType}
              onValueChange={(value: SortType) => setSortType(value)}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Новые первые</SelectItem>
                <SelectItem value="oldest">Старые первые</SelectItem>
                <SelectItem value="priority">По приоритету</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground">Загрузка сообщений...</div>
          </div>
        ) : filteredAndSortedMessages.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  {searchQuery || filterType !== "all"
                    ? "Сообщения не найдены"
                    : "Нет сообщений"}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchQuery || filterType !== "all"
                    ? "Попробуйте изменить фильтры или поисковый запрос"
                    : "Сообщения от супервайзера появятся здесь"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedMessages.map((message) => (
            <Card
              key={message.id}
              className={`transition-all duration-200 ${
                !message.is_read ? "border-blue-200 bg-blue-50/50" : ""
              } ${message.is_urgent ? "border-red-200 bg-red-50/50" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        message.message_type === "meeting"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {getMessageIcon(message)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-lg">
                          {message.title}
                        </CardTitle>

                        <Badge variant="outline">
                          {getMessageTypeLabel(message.message_type)}
                        </Badge>

                        {message.is_urgent && (
                          <Badge
                            variant="destructive"
                            className="flex items-center gap-1"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            Срочно
                          </Badge>
                        )}

                        {!message.is_read && (
                          <Badge variant="secondary">Новое</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDateTime(message.created_at)}
                        </div>

                        {message.team_name && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {message.team_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleExpand(message)}
                    className="ml-2"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedMessage === message.id ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>

              {expandedMessage === message.id && (
                <CardContent className="pt-0">
                  <div className="border-t pt-4 space-y-4">
                    {/* Content */}
                    <div>
                      <h4 className="font-medium mb-2">Содержание:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>

                    {/* Meeting details */}
                    {message.message_type === "meeting" && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Детали встречи
                        </h4>

                        <div className="space-y-2 text-sm">
                          {message.meeting_date && (
                            <div className="flex items-center gap-2 text-green-800">
                              <Clock className="h-3 w-3" />
                              <span className="font-medium">Дата и время:</span>
                              {formatDateTime(message.meeting_date)}
                            </div>
                          )}

                          {message.meeting_location && (
                            <div className="flex items-center gap-2 text-green-800">
                              <MapPin className="h-3 w-3" />
                              <span className="font-medium">Место:</span>
                              {message.meeting_location}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Read status */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {message.is_read ? (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Прочитано
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3" />
                            Не прочитано
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
