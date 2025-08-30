import { sendMessage } from "../wsRequests/sendMessage";
import type { RefObject } from "react";

interface IProps {
  messageRef: RefObject<HTMLInputElement | null>;
  wsRef: RefObject<WebSocket | null>;
  client: string;
}

export const SendForm = ({ messageRef, wsRef, client }: IProps) => {
  return (
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
          Sends
        </button>
      </div>
    </div>
  );
};
