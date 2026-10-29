export const PollResource = {
  CALLS: "calls",
  USERS: "users",
} as const;

export const POLL_RESOURCE_CONFIG = {
  [PollResource.CALLS]: { label: "Calls" },
  [PollResource.USERS]: { label: "Users" },
} as const;

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
