import fs from "fs";
import type { Socket } from "socket.io";
import { DB } from "../server-constants";
import { jsonSocketClientMessages } from "../socket-client-events";
import { errorAction } from "../support/error-action";
import { prepareJsonToUi } from "../support/prepare-json-to-ui";
import { readFile } from "../support/read-file";

let oldUiState = "";
/**
 * Наблюдает за изменением файла и шлет
 * новый UI стейт при каждом его изменении
 */
export const watchToFile = (socket: Socket) => {
  console.log(DB);
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

      const readFromFileData = await readFile(DB);
      const newUiState = prepareJsonToUi(readFromFileData);
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
