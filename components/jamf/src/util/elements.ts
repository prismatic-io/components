import { type Element, util } from "@prismatic-io/spectral";
import type { AttrSelector } from "../types";
import { sortElementsByLabel } from "./sort";

const selectValue = <T>(item: T, selector: AttrSelector<T>): unknown =>
  typeof selector === "function" ? selector(item) : item[selector];

export const mapToSortedElements = <T>(
  items: T[],
  keyAttr: AttrSelector<T>,
  labelAttr: AttrSelector<T>,
): Element[] =>
  items
    .map((item) => {
      const key = util.types.toString(selectValue(item, keyAttr));
      return {
        key,
        label: util.types.toString(selectValue(item, labelAttr), key),
      };
    })
    .sort(sortElementsByLabel);
