import type { Element } from "@prismatic-io/spectral";

export const sortElementsByLabel = (a: Element, b: Element) =>
  (a.label ?? "") < (b.label ?? "") ? -1 : 1;
