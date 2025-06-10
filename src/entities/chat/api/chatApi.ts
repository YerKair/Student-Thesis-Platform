import { fetchWithAuth } from "@/lib/api";
import {
  Chat,
  ChatMessage,
  SendMessageRequest,
  CreateChatRequest,
  ChatStats,
  ChatListResponse,
  MessageListResponse,
  GetChatsResponse,
  GetMessagesResponse,
} from "../model/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Класс для работы с API чатов
class ChatApiClient {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("Токен авторизации не найден");
    }

    return fetchWithAuth(`/api${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  // Получить список чатов пользователя
  async getUserChats(limit = 50, offset = 0): Promise<GetChatsResponse> {
    return this.makeRequest(`/chats?limit=${limit}&offset=${offset}`);
  }

  // Создать новый чат для команды
  async createChat(
    data: CreateChatRequest
  ): Promise<{ message: string; chat_id: number }> {
    return this.makeRequest("/chats", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Получить сообщения чата
  async getChatMessages(
    chatId: number,
    limit = 50,
    offset = 0
  ): Promise<GetMessagesResponse> {
    return this.makeRequest(
      `/chats/${chatId}/messages?limit=${limit}&offset=${offset}`
    );
  }

  // Отправить сообщение
  async sendMessage(
    chatId: number,
    messageData: SendMessageRequest
  ): Promise<ChatMessage> {
    return this.makeRequest(`/chats/${chatId}/messages`, {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  // Редактировать сообщение
  async editMessage(messageId: number, content: string): Promise<ChatMessage> {
    return this.makeRequest(`/messages/${messageId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  }

  // Удалить сообщение
  async deleteMessage(messageId: number): Promise<void> {
    await this.makeRequest(`/messages/${messageId}`, {
      method: "DELETE",
    });
  }

  // Добавить реакцию к сообщению
  async addReaction(
    messageId: number,
    emoji: string
  ): Promise<{ message: string }> {
    return this.makeRequest(`/messages/${messageId}/reactions`, {
      method: "POST",
      body: JSON.stringify({ emoji }),
    });
  }

  // Отметить чат как прочитанный
  async markChatAsRead(chatId: number): Promise<void> {
    await this.makeRequest(`/chats/${chatId}/mark-read`, {
      method: "POST",
    });
  }

  // Получить участников чата
  async getChatParticipants(chatId: number): Promise<{ message: string }> {
    return this.makeRequest(`/chats/${chatId}/participants`);
  }

  // Поиск в сообщениях
  async searchMessages(
    chatId: number,
    query: string,
    limit = 20,
    offset = 0
  ): Promise<{ message: string }> {
    return this.makeRequest(
      `/chats/${chatId}/search?query=${encodeURIComponent(
        query
      )}&limit=${limit}&offset=${offset}`
    );
  }

  // Получить статистику чатов
  async getChatStats(): Promise<ChatStats> {
    return this.makeRequest("/chats/stats");
  }

  // WebSocket подключение
  createWebSocketConnection(chatId: number): WebSocket {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("Токен авторизации не найден");
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    return new WebSocket(`${wsUrl}/api/chats/${chatId}/ws?token=${token}`);
  }

  // Получить конкретный чат
  async getChat(chatId: number): Promise<Chat> {
    return this.makeRequest(`/chats/${chatId}`);
  }
}

export const chatApi = new ChatApiClient();
