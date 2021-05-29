import type { Socket } from "socket.io";
import { COMMON_SOCKET_ERROR } from "../common-constants";

const METHOD_ERROR = "Server communication method error";
interface safeLaunchI {
  actions: any;
  action: string;
  socket: Socket;
  data: string;
}
/**
 * Проверка если вдруг точки запрошенной в сокете не существует то шлет событие ошибки.
 * Иначе запускает нужный обработчик
 * */
export const safeLaunchSocketAction = ({
  actions,
  action,
  socket,
  data,
}: safeLaunchI) => {
  if (!actions.hasOwnProperty(action))
    return socket.emit(COMMON_SOCKET_ERROR, METHOD_ERROR);

  const props = {
    data: data,
    socket: socket,
  };
  return actions[action](props);
};
