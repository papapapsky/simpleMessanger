import type { RefObject } from "react";
import type { animationType, editMessageType } from "../../../types/types";
import type { IMessages } from "../../../types/types";

export type generalProperties = {
  setActive: (active: boolean) => void;
  setAnimation: (animation: animationType) => void;
  active: boolean;
  animation: animationType;
};

export type responseType = {
  status: boolean;
  users: string[];
  message: string;
};

export type EditMessageType = {
  client: string;
  wsRef: RefObject<WebSocket | null>;
  setEditMessageModal: (active: editMessageType) => void;
  setAnimation: (animation: animationType) => void;
  editMessageModal: editMessageType;
  animation: animationType;
};

export interface IActiveUsersModalProps extends generalProperties {
  client: string;
}

export interface IEraseChatConfirm extends generalProperties {
  setMessages: (messages: IMessages[]) => void;
}

export interface IGetActiveUsers {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setUsers: (users: string[]) => void;
}
