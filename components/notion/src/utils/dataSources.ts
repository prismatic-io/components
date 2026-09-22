import type { Element } from "@prismatic-io/spectral";
import type { InlineDSPage } from "../types";
export const sortArray = (array: Element[]): Element[] => {
  return [...array].sort((a, b) => {
    const left = a.label || "";
    const right = b.label || "";
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  });
};
export const getPageTitle = (page: InlineDSPage): string => {
  if (!page.properties) return "Untitled";
  for (const prop of Object.values(page.properties)) {
    if (prop.type === "title" || prop.id === "title") {
      return prop.title?.[0]?.plain_text || "Untitled";
    }
  }
  return "Untitled";
};
