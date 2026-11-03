export const createDestinationOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        destinationId: { type: "string" },
        resource: {
          type: "object" as const,
          properties: {
            sqs: {
              type: "object" as const,
              properties: {
                arn: { type: "string" },
              },
            },
            eventBridge: {
              type: "object" as const,
              properties: {
                name: { type: "string" },
                region: { type: "string" },
                accountId: { type: "string" },
              },
            },
          },
        },
      },
    },
    errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },
};

export const getDestinationOutputSchema = createDestinationOutputSchema;

const destinationSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    destinationId: { type: "string" },
    resource: {
      type: "object" as const,
      properties: {
        sqs: {
          type: "object" as const,
          properties: {
            arn: { type: "string" },
          },
        },
        eventBridge: {
          type: "object" as const,
          properties: {
            name: { type: "string" },
            region: { type: "string" },
            accountId: { type: "string" },
          },
        },
      },
    },
  },
};

export const listDestinationsOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "array",
      items: destinationSchema,
    },
    errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },
};

export const deleteDestinationOutputSchema = {
  type: "object" as const,
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },
};

const eventFilterSchema = {
  type: "object" as const,
  properties: {
    eventFilterType: { type: "string" },
    marketplaceIds: {
      type: "array",
      items: { type: "string" },
    },
    aggregationSettings: {
      type: "object" as const,
      properties: {
        aggregationTimePeriod: { type: "string" },
      },
    },
    orderChangeTypes: {
      type: "array",
      items: { type: "string" },
    },
  },
};

const subscriptionSchema = {
  type: "object" as const,
  properties: {
    subscriptionId: { type: "string" },
    payloadVersion: { type: "string" },
    destinationId: { type: "string" },
    processingDirective: {
      type: "object" as const,
      properties: {
        eventFilter: eventFilterSchema,
      },
    },
  },
};

export const createSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    payload: subscriptionSchema,
    errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },
};

export const getSubscriptionByIdOutputSchema = createSubscriptionOutputSchema;

export const listSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        subscriptions: {
          type: "array",
          items: subscriptionSchema,
        },
        nextToken: { type: "string" },
      },
    },
    errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "string" },
        },
      },
    },
  },
};

export const deleteSubscriptionOutputSchema = deleteDestinationOutputSchema;
