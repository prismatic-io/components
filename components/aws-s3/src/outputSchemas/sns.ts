export const createTopicOutputSchema = {
  type: "object" as const,
  properties: {
    TopicArn: { type: "string" },
  },
  required: [],
};
export const subscribeToTopicOutputSchema = {
  type: "object" as const,
  properties: {
    SubscriptionArn: { type: "string" },
  },
  required: [],
};
