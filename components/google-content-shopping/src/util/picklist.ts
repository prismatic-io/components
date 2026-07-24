import type { Element } from "@prismatic-io/spectral";
export const toPicklist = <T>(
  items: T[],
  toElement: (item: T) => Element,
): {
  result: Element[];
} => ({
  result: items
    .map(toElement)
    .filter((item) => item.key)
    .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
});
