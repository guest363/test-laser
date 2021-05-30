/**
 * Путь до нашей "базы"
 */
export const DB = new URL(
  "../../db/params14.json",
  //@ts-ignore
  import.meta.url
).pathname.slice(1);
