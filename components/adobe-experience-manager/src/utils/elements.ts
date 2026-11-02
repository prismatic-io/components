import { type Element, util } from "@prismatic-io/spectral";

export const compareElementLabels = (a: Element, b: Element): number =>
  util.types
    .toString(a.label ?? a.key)
    .localeCompare(util.types.toString(b.label ?? b.key));
