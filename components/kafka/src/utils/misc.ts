import { util } from "@prismatic-io/spectral";
export const normalizeLineBreaks = (value: unknown): string =>
  util.types.toString(value).replace(/\\n/g, "\n");
