import fs from "fs";
import { checkIsFileExist } from "./check-is-file-exist";

export const writeFile = async (path: string, data) => {
  checkIsFileExist(path);
  return await fs.promises.writeFile(path, data);
};
