import { useNavigate } from "react-router-dom";
import { store } from "../../store";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
import { getMessageHistory } from "./components/httpRequests/getMessageHistory";
import { SendForm } from "./components/layout/SendForm";
import { onmessage } from "./components/wsRequests/onmessage";
import { Scroller } from "./components/scroller/Scroller";
import { Messages } from "./components/layout/Messages";
import { ActiveUsersModal } from "./components/modal/ActiveUsersModal";

import type { IMessages } from "./types/types";
import { EraseChatConfirm } from "./components/modal/EraseChatConfirm";

export const Chat = () => {
  const WS_API_URL = import.meta.env.VITE_API_WS_URL;
  const [usersModal, setUsersModal] = useState<boolean>(false);
  const [eraseChatModal, setEraseChatModal] = useState<boolean>(false);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [client, setClient] = useState<string>("");
  const [messages, setMessages] = useState<IMessages[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const chatScrolleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userName: string = store.getState().userName.name;
    if (userName.length <= 0 || userName === "") {
      navigate("/");
      return;
    }
    setHistoryLoading(true);
    const ws = new WebSocket(`${WS_API_URL}?name=${userName}`);
    wsRef.current = ws;
    setClient(userName);

    ws.onopen = () => {
      getMessageHistory({ setMessages, chatRef, setHistoryLoading });
    };

    ws.onmessage = (event) => {
      onmessage({ event, setMessages });
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "disconnect", user: userName }));
      }
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    if (messages[messages.length - 1].user === client) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {usersModal && (
        <ActiveUsersModal
          client={client}
          active={usersModal}
          setActive={setUsersModal}
        />
      )}
      {eraseChatModal && (
        <EraseChatConfirm
          setMessages={setMessages}
          active={eraseChatModal}
          setActive={setEraseChatModal}
        />
      )}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full relative">
        <div className="chat-container bg-gray-800 rounded-xl shadow-2xl flex flex-col border border-gray-700">
          <div className="chat flex-1 p-4 overflow-y-auto" ref={chatScrolleRef}>
            {historyLoading && <div className="loader"></div>}
            {messages.length === 0 && (
              <h2 className="text-2xl text-gray-500/[.50] mt-auto">Empty</h2>
            )}
            {messages &&
              messages.map((value, index) => (
                <div key={index}>
                  <Messages value={value} client={client} />
                </div>
              ))}
            <Scroller box={chatScrolleRef} />
            <div ref={chatRef}></div>
          </div>
          <SendForm
            messageRef={messageRef}
            wsRef={wsRef}
            client={client}
            usersModal={usersModal}
            setUsersModal={setUsersModal}
            eraseChatModal={eraseChatModal}
            setEraseChatModal={setEraseChatModal}
          />
        </div>
      </main>
    </>
  );
};
