import type { PollResourceConfig } from "./types";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  groups: {
    label: "Groups (Workspaces)",
    endpoint: "groups",
    createdAtField: null,
  },
  datasets: {
    label: "Datasets",
    endpoint: "datasets",
    createdAtField: "createdDate",
  },
  reports: {
    label: "Reports",
    endpoint: "reports",
    createdAtField: null,
  },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
