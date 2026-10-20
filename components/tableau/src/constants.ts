export const POLL_PAGE_SIZE = 100;
export const MAX_POLL_PAGES = 50;
export const DEFAULT_BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const POLL_RESOURCE_CONFIG: Record<
  string,
  {
    endpoint: string;
    collectionKey: string;
    itemKey: string;
  }
> = {
  workbooks: {
    endpoint: "/workbooks",
    collectionKey: "workbooks",
    itemKey: "workbook",
  },
  views: { endpoint: "/views", collectionKey: "views", itemKey: "view" },
  datasources: {
    endpoint: "/datasources",
    collectionKey: "datasources",
    itemKey: "datasource",
  },
};
