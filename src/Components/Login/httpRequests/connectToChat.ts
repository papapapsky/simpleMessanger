import type { RefObject } from "react";
import { store, setUserName } from "../../../store";
import type { NavigateFunction } from "react-router-dom";

type serverResponse = { status: boolean };
interface IProps {
  nameRef: RefObject<HTMLInputElement | null>;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  navigate: NavigateFunction;
}

export const connectToChat = async ({
  nameRef,
  setLoading,
  setError,
  navigate,
}: IProps) => {
  const HTTP_API_URL = import.meta.env.VITE_API_HTTP_URL;
  if (nameRef.current && nameRef.current.value !== "") {
    try {
      setLoading(true);
      setError("");
      const userName = nameRef.current.value;
      const findSameUser: serverResponse = await fetch(
        `${HTTP_API_URL}/getSomeUser?name=${userName}`
      ).then((data) => data.json());
      if (findSameUser.status) {
        console.log(userName);
        store.dispatch(setUserName({ name: userName }));
        navigate("/Chat");
      } else {
        setError("Failed to connect. This name alredy using in chat.");
      }
    } catch (err) {
      setError("Failed to connect. Check your internet connection.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
};
