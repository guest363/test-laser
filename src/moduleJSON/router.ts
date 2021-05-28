import type { Socket } from "socket.io";
import { safeLaunchSocketAction } from "../support/safe-launch-socket-action";
import { getJSON } from "./api/get-json";
import { updateJSON } from "./api/update-json";

export interface jsonSocketRrequest {
  action: "get_json" | "update_json";
  message: string;
  token: string;
  blob?: ArrayBuffer;
}
type actionIterator = {
  [key in jsonSocketRrequest["action"]]: Function;
};
/**
 * Сокет события для работы с json
 */
export const routerJSON = (req: jsonSocketRrequest, socket: Socket) => {
  const { action, message } = req;

  const actions: actionIterator = {
    get_json: getJSON,
    update_json: updateJSON,
  };

  return safeLaunchSocketAction({
    actions: actions,
    action: action,
    socket: socket,
    data: message,
  });
};
