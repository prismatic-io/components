const topicSummarySchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    partitions: { type: "integer" },
    isInternal: { type: "boolean" },
  },
  required: ["name", "partitions", "isInternal"],
};
export const listTopicsOutputSchema = {
  type: "object" as const,
  properties: {
    topics: { type: "array", items: topicSummarySchema },
    internalTopics: { type: "array", items: topicSummarySchema },
    totalCount: { type: "integer" },
  },
  required: ["topics", "internalTopics", "totalCount"],
};
