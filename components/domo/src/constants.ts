import type { ResourceConfig } from "./types";

export const BASE_URL = "https://api.domo.com/v1";
export const OAUTH_URL = "https://api.domo.com/oauth";

export const RESOURCE_CONFIG: Record<string, ResourceConfig> = {
  datasets: {
    label: "DataSets",
    endpoint: "/datasets",
    maxPerPage: 50,
    createdAtField: "createdAt",
    updatedAtField: "updatedAt",
  },
  streams: {
    label: "Streams",
    endpoint: "/streams",
    maxPerPage: 500,
    createdAtField: "createdAt",
    updatedAtField: "modifiedAt",
  },
  users: {
    label: "Users",
    endpoint: "/users",
    maxPerPage: 500,
    createdAtField: "createdAt",
    updatedAtField: "updatedAt",
  },
  projects: {
    label: "Projects",
    endpoint: "/projects",
    maxPerPage: 500,
    createdAtField: "createdDate",
    updatedAtField: null,
  },
  groups: {
    label: "Groups",
    endpoint: "/groups",
    maxPerPage: 500,
    createdAtField: null,
    updatedAtField: null,
  },
  pages: {
    label: "Pages",
    endpoint: "/pages",
    maxPerPage: 500,
    createdAtField: null,
    updatedAtField: null,
  },
};

export const resourceModel = Object.entries(RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
