import fs from "fs";
import { errorAction } from "./error-action";
const errorMessages = {
  ENOENT: `DB is not accessed, posible remove json`,
};

/**
 * Роверяет наличие файла и в случае его отсутствия
 * завершает процесс
 */
export const checkIsFileExist = (path) => {
  if (!fs.existsSync(path)) {
    errorAction(errorMessages["ENOENT"]);
  }
};
