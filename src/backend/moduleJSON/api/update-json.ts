import type { Socket } from "socket.io";
import { COMMON_SOCKET_ERROR } from "../../common-constants";
import { DB } from "../../server-constants";
import { jsonSocketClientMessages } from "../../socket-client-events";
import { readFile } from "../../support/read-file";
import { writeFile } from "../../support/write-file";
import type { prepareJsonExportI } from "../types/json-parce";

interface updateJSONI {
  socket: Socket;
  data: prepareJsonExportI | string;
}
interface placecesToReplaceI {
  /** Сохраненное значение обьекта */
  savedValue: Object;
  /** Айди для точечнго изменения в массиве */
  id: string | number;
  /**
   * Исходим из структуры что верхнеуровневые свойства включают
   * в себя целевые массивы значений и больше интересующей
   * нас в данном контексте вложенности нет
   */
  topLevelProp: string;
}

/*
 * Запросить JSON для построения UI
 */
export const updateJSON = async (props: updateJSONI) => {
  const fileOnDisck = await readFile(DB);
  const parcedObject = JSON.parse(fileOnDisck) as object;
  if (typeof parcedObject !== "object") {
    return null;
  }

  /**
   * Будем изменять JSON точечно а не в лоб лазить каждый раз по массивам
   * Пройдемся по массиву значений полученного большого обьекта и
   * сохраним места его изменения.
   */
  const placecesToReplace = new Map() as Map<string, placecesToReplaceI>;

  for (let prop in parcedObject) {
    if (Array.isArray(parcedObject[prop])) {
      /** Отфильтровать только те значения у которых есть в groupId индекс 1  */
      parcedObject[prop].forEach((element, id) => {
        const condition = element?.groupId?.some((id) => id === 1);
        placecesToReplace.set(element.name, {
          savedValue: element,
          id: id,
          topLevelProp: prop,
        });
        return condition;
      });
    }
  }

  const getFromUserNewData =
    typeof props.data === "string"
      ? (JSON.parse(props.data) as prepareJsonExportI[])
      : (props.data as unknown as prepareJsonExportI[]);

  /**
   * Функция для мутирования искомого обьекта на
   * любом уровне вложенности
   */
  const muteteFn = (element) => {
    const { id, savedValue, topLevelProp } = placecesToReplace.get(
      element.name
    );
    parcedObject[topLevelProp][id] = { ...savedValue, value: element.value };
  };
  /** Мутируем распарсенный из файла JSON */
  getFromUserNewData.forEach((element) => {
    if (Array.isArray(element.relations)) {
      element.relations.forEach((subElement) => {
        muteteFn(subElement);
      });
    }
    muteteFn(element);
  });

  try {
    await writeFile(DB, JSON.stringify(parcedObject));
    return props.socket.emit(
      jsonSocketClientMessages.notify,
      "Success update JSON"
    );
  } catch (error) {
    console.error(error);
    return props.socket.emit(COMMON_SOCKET_ERROR, "Error update JSON");
  }
};
