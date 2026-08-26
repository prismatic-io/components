import type { Element } from "@prismatic-io/spectral";
export const sortByLabel = (elements: Element[]): Element[] =>
  elements.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));
