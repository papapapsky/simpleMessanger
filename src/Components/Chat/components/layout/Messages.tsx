import type { IMessages } from "../../types/types";
interface IProps {
  value: IMessages;
  client: string;
}

export const Messages = ({ value, client }: IProps) => {
  return (
    <>
      {value.type === "user" ? (
        <div
          className={value.user === client ? "clientMessage" : "otherMessages"}
        >
          <div className="nickName">{value.user}</div>
          <div className="flex justify-between items-end">
            <p className="text-left w-[85%]">{value.message}</p>
            <p className="timeDisplay text-sm">{value.time}</p>
          </div>
        </div>
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
