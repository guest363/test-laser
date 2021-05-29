import type { Socket } from "socket.io";
import { COMMON_SOCKET_ERROR, DB } from "../../constants";
import { prepareJsonToUi } from "../../support/prepare-json-to-ui";
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
    const dataToUi = prepareJsonToUi(data);
    console.log(dataToUi);
    return props.socket.emit(jsonSocketClientMessages.update, dataToUi);
  } catch (error) {
    console.error(error);
    return props.socket.emit(COMMON_SOCKET_ERROR, "Error get ui state");
  }
};
