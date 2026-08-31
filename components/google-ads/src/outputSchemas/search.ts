export const searchAdsOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: { type: "object" as const },
    },
    nextPageToken: { type: "string" as const },
    fieldMask: { type: "string" as const },
    totalResultsCount: { type: "integer" as const },
  },
  required: ["results", "fieldMask"],
};
