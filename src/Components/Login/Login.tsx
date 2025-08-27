import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setUserName, store } from "../../store";
import { Footer } from "../Footer/Footer";

type serverResponse = { status: boolean };

export const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const connectToChat = async () => {
    if (nameRef.current && nameRef.current.value !== "") {
      try {
        const userName = nameRef.current.value;
        const findSameUser: serverResponse = await fetch(
          `http://31.169.124.125:3000/getSomeUser?name=${userName}`
        ).then((data) => data.json());

        if (findSameUser.status) {
          console.log(userName);
          store.dispatch(setUserName({ name: userName }));
          navigate("/Chat");
        } else {
          console.log("found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex-1 p-6 max-w-md mx-auto w-full">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Enter Your Nickname
        </h2>
        <div className="flex flex-col space-y-4">
          <input
            ref={nameRef}
            type="text"
            placeholder="Your nickname..."
            className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={() => connectToChat()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Join Chat
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
