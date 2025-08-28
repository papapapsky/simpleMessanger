import { useNavigate } from "react-router-dom";
import { store } from "../../store";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
import { getMessageHistory } from "./components/httpRequests/getMessageHistory";
import { sendMessage } from "./components/wsRequests/sendMessage";

import type { IMessages, IWsMessage } from "./types/types";

export const Chat = () => {
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [client, setClient] = useState<string>("");
  const [messages, setMessages] = useState<IMessages[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userName: string = store.getState().userName.name;
    if (userName.length <= 0 || userName === "") {
      navigate("/");
      return;
    }
    setHistoryLoading(true);
    const ws = new WebSocket(`ws://localhost:3000?name=${userName}`);
    wsRef.current = ws;
    setClient(userName);

    ws.onopen = () => {
      getMessageHistory({ setMessages, chatRef, setHistoryLoading });
    };

    ws.onmessage = (event) => {
      const message: IWsMessage = JSON.parse(event.data);
      switch (message.messageType) {
        case "new user":
          break;
        case "user disconnect":
          break;
        case "new message": {
          if (!message) return false;
          const newMessage: IMessages = {
            messageType: message.type,
            type: message.type,
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

    return () => {
      ws.send(JSON.stringify({ type: "disconnect", user: userName }));
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    if (messages[messages.length - 1].user === client) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
      <div className="chat-container bg-gray-800 rounded-xl shadow-2xl flex flex-col border border-gray-700">
        <div className="flex-1 p-4 overflow-y-auto">
          {historyLoading && <div className="loader"></div>}
          {messages &&
            messages.map((value, index) => (
              <>
                {value.type === "user" ? (
                  <div
                    className={
                      value.user === client ? "clientMessage" : "otherMessages"
                    }
                    key={index}
                  >
                    <div className="nickName">{value.user}</div>
                    <p className="text-left">{value.message}</p>
                  </div>
                ) : (
                  <div className="userNotify">
                    <h3 className="ml-[25%] mr-[25%] text-center">
                      {value.message}
                    </h3>
                  </div>
                )}
              </>
            ))}
          <div ref={chatRef}></div>
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-xl">
          <div className="flex space-x-2 flex-wrap content-center gap-5">
            <input
              ref={messageRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-5"
            />
            <button
              onClick={() => sendMessage({ messageRef, wsRef, client })}
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
