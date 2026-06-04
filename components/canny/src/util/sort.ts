import type { Element } from "@prismatic-io/spectral";

const sortByLabel = (a: Element, b: Element): number =>
  (a.label ?? "") < (b.label ?? "") ? -1 : 1;

export const toSortedPicklist = <T>(
  items: T[],
  getLabel: (item: T) => string,
  getKey: (item: T) => string,
): Element[] =>
  items
    .map((item): Element => ({ label: getLabel(item), key: getKey(item) }))
    .sort(sortByLabel);
