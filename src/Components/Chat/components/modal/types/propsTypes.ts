import type { RefObject } from "react";
import type {
  animationType,
  deleteMessageType,
  editMessageType,
} from "../../../types/types";
import type { IMessages } from "../../../types/types";

export interface generalProperties {
  setActive: (active: boolean) => void;
  setAnimation: (animation: animationType) => void;
  active: boolean;
  animation: animationType;
}

export interface EditMessageType {
  client: string;
  wsRef: RefObject<WebSocket | null>;
  setEditMessageModal: (active: editMessageType) => void;
  setAnimation: (animation: animationType) => void;
  editMessageModal: editMessageType;
  animation: animationType;
}

export interface IDeleteMessageProps {
  active: boolean;
  setAnimation: (animation: animationType) => void;
  message: number;
  wsRef: RefObject<WebSocket | null>;
  client: string;
  setProperties: (deleteMessageModal: deleteMessageType) => void;
}

export type responseType = {
  status: boolean;
  users: string[];
  message: string;
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
