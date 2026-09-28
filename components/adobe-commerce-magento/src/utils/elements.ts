import type { Element } from "@prismatic-io/spectral";
const byLabel = (a: Element, b: Element): number => {
  const left = a.label ?? "";
  const right = b.label ?? "";
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
};
export const toSortedElements = <T>(
  rows: T[] | undefined,
  toElement: (row: T) => Element,
): Element[] => (rows ?? []).map(toElement).sort(byLabel);
