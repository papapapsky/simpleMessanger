import type { responseType, IGetActiveUsers } from "../types/propsTypes";

export const getActiveUsers = async ({
  setError,
  setLoading,
  setUsers,
}: IGetActiveUsers) => {
  const API_HTTP_URL = import.meta.env.VITE_API_HTTP_URL;
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
