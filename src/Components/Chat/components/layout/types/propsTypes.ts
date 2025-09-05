import type { RefObject } from "react";
import type {
  animationType,
  deleteMessageType,
  editMessageType,
} from "../../../types/types";
import type { IMessages } from "../../../types/types";

export interface ISendFormProps {
  messageRef: RefObject<HTMLInputElement | null>;
  wsRef: RefObject<WebSocket | null>;
  client: string;
  usersModal: boolean;
  setUsersModal: (usersModal: boolean) => void;
  eraseChatModal: boolean;
  setEraseChatModal: (eraseChatModal: boolean) => void;
  setAnimation: (animation: animationType) => void;
}

export type MessagesPropsType = {
  deleteMessageModal: deleteMessageType;
  setDeleteMessageModal: (deleteMessageModal: deleteMessageType) => void;
  editMessageModal: editMessageType;
  setEditMessageModal: (eraseChatModal: editMessageType) => void;
  value: IMessages;
  client: string;
};
