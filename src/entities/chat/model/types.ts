export interface User {
  id: number;
  email: string;
  fullname: string;
  role: string;
}

export interface Team {
  id: number;
  name: string;
  project_name: string;
  supervisor_id: number;
}

export enum MessageType {
  TEXT = "text",
  FILE = "file",
  SYSTEM = "system",
}

export enum ChatType {
  TEAM_CHAT = "team_chat",
  DIRECT_MESSAGE = "direct_message",
}

export interface MessageReaction {
  id: number;
  user: User;
  emoji: string;
  created_at: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  sender_id: number;
  sender_name: string;
  created_at: string;
  is_edited: boolean;
}

export interface ChatParticipant {
  id: number;
  user: User;
  is_active: boolean;
  last_read_message_id?: number;
  joined_at: string;
  unread_count: number;
}

export interface Chat {
  id: number;
  title: string;
  updated_at: string;
  unread_count: number;
}

export interface SendMessageRequest {
  content: string;
}

export interface CreateChatRequest {
  team_id: number;
  title?: string;
}

export interface ChatStats {
  total_chats: number;
  active_chats: number;
  total_unread: number;
}

// API Response types
export interface GetChatsResponse {
  chats: Chat[];
  total: number;
}

export interface GetMessagesResponse {
  messages: ChatMessage[];
  total: number;
}

// Deprecated types (for backward compatibility)
export interface ChatListResponse {
  chats: Chat[];
  total: number;
}

export interface MessageListResponse {
  messages: ChatMessage[];
  total: number;
}

export interface WSMessageType {
  NEW_MESSAGE: "new_message";
  MESSAGE_EDITED: "message_edited";
  MESSAGE_DELETED: "message_deleted";
  USER_JOINED: "user_joined";
  USER_LEFT: "user_left";
}

export interface WSMessage {
  type: keyof WSMessageType;
  chat_id: number;
  user_id: number;
  data: Record<string, any>;
}
