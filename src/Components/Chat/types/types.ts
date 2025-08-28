export type messageHistoryType = {
  messageType: "user" | "notify";
  type: string;
  user: string;
  message: string;
};

export interface IWsMessage {
  messageType: "new user" | "user disconnect" | "new message";
  type: "user" | "notify";
  status: boolean;
  user: string;
  message: string;
}

export interface IMessages {
  messageType: "notify" | "user";
  type: string;
  user: string;
  message: string;
}

export interface ISendMessage {
  type: "send message";
  user: string;
  message: string;
}
