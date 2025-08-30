import WebSocket from "ws";

export type clientTypeMsg = {
  user: string;
  type: "send message" | "disconnect";
  message: string;
};

export type messageHistoryType = {
  messageType: "new message" | "user disconnect" | "new user";
  type: "notify" | "user";
  time: string;
  user?: string;
  status?: boolean;
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
