import { sendMessage } from "../wsRequests/sendMessage";
import { useState, useEffect } from "react";
import type { ISendFormProps } from "./types/propsTypes";
import { ShowUsersSVG, EraseChatSVG, Exit } from "./svg/showUsersSVG";
import "./showFunctions.css";
import { useNavigate } from "react-router-dom";

export const SendForm = ({
  messageRef,
  wsRef,
  client,
  setUsersModal,
  usersModal,
  eraseChatModal,
  setEraseChatModal,
  setAnimation,
}: ISendFormProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <div className="flex justify-start gap-5 mt-3 flex-wrap">
        <button
          onClick={() => sendMessage({ messageRef, wsRef, client })}
          className="cursor-pointer w-25 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Send
        </button>

        {isMobile ? (
          <div className="relative">
            <button
              onClick={() => setShowExtraButtons(!showExtraButtons)}
              className="cursor-pointer w-20 bg-gradient-to-r from-purple-600 to-indigo-600 
               hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 
               rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              ☰
            </button>

            {showExtraButtons && (
              <div className="flex flex-col gap-2 mt-2 w-full absolute bottom-15">
                <button
                  onClick={() => {
                    setShowExtraButtons(false);
                    setUsersModal(!usersModal);
                    setAnimation("showAnimation");
                  }}
                  className="extra-btn flex justify-center border-2 border-violet-500"
                >
                  <ShowUsersSVG />
                </button>
                <button
                  onClick={() => {
                    setShowExtraButtons(false);
                    setEraseChatModal(!eraseChatModal);
                    setAnimation("showAnimation");
                  }}
                  className="extra-btn delay flex justify-center border-2 border-violet-500"
                >
                  <EraseChatSVG />
                </button>
                <button
                  onClick={() => {
                    setShowExtraButtons(false);
                    setAnimation("showAnimation");
                    navigate("/");
                  }}
                  className="extra-btn exit delay flex justify-center border-2 border-red-500"
                >
                  <Exit />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setShowExtraButtons(false);
                setUsersModal(!usersModal);
                setAnimation("showAnimation");
              }}
              className="cursor-pointer w-18 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ShowUsersSVG />
            </button>
            <div className="flex ml-auto gap-5">
              <button
                onClick={() => {
                  setShowExtraButtons(false);
                  setEraseChatModal(!eraseChatModal);
                  setAnimation("showAnimation");
                }}
                className="cursor-pointer ml-auto w-18 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <EraseChatSVG />
              </button>
              <button
                onClick={() => {
                  setShowExtraButtons(false);
                  setAnimation("showAnimation");
                  navigate("/");
                }}
                className="exitBtn cursor-pointer ml-auto w-18 bg-gradient-to-r from-orange-800 to-purple-600 hover:from-orange-900 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Exit />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
