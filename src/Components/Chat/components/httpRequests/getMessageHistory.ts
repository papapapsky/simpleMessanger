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
    setHistoryLoading(true);
    const response: messageHistoryType[] = await fetch(
      "http://localhost:3000/getMessageHistory"
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
