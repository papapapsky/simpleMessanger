import { useRef } from "react";
import type { EditMessageType } from "./types/propsTypes";
import { createPortal } from "react-dom";

export const EditMessage = ({
  setEditMessageModal,
  setAnimation,
  editMessageModal,
  animation,
  wsRef,
  client,
}: EditMessageType) => {
  const modalElement = document.getElementById("modal") as HTMLDivElement;
  const messageToEdit = editMessageModal.messageToEdit;
  const newMessageRef = useRef<HTMLInputElement>(null);

  const sendEditRequest = () => {
    if (!wsRef.current || !newMessageRef.current) return;
    const editRequest = {
      type: "edit message",
      message: newMessageRef.current?.value,
      messageToEdit: messageToEdit,
      user: client,
    };
    wsRef.current.send(JSON.stringify(editRequest));
  };

  return (
    <>
      {editMessageModal.active &&
        createPortal(
          <div
            className={`modalParent fixed w-[100%] h-[100vh] z-10 ${animation}`}
          >
            <div className="usersContainer">
              <h2 className="text-xl text-center ">
                Message to edit: "{messageToEdit}"
              </h2>
              <input
                ref={newMessageRef}
                type="text"
                className="w-[70%] m-auto mt-5  flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-5"
              />
              <div className="flex justify-around">
                <button
                  onClick={() => {
                    setEditMessageModal({
                      ...editMessageModal,
                      active: !editMessageModal.active,
                    });
                    setAnimation("");
                    sendEditRequest();
                  }}
                  className="cursor-pointer m-auto mt-5 w-35 
                bg-gradient-to-r from-green-600 to-indigo-600
                 hover:from-green-700 hover:to-indigo-700 
                 text-white px-6 py-3 rounded-lg transition-all 
                 duration-200 transform hover:scale-105 shadow-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>,
          modalElement
        )}
    </>
  );
};
