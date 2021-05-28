import type { Socket } from "socket.io";
import { COMMON_SOCKET_ERROR, DB } from "../../constants";
import { prepareJson } from "../../support/prepare-json";
import { readFile } from "../../support/read-file";
import { jsonSocketClientMessages } from "../socket-client-events";

interface getJSONI {
  socket: Socket;
}
/*
 * Запросить JSON для построения UI
 */
export const getJSON = async (props: getJSONI) => {
  const data = await readFile(DB);

  try {
    const dataToUi = prepareJson(data);
    console.log(dataToUi);
    props.socket.emit(jsonSocketClientMessages.update, dataToUi);
  } catch (error) {
    props.socket.emit(COMMON_SOCKET_ERROR, "Error get ui state");
  }
};
