export const BASE_URL = "https://webapi.teamviewer.com/api/v1/";
export const NO_CONTENT_RESPONSE = "ACTION SUCCEEDED";

export const POLL_RESOURCE_CONFIG: Record<
  string,
  { label: string; fetcher: "fetchDevices" | "fetchUsers" | "fetchGroups" }
> = {
  devices: { label: "Devices", fetcher: "fetchDevices" },
  users: { label: "Users", fetcher: "fetchUsers" },
  groups: { label: "Groups", fetcher: "fetchGroups" },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
