import fs from "fs";
import type { Socket } from "socket.io";
import { DB } from "../../constants";
import { errorAction } from "../../support/error-action";
import { prepareJson } from "../../support/prepare-json";
import { jsonSocketClientMessages } from "../socket-client-events";
const errorMessages = {
  ENOENT: `DB is not accessed, posible remove json`,
};
interface getJSONI {
  socket: Socket;
}
/*
 * Запросить JSON для построения UI
 */
export const getJSON = async (props: getJSONI) => {
  if (!fs.existsSync(DB)) {
    errorAction(errorMessages["ENOENT"]);
  }
  const data = await fs.promises.readFile(DB, "utf8");

  try {
    const dataToUi = prepareJson(data);
    console.log(dataToUi);
    props.socket.emit(jsonSocketClientMessages.update, dataToUi);
  } catch (error) {
    props.socket.emit(jsonSocketClientMessages.notify, "Error get ui state");
  }
};
