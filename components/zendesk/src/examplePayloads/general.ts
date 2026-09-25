import { listUsersRaw } from "./users";
export const paginationAttributes = {
  meta: {
    has_more: true,
    after_cursor:
      "eyJvIjoibmljZV9pZCIsInYiOiJhUUFBQUFBQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIn0=",
    before_cursor:
      "eyJvIjoibmljZV9pZCIsInYiOiJiUUFBQUFBQWJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiIn0=",
  },
  links: {
    next: "https://example.zendesk.com/api/v2/tickets.json?page[size]=100&page[after]=eyJvIjoibmljZV9pZCIsInYiOiJhUUFBQUFBQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIn0=",
    prev: "https://example.zendesk.com/api/v2/tickets.json?page[size]=100&page[before]=eyJvIjoibmljZV9pZCIsInYiOiJiUUFBQUFBQWJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiIn0=",
  },
};
const rawRequestRaw = {
  users: listUsersRaw,
  next_page: null,
  previous_page: null,
  count: listUsersRaw.length,
};
export const rawRequestExamplePayload = { data: rawRequestRaw };
