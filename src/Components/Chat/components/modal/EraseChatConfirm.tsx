import { createPortal } from "react-dom";
import type { IMessages } from "../../types/types";

type props = {
  active: boolean;
  setActive: (active: boolean) => void;
  setMessages: (messages: IMessages[]) => void;
};

export const EraseChatConfirm = ({ active, setActive, setMessages }: props) => {
  const modalElement = document.getElementById("modal") as HTMLDivElement;

  return (
    <>
      {active &&
        createPortal(
          <div className="modalParent fixed w-[100%] h-[100vh] z-10">
            <div className="usersContainer">
              <h2 className="text-xl text-center">
                Are you sure you want to clean the chat?
              </h2>
              <div className="flex justify-around">
                <button
                  onClick={() => {
                    setActive(!active);
                    setMessages([]);
                  }}
                  className="cursor-pointer m-auto mt-5 w-25 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Clean
                </button>
                <button className="cursor-pointer m-auto mt-5 w-25 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
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
