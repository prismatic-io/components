



import type { PicklistItem, PicklistMapConfig } from "../types";


















export const toPicklistResult = <T>(items: T[], config: PicklistMapConfig<T>): PicklistItem[] => {
  return items.map((item) => ({
    label: config.getLabel(item),
    key: config.getKey(item),
  }));
};
