"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Search,
  MoreVertical,
  Plus,
  ArrowLeft,
  Smile,
  Paperclip,
  X,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { chatApi } from "@/entities/chat/api/chatApi";
import {
  Chat,
  ChatMessage,
  SendMessageRequest,
} from "@/entities/chat/model/types";

interface ChatDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatListItemProps {
  chat: Chat;
  onClick: () => void;
  isActive: boolean;
}

function ChatListItem({ chat, onClick, isActive }: ChatListItemProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100",
        isActive && "bg-blue-50"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarFallback>
          {chat.title ? chat.title.charAt(0).toUpperCase() : "Ч"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {chat.title || "Чат"}
          </h4>
          <span className="text-xs text-gray-500">
            {formatTime(chat.updated_at)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">Нет сообщений</p>
          {chat.unread_count > 0 && (
            <Badge
              variant="destructive"
              className="ml-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {chat.unread_count > 99 ? "99+" : chat.unread_count}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

interface MessageItemProps {
  message: ChatMessage;
  isOwn: boolean;
}

function MessageItem({ message, isOwn }: MessageItemProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn("flex gap-2 mb-3", isOwn ? "flex-row-reverse" : "flex-row")}
    >
      {!isOwn && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="text-xs">
            {message.sender_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2",
          isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
        )}
      >
        {!isOwn && (
          <div className="text-xs text-gray-600 mb-1">
            {message.sender_name}
          </div>
        )}

        <div className="text-sm">{message.content}</div>

        <div
          className={cn(
            "text-xs mt-1",
            isOwn ? "text-blue-100" : "text-gray-500"
          )}
        >
          {formatTime(message.created_at)}
          {message.is_edited && " (изм.)"}
        </div>
      </div>
    </div>
  );
}

export function ChatDropdown({ isOpen, onClose }: ChatDropdownProps) {
  const [currentView, setCurrentView] = useState<"list" | "chat">("list");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Получаем ID текущего пользователя
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.user_id);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  // Загружаем список чатов
  useEffect(() => {
    if (isOpen) {
      loadChats();
    }
  }, [isOpen]);

  // Автоскролл при новых сообщениях
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Загружаем сообщения при выборе чата
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const loadChats = async () => {
    try {
      setIsLoading(true);
      const response = await chatApi.getUserChats(10, 0);
      setChats(response.chats || []);
    } catch (error) {
      console.error("Failed to load chats:", error);
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (chatId: number) => {
    try {
      setIsLoading(true);
      const response = await chatApi.getChatMessages(chatId, 50);
      setMessages(response.messages || []);

      // Отмечаем чат как прочитанный
      await chatApi.markChatAsRead(chatId);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const messageData: SendMessageRequest = {
        content: newMessage.trim(),
      };

      const message = await chatApi.sendMessage(selectedChat.id, messageData);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = (chat: Chat) => {
    setSelectedChat(chat);
    setCurrentView("chat");
  };

  const backToList = () => {
    setCurrentView("list");
    setSelectedChat(null);
    setMessages([]);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createChatsForTeams = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/chats/create-for-teams`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Chats created:", result);
        // Перезагружаем список чатов
        loadChats();
      } else {
        console.error("Failed to create chats:", response.status);
      }
    } catch (error) {
      console.error("Error creating chats:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          {currentView === "chat" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={backToList}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            {currentView === "chat" ? selectedChat?.title : "Чаты"}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {currentView === "list" ? (
        <>
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск чатов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-8 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Загрузка...</div>
            ) : filteredChats.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  {searchQuery ? "Чаты не найдены" : "Нет доступных чатов"}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={createChatsForTeams}
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    Создать чаты для команд
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {filteredChats.map((chat) => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => openChat(chat)}
                    isActive={false}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      ) : (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Загрузка сообщений...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Нет сообщений</p>
                  <p className="text-xs text-gray-400">Начните разговор</p>
                </div>
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    isOwn={currentUserId === message.sender_id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Написать сообщение..."
                  className="pr-20 text-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
