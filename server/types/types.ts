import WebSocket from "ws";

export type clientTypeMsg = {
  id: number;
  user: string;
  type: "send message" | "disconnect" | "edit message" | "delete message";
  message: string;
  messageToEdit: string;
};

export type messageHistoryType = {
  messageType: "new message" | "user disconnect" | "new user";
  type: "notify" | "user";
  time: string;
  edited: boolean;
  user?: string;
  status?: boolean;
  id: number;
  name?: string;
  message: string;
};

export type userQuery = {
  name?: string;
};

export interface urlParams {
  name?: string;
}

export interface client {
  name?: string;
  messages: string[];
  userInfo: WebSocket;
}
