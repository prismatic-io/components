export const BASE_URL_V1 = "https://api.rippling.com/platform/api";
export const BASE_URL_V2 = "https://rest.ripplingapis.com";

export const API_VERSION = {
  V1: "v1",
  V2: "v2",
} as const;

export const POLL_RESOURCE_CONFIG: Record<
  string,
  { label: string; supportsDateFilter: boolean }
> = {
  workers: { label: "Workers", supportsDateFilter: true },
  users: { label: "Users", supportsDateFilter: true },
  departments: { label: "Departments", supportsDateFilter: false },
  teams: { label: "Teams", supportsDateFilter: false },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
