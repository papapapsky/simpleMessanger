import { sendMessage } from "../wsRequests/sendMessage";
import { type RefObject } from "react";

interface IProps {
  messageRef: RefObject<HTMLInputElement | null>;
  wsRef: RefObject<WebSocket | null>;
  client: string;
  usersModal: boolean;
  setUsersModal: (usersModal: boolean) => void;
  eraseChatModal: boolean;
  setEraseChatModal: (eraseChatModal: boolean) => void;
}

export const SendForm = ({
  messageRef,
  wsRef,
  client,
  setUsersModal,
  usersModal,
  eraseChatModal,
  setEraseChatModal,
}: IProps) => {
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-xl flex flex-col justify-start">
      <div className="flex space-x-2 flex-wrap content-center gap-5">
        <input
          ref={messageRef}
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-5"
        />
      </div>
      <div className="flex justify-start gap-5">
        <button
          onClick={() => sendMessage({ messageRef, wsRef, client })}
          className={`cursor-pointer mt-3 w-25 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg`}
        >
          Send
        </button>
        <button
          onClick={() => setUsersModal(!usersModal)}
          className="cursor-pointer mt-3 w-18 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
          </svg>
        </button>
        <button
          onClick={() => setEraseChatModal(!eraseChatModal)}
          className="ml-auto cursor-pointer mt-3 w-18 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-t-lg rounded-bl-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m376-400 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
