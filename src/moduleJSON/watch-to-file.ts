import fs from "fs";
import type { Socket } from "socket.io";
import { DB } from "../constants";
import { errorAction } from "../support/error-action";
import { readFile } from "../support/read-file";
import { jsonSocketClientMessages } from "./socket-client-events";

let oldUiState = "";
/**
 * Наблюдает за изменением файла и шлет
 * новый UI стейт при каждом его изменении
 */
export const watchToFile = (socket: Socket) => {
  if (!fs.existsSync(DB)) {
    errorAction(`Cant't watch to file`);
  }
  let fsWait = false;

  fs.watch(DB, async (event, filename) => {
    if (filename && event === "change" && !fsWait) {
      /**
       * Избавиться от ложных срабатываний события change
       */
      fsWait = true;
      setTimeout(() => {
        fsWait = false;
      }, 100);

      const newUiState = await readFile(DB);
      const newUiStateString = JSON.stringify(newUiState);
      /**
       * Шлем новый UI только если он действительно изменился
       */
      if (oldUiState !== newUiStateString) {
        return socket.emit(jsonSocketClientMessages.update, newUiState);
      }
      oldUiState = newUiStateString;
    }
  });
};
