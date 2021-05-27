interface relationI {
  name: string;
  value: string;
  measureUnit: string;
}
interface prepareJsonExportI extends relationI {
  description: string;
  relations?: relationI[];
}

export const prepareJson = (
  jsonString: string
): prepareJsonExportI[] | null => {
  try {
    const parcedObject = JSON.parse(jsonString) as object;
    if (typeof parcedObject !== "object") {
      return null;
    }
    const resultedArray = [] as prepareJsonExportI[];
    const mapOfAllValues = new Map();
    /** Итерация по верхнему уровн.  */
    for (let prop in parcedObject) {
      if (Array.isArray(parcedObject[prop])) {
        /** Собрать мапу для последующего получения релэйшенов */
        parcedObject[prop].forEach((element) => {
          mapOfAllValues.set(element?.name, element);
        });
        /** Отфильтровать только те значения у которых есть в groupId индекс 1  */
        const requareParams = parcedObject[prop].filter((element) =>
          element?.groupId?.some((id) => id === 1)
        );
        /** Добавить в результирующий массив параметры с раскрытыми релейшенами */
        requareParams.forEach((element) => {
          const copyElement = {
            name: element.name || "",
            value: element.value || "",
            measureUnit: element.measureUnit || "",
            description: element.description || "",
            relations: element.relations || void 0,
          };
          if (Array.isArray(element.relations)) {
            copyElement.relations = element.relations.map((relationName) => {
              const extendValue = mapOfAllValues.get(relationName);
              return {
                name: extendValue.name || "",
                value: extendValue.value || "",
                measureUnit: extendValue.measureUnit || "",
              };
            });
          }
          resultedArray.push(copyElement);
        });
      }
    }
    return resultedArray;
  } catch (error) {
    console.error(error);
    return null;
  }
};
