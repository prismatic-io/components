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
