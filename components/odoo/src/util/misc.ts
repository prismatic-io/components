import type { Element } from "@prismatic-io/spectral";

export const sortByLabelASC = (a: Element, b: Element) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};
