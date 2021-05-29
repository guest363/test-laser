import express from "express";
import http from "http";
import { Server } from "socket.io";
import { IO_PATH, SERVER_PORT } from "./constants";
import { routerJSON } from "./moduleJSON/router";

export const app = express();
const httpServer = http.createServer(app);

export const SOCKET = new Server(httpServer, {
  path: IO_PATH,
});

SOCKET.on("connection", (socket) => {
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
  console.log(
    "Express server listening on port %d in %s mode",
    SERVER_PORT,
    app.get("env")
  );
});
