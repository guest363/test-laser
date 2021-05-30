import io from "socket.io-client";
import { SERVER_PORT, IO_PATH } from "../backend/common-constants";

const IO_URL = (() => {
  if (process.env.NODE_ENV == "development") {
    console.log("http://localhost::" + SERVER_PORT);

    return "http://localhost:" + SERVER_PORT;
  }
  return "";
})();

export const socket = io(IO_URL, { path: IO_PATH });
export const CORS_URL = "http://127.0.0.1:8080";
