/**
 * Путь до нашей "базы"
 */
export const DB = new URL(
  "../../db/params14.json",
  import.meta.url
).pathname.slice(1);
