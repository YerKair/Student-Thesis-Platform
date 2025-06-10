export interface MessageRecipient {
  id: number;
  user_id: number;
  fullname: string;
  email: string;
  status: "sent" | "read" | "acknowledged";
  read_at?: string;
  acknowledged_at?: string;
}

export interface Message {
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
  is_read?: boolean;
  recipients: MessageRecipient[];
  team?: {
    id: number;
    name: string;
  };
}

export interface CreateMessageRequest {
  team_id: number;
  title: string;
  content: string;
  message_type: "message" | "meeting";
  is_urgent: boolean;
  meeting_date?: string;
  meeting_location?: string;
}

export interface MessageList {
  messages: Message[];
  total: number;
}

export interface MessageStats {
  total_sent: number;
  total_read: number;
  total_acknowledged: number;
  pending_count: number;
}
