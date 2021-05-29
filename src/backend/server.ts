import { createServer } from "http";
import { Server } from "socket.io";
import { CORS_URL } from "../frontend/ui/constants";
import { IO_PATH, SERVER_PORT } from "./constants";
import { routerJSON } from "./moduleJSON/router";
import { watchToFile } from "./moduleJSON/watch-to-file";

const corsOptions = {
  origin: CORS_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Request-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
};

const httpServer = createServer();

export const SOCKET = new Server(httpServer, {
  path: IO_PATH,
  cors: corsOptions,
});

SOCKET.on("connection", (socket) => {
  console.log("Connect new client");
  watchToFile(socket);
  const createEndPoints = () => {
    socket.on("json", (req) => routerJSON(req, socket));
  };
  try {
    createEndPoints();
  } catch (error) {
    console.error("Error in socket actions");
    console.error(error);
    console.error("Restart sockets");
  }
});

/* Обработка сигналов SIGINT и SIGTERM */
const processExit = () => {
  console.log("API server Off");
  process.exit(0);
};
process.on("SIGINT", function () {
  processExit();
});
process.on("SIGTERM", function () {
  processExit();
});
process.on("uncaughtException", function (error) {
  console.log("uncaughtException");
  console.error(error);
});

httpServer.listen(SERVER_PORT, () => {
  console.log("Express server listening on port %d", SERVER_PORT);
});
