import type { IMessages, IWsMessage } from "../../types/types";
import { clientDate } from "./clientDate";

interface props {
  event: any;
  setMessages: React.Dispatch<React.SetStateAction<IMessages[]>>;
}

export const onmessage = ({ event, setMessages }: props) => {
  const currentDate = clientDate();

  const message: IWsMessage = JSON.parse(event.data);
  switch (message.messageType) {
    case "new message": {
      if (!message) return false;
      const newMessage: IMessages = {
        messageType: message.type,
        type: message.type,
        time: currentDate,
        user: message.user,
        message: message.message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      break;
    }
    default:
      console.log("undefined type -", message.type);
  }
};
