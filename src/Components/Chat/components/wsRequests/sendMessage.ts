import type { RefObject } from "react";
import type { ISendMessage } from "../../types/types";

interface props {
  messageRef: RefObject<HTMLInputElement | null>;
  wsRef: RefObject<WebSocket | null>;
  client: string;
}

export const sendMessage = ({ messageRef, wsRef, client }: props) => {
  if (messageRef.current && messageRef.current.value !== "" && wsRef.current) {
    const ws = wsRef.current;

    const sendMessage: ISendMessage = {
      type: "send message",
      user: client,
      message: messageRef.current.value,
    };

    ws.send(JSON.stringify(sendMessage));
    messageRef.current.value = "";
  }
};
