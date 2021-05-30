import type { Socket } from "socket.io";
import { COMMON_SOCKET_ERROR } from "../../common-constants";
import { DB } from "../../server-constants";
import { jsonSocketClientMessages } from "../../socket-client-events";
import { prepareJsonToUi } from "../../support/prepare-json-to-ui";
import { readFile } from "../../support/read-file";

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
    return props.socket.emit(jsonSocketClientMessages.update, dataToUi);
  } catch (error) {
    console.error(error);
    return props.socket.emit(COMMON_SOCKET_ERROR, "Error get ui state");
  }
};
