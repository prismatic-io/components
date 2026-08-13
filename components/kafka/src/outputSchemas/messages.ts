export const publishMessagesOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      topicName: { type: "string" },
      partition: { type: "integer" },
      errorCode: { type: "integer" },
      offset: { type: "string" },
      timestamp: { type: "string" },
      baseOffset: { type: "string" },
      logAppendTime: { type: "string" },
      logStartOffset: { type: "string" },
    },
    required: ["topicName", "partition", "errorCode"],
  },
};
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
