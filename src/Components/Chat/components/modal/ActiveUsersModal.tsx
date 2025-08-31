import { createPortal } from "react-dom";
import "./modal.css";
import { useEffect, useState } from "react";

type props = {
  client: string;
  active: boolean;
  setActive: (active: boolean) => void;
};

type responseType = {
  status: boolean;
  users: string[];
  message: string;
};

export const ActiveUsersModal = ({ active, setActive, client }: props) => {
  const API_HTTP_URL = import.meta.env.VITE_API_HTTP_URL;
  const modalElemet = document.getElementById("modal") as HTMLDivElement;
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getActiveUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const response: responseType = await fetch(
          `${API_HTTP_URL}/getActiveUsers`
        ).then((data) => data.json());

        if (response.status && response.users.length > 0) {
          setUsers(response.users);
          setError("");
        } else {
          console.log(response.status);
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getActiveUsers();
  }, []);

  return (
    <>
      {active &&
        createPortal(
          <div className="modalParent fixed w-[100%] h-[100vh] z-10">
            <div className="usersContainer">
              <h2 className="text-2xl mb-5 text-center">Active users:</h2>
              <div className="users gap-5">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center mt-1 mb-1 space-x-4 p-3 bg-black/[.25] rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                    <div className="block">
                      <div className="text-purple-300 font-medium text-left">
                        {user === client ? `${user} (You)` : user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {error && <h2>error</h2>}
              {loading && <div className="loader m-auto"></div>}
              <button
                onClick={() => setActive(!active)}
                className="cursor-pointer m-auto mt-5 w-25 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>,
          modalElemet
        )}
    </>
  );
};
