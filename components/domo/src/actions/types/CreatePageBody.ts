import type { Visibility } from "./Visibility";

export type CreatePageBody = {
  name?: string;
  parentId?: number;
  locked?: string;
  cardIds?: number[];
  visibility?: Visibility;
};
