import fs from "fs";
import { errorAction } from "./error-action";

const errorMessages = {
  ENOENT: `DB is not accessed, posible remove json`,
};

export const readFile = async (path: string) => {
  if (!fs.existsSync(path)) {
    errorAction(errorMessages["ENOENT"]);
  }
  return await fs.promises.readFile(path, "utf8");
};
