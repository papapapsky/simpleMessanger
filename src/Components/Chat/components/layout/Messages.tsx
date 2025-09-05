import type { MessagesPropsType } from "./types/propsTypes";
import { DeleteMessageSVG, EditMessageSVG } from "./svg/showUsersSVG";

export const Messages = ({
  value,
  client,
  setEditMessageModal,
  editMessageModal,
  setDeleteMessageModal,
  deleteMessageModal,
}: MessagesPropsType) => {
  return (
    <>
      {value.type === "user" ? (
        <>
          {value.user === client ? (
            <div className="clientMessage">
              <div className="nickName">{value.user}</div>
              <div className="flex justify-between items-center">
                <div className="text-left w-[100%] flex flex-col">
                  <p className="w-[70%] max-[700px]:w-full">{value.message}</p>
                  <div className="flex additionalInfo max-[700px]:ml-auto max-[700px]:w-[100%] items-end">
                    <p className="timeDisplay text-sm mt-auto mr-2">
                      {value.time}
                    </p>
                    {value.edited && (
                      <p className="text-white/50 text-sm mt-auto text-left">
                        edited
                      </p>
                    )}
                    <div className="flex ml-auto">
                      <button
                        onClick={() =>
                          setEditMessageModal({
                            active: !editMessageModal.active,
                            messageToEdit: value.id,
                          })
                        }
                        className="bg-black/25 cursor-pointer mt-auto mr-2 rounded-sm ml-2"
                      >
                        <EditMessageSVG />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteMessageModal({
                            active: !deleteMessageModal.active,
                            messageToDelete: value.id,
                          })
                        }
                        className="bg-black/25 cursor-pointer mt-auto mr-2 rounded-sm ml-2"
                      >
                        <DeleteMessageSVG />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="otherMessages">
              <div className="nickName">{value.user}</div>
              <div className="flex justify-between items-center">
                <div className="text-left w-[100%] flex flex-col">
                  <p className="w-[70%] max-[700px]:w-full">{value.message}</p>
                  <div className="flex additionalInfo max-[700px]:ml-auto max-[700px]:w-[100%] items-center flex-wrap">
                    <p className="timeDisplay text-sm mt-auto mr-2">
                      {value.time}
                    </p>
                    {value.edited && (
                      <p className="text-white/50 text-sm mt-auto text-left">
                        edited
                      </p>
                    )}
                  </div>
                </div>
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
