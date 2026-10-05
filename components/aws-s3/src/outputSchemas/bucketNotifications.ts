const notificationFilterSchema = {
  type: "object" as const,
  properties: {
    Key: {
      type: "object" as const,
      properties: {
        FilterRules: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              Name: { type: "string" },
              Value: { type: "string" },
            },
            required: [],
          },
        },
      },
      required: [],
    },
  },
  required: [],
};
const eventsSchema = { type: "array", items: { type: "string" } };
export const getBucketNotificationConfigurationOutputSchema = {
  type: "object" as const,
  properties: {
    TopicConfigurations: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Id: { type: "string" },
          TopicArn: { type: "string" },
          Events: eventsSchema,
          Filter: notificationFilterSchema,
        },
        required: ["TopicArn", "Events"],
      },
    },
    QueueConfigurations: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Id: { type: "string" },
          QueueArn: { type: "string" },
          Events: eventsSchema,
          Filter: notificationFilterSchema,
        },
        required: ["QueueArn", "Events"],
      },
    },
    LambdaFunctionConfigurations: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Id: { type: "string" },
          LambdaFunctionArn: { type: "string" },
          Events: eventsSchema,
          Filter: notificationFilterSchema,
        },
        required: ["LambdaFunctionArn", "Events"],
      },
    },
    EventBridgeConfiguration: { type: "object" as const },
  },
  required: [],
};
