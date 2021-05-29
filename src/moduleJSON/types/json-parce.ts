export interface relationI {
  name: string;
  value: string;
  measureUnit: string;
}
export interface prepareJsonExportI extends relationI {
  description: string;
  relations?: relationI[];
}
