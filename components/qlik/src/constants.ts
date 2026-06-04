import type { QlikPaginationStyle, QlikPollResourceConfig } from "./types";





export const POLL_RESOURCE_CONFIG: Record<string, QlikPollResourceConfig> = {
  spaces: {
    endpoint: "/spaces",
    createdField: "createdAt",
    updatedField: "updatedAt",
    paginationStyle: "cursor",
  },
  users: {
    endpoint: "/users",
    createdField: "createdAt",
    updatedField: "lastUpdatedAt",
    paginationStyle: "cursor",
  },
  dataFiles: {
    endpoint: "/data-files",
    createdField: "createdDate",
    updatedField: "modifiedDate",
    paginationStyle: "cursor",
  },
  dataStores: {
    endpoint: "/data-stores",
    createdField: "createdTime",
    updatedField: "lastModifiedTime",
    paginationStyle: "offset",
  },
};

export const POLL_PAGE_SIZE = 100;

export const QLIK_PAGINATION_OFFSET_PARAM: QlikPaginationStyle = "offset";
