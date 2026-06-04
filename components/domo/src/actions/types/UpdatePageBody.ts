import type { Visibility } from "./Visibility";

export type UpdatePageBody = {
  page_id: number;
  name?: string;
  parentId?: number;
  locked?: boolean;
  collectionIds?: number[];
  cardIds?: number[];
  visibility?: Visibility;
};
