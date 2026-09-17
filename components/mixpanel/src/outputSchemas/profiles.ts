export const queryProfilesOutputSchema = {
  type: "object" as const,
  properties: {
    page: { type: "integer" },
    page_size: { type: "integer" },
    session_id: { type: "string" },
    status: { type: "string" },
    total: { type: "integer" },
    results: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          $distinct_id: { type: "integer" },
          $properties: { type: "object" },
        },
      },
    },
  },
  required: ["page", "page_size", "session_id", "status", "total", "results"],
};
