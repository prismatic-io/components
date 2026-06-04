export const PollResource = {
  CONTACTS: "contacts",
  COMPANIES: "companies",
} as const;

export const POLL_RESOURCE_CONFIG = {
  [PollResource.CONTACTS]: { label: "Contacts" },
  [PollResource.COMPANIES]: { label: "Companies" },
} as const;

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
