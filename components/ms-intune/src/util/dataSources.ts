import { type Element, util } from "@prismatic-io/spectral";

export const compareElementsByLabel = (a: Element, b: Element): number =>
  util.types.toString(a.label).localeCompare(util.types.toString(b.label));
