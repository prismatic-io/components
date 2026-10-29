export const FEED_DEFAULT_PAGE_SIZE = 100;

export const PollResource = {
  ORDERS: "orders",
  FEEDS: "feeds",
} as const;

export const POLL_RESOURCE_CONFIG = {
  [PollResource.ORDERS]: { label: "Orders" },
  [PollResource.FEEDS]: { label: "Feeds" },
} as const;

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
