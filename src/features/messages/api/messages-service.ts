interface Message {
  id: number;
  supervisor_id: number;
  supervisor_name: string;
  team_id: number;
  team_name: string;
  title: string;
  content: string;
  message_type: "message" | "meeting";
  meeting_date?: string;
  meeting_location?: string;
  created_at: string;
  is_urgent: boolean;
  recipients: MessageRecipient[];
}

interface MessageRecipient {
  id: number;
  user_id: number;
  fullname: string;
  email: string;
  status: "sent" | "read" | "acknowledged";
  read_at?: string;
  acknowledged_at?: string;
}

interface CreateMessageRequest {
  team_id: number;
  title: string;
  content: string;
  message_type: "message" | "meeting";
  is_urgent: boolean;
  meeting_date?: string;
  meeting_location?: string;
}

interface MessageList {
  messages: Message[];
  total: number;
}

interface MessageStats {
  total_sent: number;
  total_read: number;
  total_acknowledged: number;
  pending_count: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class MessagesService {
  static async sendMessage(
    data: CreateMessageRequest,
    token: string
  ): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Не удалось отправить сообщение");
    }

    return response.json();
  }

  static async getSupervisorMessages(
    token: string,
    teamId?: number,
    limit: number = 50,
    offset: number = 0
  ): Promise<MessageList> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (teamId) {
      params.append("team_id", teamId.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/messages/supervisor/my?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить сообщения");
    }

    return response.json();
  }

  static async getStudentMessages(
    token: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<MessageList> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/messages/student/my?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить сообщения");
    }

    return response.json();
  }

  static async updateMessageStatus(
    messageId: number,
    status: "read" | "acknowledged",
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/messages/${messageId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось обновить статус сообщения");
    }

    return response.json();
  }

  static async getMessageStats(token: string): Promise<MessageStats> {
    const response = await fetch(`${API_BASE_URL}/messages/supervisor/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить статистику");
    }

    return response.json();
  }

  static async getMessageDetails(
    messageId: number,
    token: string
  ): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить детали сообщения");
    }

    return response.json();
  }
}

export type {
  Message,
  MessageRecipient,
  CreateMessageRequest,
  MessageList,
  MessageStats,
};
