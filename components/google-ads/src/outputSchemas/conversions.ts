import {
  fieldWarningSchema,
  googleRpcStatusSchema,
  userIdentifierSchema,
} from "./common";

export const uploadCallConversionsOutputSchema = {
  type: "object" as const,
  properties: {
    partialFailureError: googleRpcStatusSchema,
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          callerId: { type: "string" },
          callStartDateTime: { type: "string" },
          conversionAction: { type: "string" },
          conversionDateTime: { type: "string" },
        },
      },
    },
  },
};

export const uploadClickConversionsOutputSchema = {
  type: "object" as const,
  properties: {
    partialFailureError: googleRpcStatusSchema,
    jobId: { type: "string" },
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          gclid: { type: "string" },
          gbraid: { type: "string" },
          wbraid: { type: "string" },
          conversionAction: { type: "string" },
          conversionDateTime: { type: "string" },
          userIdentifiers: { type: "array", items: userIdentifierSchema },
        },
      },
    },
  },
};

export const ingestOfflineConversionsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    fieldWarnings: { type: "array", items: fieldWarningSchema },
  },
};
