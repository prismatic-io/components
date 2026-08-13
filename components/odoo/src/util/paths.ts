import { JSON2_BASE } from "../constants";
export const json2Path = (model: string, ormMethod: string): string =>
  `${JSON2_BASE}/${model}/${ormMethod}`;
