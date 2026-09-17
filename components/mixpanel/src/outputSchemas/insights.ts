export const queryInsightsSavedReportsOutputSchema = {
  type: "object" as const,
  properties: {
    computed_at: { type: "string" },
    date_range: {
      type: "object" as const,
      properties: {
        from_date: { type: "string" },
        to_date: { type: "string" },
      },
      required: ["from_date", "to_date"],
    },
    headers: { type: "array", items: { type: "string" } },
    series: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        additionalProperties: { type: "number" },
      },
    },
  },
  required: ["computed_at", "date_range", "headers", "series"],
};
