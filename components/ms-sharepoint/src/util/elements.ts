import { type Element, type ObjectSelection, util } from "@prismatic-io/spectral";
import { FOLDER_KEY_SEPARATOR } from "../constants";
import type { ParentRef } from "../types";

export const sortArray = (array: Element[]): Element[] => {
  return array.sort((a, b) => ((a.label || "") < (b.label || "") ? -1 : 1));
};

export const nameOrId = (name: unknown, id: string): string => {
  const label = util.types.toString(name);
  return label === "" ? id : label;
};

export const withParentLabel = (label: string, parent?: string): string =>
  parent === undefined ? label : `${parent} / ${label}`;

export const parentLabel = async (
  parent: ParentRef,
  lookUpName: () => Promise<unknown>,
): Promise<string> => {
  const label = util.types.toString(parent.label);
  if (label !== "") {
    return label;
  }
  try {
    return nameOrId(await lookUpName(), parent.id);
  } catch {
    return parent.id;
  }
};

export const toObjectSelection = (elements: Element[]): ObjectSelection =>
  elements.map((element) => ({ object: element }));

export const toFolderKey = (driveId: string, itemId: string): string =>
  `${driveId}${FOLDER_KEY_SEPARATOR}${itemId}`;
