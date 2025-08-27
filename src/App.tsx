import "./App.css";
import { Header } from "./Components/Header/Header";
import { Chat } from "./Components/Chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
export const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/Chat" index element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
