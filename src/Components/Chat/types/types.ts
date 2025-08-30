export type messageHistoryType = IMessages;

export interface IWsMessage {
  messageType: "new user" | "user disconnect" | "new message";
  type: "user" | "notify";
  status: boolean;
  user: string;
  time: string;
  message: string;
}

export interface IMessages {
  messageType: "notify" | "user";
  type: string;
  time: string;
  user: string;
  message: string;
}

export interface ISendMessage {
  type: "send message";
  user: string;
  message: string;
}
