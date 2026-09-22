import type { NotionPage } from "./notion";
export type NotionPaginationState = {
  windowStart: string;
  startCursor: string;
  cursor: string;
  boundaryIds: string[];
};
export type PollingState = {
  lastPolledAt: string;
  boundaryIds?: string[];
  inFlightCursor?: NotionPaginationState;
};
export interface PollingRound {
  records: NotionPage[];
  nextCursor: string | null;
}
type NotionChangeType = "new" | "updated";
export interface NotionRecordChange {
  changeType: NotionChangeType;
  record: NotionPage;
}
export interface PagesChangesObject {
  newPages?: NotionPage[];
  updatedPages?: NotionPage[];
}
export interface DataSourcesChangesObject {
  newDataSources?: NotionPage[];
  updatedDataSources?: NotionPage[];
}
export interface DataSourceItemsChangesObject {
  newItems?: NotionPage[];
  updatedItems?: NotionPage[];
}
