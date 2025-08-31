import type { RefObject } from "react";
import type { IMessages, messageHistoryType } from "../../types/types";

interface props {
  setMessages: (messages: IMessages[]) => void;
  chatRef: RefObject<HTMLDivElement | null>;
  setHistoryLoading: (loading: boolean) => void;
}

export const getMessageHistory = async ({
  setMessages,
  chatRef,
  setHistoryLoading,
}: props) => {
  try {
    const API_HTTP_URL = import.meta.env.VITE_API_HTTP_URL;
    console.log(API_HTTP_URL);
    setHistoryLoading(true);
    const response: messageHistoryType[] = await fetch(
      `${API_HTTP_URL}/getMessageHistory`
    ).then((data) => data.json());

    if (response) {
      setMessages(response);
      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setHistoryLoading(false);
  }
};
