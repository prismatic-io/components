export const cursorMetaSchema = {
  type: "object" as const,
  properties: {
    has_more: { type: "boolean" },
    after_cursor: { type: "string" },
    before_cursor: { type: "string" },
  },
};
export const cursorLinksSchema = {
  type: "object" as const,
  properties: {
    first: { type: "string" },
    last: { type: "string" },
    next: { type: "string" },
    prev: { type: "string" },
  },
};
export const offsetPaginationProperties = {
  count: { type: "integer" },
  next_page: { type: ["string", "null"] },
  previous_page: { type: ["string", "null"] },
};
