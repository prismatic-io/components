const campaignRowSchema = {
  type: "object",
  properties: {
    campaign: {
      type: "object",
      properties: {
        resourceName: { type: "string" },
        id: { type: "string" },
        name: { type: "string" },
        status: {
          type: "string",
          enum: ["UNSPECIFIED", "UNKNOWN", "ENABLED", "PAUSED", "REMOVED"],
        },
      },
      required: [],
      additionalProperties: true,
    },
  },
  required: [],
  additionalProperties: true,
};

export const searchAdsOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: campaignRowSchema,
    },
    nextPageToken: { type: "string" },
    totalResultsCount: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
    metricAttributes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          attributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: { type: "string" },
                value: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

export const searchStreamOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: campaignRowSchema },
    fieldMask: { type: "string" },
    requestId: { type: "string" },
    summaryRow: {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: true,
    },
  },
  required: ["results"],
  additionalProperties: true,
};
