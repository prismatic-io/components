import { util } from "@prismatic-io/spectral";

export const normalizeLineBreaks = (value: unknown) =>
  util.types.toString(value).replace(/\\n/g, "\n");
