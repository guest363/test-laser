import fs from "fs";
import { checkIsFileExist } from "./check-is-file-exist";

export const readFile = async (path: string) => {
  checkIsFileExist(path);
  return await fs.promises.readFile(path, "utf8");
};
