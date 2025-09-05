export type messageHistoryType = IMessages;

export interface IWsMessage {
  messageType:
    | "new user"
    | "user disconnect"
    | "new message"
    | "edit message"
    | "delete message";
  type: "user" | "notify";
  id: number;
  status: boolean;
  user: string;
  time: string;
  message: string;
  newMessages: IWsMessage[];
  newEditedMessages: IWsMessage[];
}

export interface IMessages {
  messageType: "notify" | "user";
  edited: boolean;
  id: number;
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

export type editMessageType = {
  active: boolean;
  messageToEdit: number;
};

export type deleteMessageType = {
  active: boolean;
  messageToDelete: number;
};

export type animationType = "showAnimation" | "";
