import { createPortal } from "react-dom";
import type { IEraseChatConfirm } from "./types/propsTypes";

export const EraseChatConfirm = ({
  active,
  setActive,
  setMessages,
  animation,
  setAnimation,
}: IEraseChatConfirm) => {
  const modalElement = document.getElementById("modal") as HTMLDivElement;

  return (
    <>
      {active &&
        createPortal(
          <div
            className={`modalParent fixed w-[100%] h-[100vh] z-10 ${animation}`}
          >
            <div className="usersContainer">
              <h2 className="text-xl text-center">
                Are you sure you want to clean the chat?
              </h2>
              <div className="flex justify-around">
                <button
                  onClick={() => {
                    setActive(!active);
                    setMessages([]);
                    setAnimation("");
                  }}
                  className="cursor-pointer m-auto mt-5 w-25 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Clean
                </button>
                <button
                  onClick={() => {
                    setActive(!active);
                    setAnimation("");
                  }}
                  className="cursor-pointer m-auto mt-5 w-25 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          modalElement
        )}
    </>
  );
};
