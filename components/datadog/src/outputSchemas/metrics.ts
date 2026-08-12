export const listMetricsOutputSchema = {
  type: "object" as const,
  properties: {
    from: { type: "string" },
    metrics: { type: "array", items: { type: "string" } },
  },
};
export const searchMetricsOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "object",
      properties: {
        metrics: { type: "array", items: { type: "string" } },
      },
    },
  },
};
export const submitMetricsOutputSchema = {
  type: "object" as const,
  properties: {
    errors: { type: "array", items: { type: "string" } },
  },
};
