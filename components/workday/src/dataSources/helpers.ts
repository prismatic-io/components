import type { Element } from "@prismatic-io/spectral";






export const toSortedPicklist = <T>(
  items: T[],
  mapper: (item: T) => Element,
): Element[] =>
  items
    .map(mapper)
    .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
