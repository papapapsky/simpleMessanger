import { WebSocketServer, WebSocket } from "ws";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import url from "url";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import type {
  userQuery,
  messageHistoryType,
  clientTypeMsg,
  client,
  urlParams,
} from "./types/types";

//server
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors({ orogin: "http://localhost:5173" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesSrc = path.resolve(__dirname, "messages", "messages.json");

const server = createServer(app);
const wss = new WebSocketServer({ server });

let clients: client[] = [];

//WEBSOKCET
wss.on("connection", async (ws: WebSocket, req: any) => {
  if (!req.url) {
    const serverResponse = {
      status: false,
      message: "Connection reject",
    };
    return ws.send(JSON.stringify(serverResponse));
  }

  const query: urlParams = url.parse(req.url, true).query;
  if (!query.name) return;

  const connectNotify: messageHistoryType = {
    messageType: "new message",
    type: "notify",
    user: query.name,
    message: `New user connection! - ${query.name}`,
  };

  const userHistory = await fs.readFile(messagesSrc, "utf-8");
  const parsedHistory: messageHistoryType[] = JSON.parse(userHistory);
  parsedHistory.push(connectNotify);
  await fs.writeFile(messagesSrc, JSON.stringify(parsedHistory, null, 2));

  const newClient: client = {
    name: query.name,
    messages: [],
    userInfo: ws,
  };
  clients.push(newClient);

  wss.clients.forEach((user: WebSocket) => {
    if (user.readyState === WebSocket.OPEN) {
      user.send(JSON.stringify(connectNotify));
      console.log("sended");
    }
  });

  ws.on("message", async (data: string) => {
    const message: clientTypeMsg = JSON.parse(data);
    console.log(message);

    switch (message.type) {
      case "send message": {
        const messages = await fs.readFile(messagesSrc, "utf-8");
        const parsedMessages: messageHistoryType[] = JSON.parse(messages);

        const newMessage: messageHistoryType = {
          messageType: "new message",
          type: "user",
          user: message.user,
          message: message.message,
        };

        parsedMessages.push(newMessage);
        await fs.writeFile(
          messagesSrc,
          JSON.stringify(parsedMessages, null, 2)
        );

        newMessage.messageType = "new message";
        wss.clients.forEach((user: WebSocket) => {
          if (user.readyState === WebSocket.OPEN) {
            user.send(JSON.stringify(newMessage));
          }
        });
        break;
      }
      case "disconnect": {
        ws.close();
        clients = clients.filter((user) => user.name !== message.user);

        const userLeaveMessage = {
          type: "User disconnect",
          status: true,
          message: `${query.name} disconnected from chat`,
        };
        wss.clients.forEach((user: WebSocket) => {
          if (user.readyState === WebSocket.OPEN) {
            user.send(JSON.stringify(userLeaveMessage));
          }
        });
        break;
      }
      default:
        console.log("invalid type");
    }
  });

  ws.on("close", () => {
    if (!query.name) return;
    const userLeaveMessage: messageHistoryType = {
      messageType: "new message",
      type: "notify",
      status: true,
      message: `${query.name} disconnected from chat`,
    };

    clients = clients.filter((user) => user.userInfo !== ws);
    wss.clients.forEach((user: WebSocket) => {
      if (user.readyState === WebSocket.OPEN) {
        user.send(JSON.stringify(userLeaveMessage));
      }
    });
  });
});

//EXPRESS
app.get("/getSomeUser", (req: Request, res: Response) => {
  const userName: userQuery = req.query;
  const findUser = clients.find((user) => user.name === userName.name);
  if (!findUser) {
    console.log(findUser);
    res.status(200).json({ status: true });
  } else {
    res.status(403).json({ status: false });
  }
});

app.get("/getMessageHistory", async (req: any, res: any) => {
  const messages = await fs.readFile(messagesSrc, "utf-8");
  const parsedMessages: messageHistoryType[] = JSON.parse(messages);
  res.status(200).json(parsedMessages);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
