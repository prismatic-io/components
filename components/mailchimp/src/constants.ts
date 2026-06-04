
export const MAX_PAGE_SIZE = 1000;


export const DEFAULT_PAGE_SIZE = 10;


export const WEBHOOK_EVENTS_MODEL = [
  { label: "Subscribe", value: "subscribe" },
  { label: "Unsubscribe", value: "unsubscribe" },
  { label: "Profile Update", value: "profile" },
  { label: "Cleaned (Bounced)", value: "cleaned" },
  { label: "Email Change", value: "upemail" },
  { label: "Campaign Sent", value: "campaign" },
];


export const WEBHOOK_SOURCES_MODEL = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
  { label: "API", value: "api" },
];
