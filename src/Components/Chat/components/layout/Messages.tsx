import type { MessagesPropsType } from "./types/propsTypes";
import { EditMessageSVG } from "./svg/showUsersSVG";

export const Messages = ({
  value,
  client,
  setEditMessageModal,
  editMessageModal,
}: MessagesPropsType) => {
  return (
    <>
      {value.type === "user" ? (
        <>
          {value.user === client ? (
            <div className="clientMessage">
              <div className="nickName">{value.user}</div>
              <div className="flex justify-between items-center">
                <p className="text-left w-[85%]">{value.message}</p>
                <p className="timeDisplay text-sm">{value.time}</p>
                <button
                  onClick={() =>
                    setEditMessageModal({
                      active: !editMessageModal.active,
                      messageToEdit: value.message,
                    })
                  }
                  className="w-auto bg-black/25 cursor-pointer m-1 outline-0 rounded-lg ml-2"
                >
                  <EditMessageSVG />
                </button>
              </div>
            </div>
          ) : (
            <div className="otherMessages">
              <div className="nickName">{value.user}</div>
              <div className="flex justify-between items-end">
                <p className="text-left w-[85%]">{value.message}</p>
                <p className="timeDisplay text-sm">{value.time}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="userNotify">
          <h3 className="text-center bg-gray-800 border-0 rounded-sm mb-1">
            {value.message}
          </h3>

          <p className="timeDisplay text-sm ">{value.time}</p>
        </div>
      )}
    </>
  );
};
