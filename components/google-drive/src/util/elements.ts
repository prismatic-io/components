import type { Element } from "@prismatic-io/spectral";
export const disambiguateElements = (elements: Element[]): Element[] => {
  const occurrences = new Map<string, number>();
  for (const { label } of elements) {
    occurrences.set(label, (occurrences.get(label) ?? 0) + 1);
  }
  return elements.map((element) =>
    (occurrences.get(element.label) ?? 0) > 1
      ? { ...element, label: `${element.label} (${element.key})` }
      : element,
  );
};
