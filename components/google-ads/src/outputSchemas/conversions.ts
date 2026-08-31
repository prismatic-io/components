import { googleRpcStatusSchema, userIdentifierSchema } from "./common";
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
    fieldWarnings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            enum: [
              "WARNING_REASON_UNSPECIFIED",
              "WARNING_REASON_CUSTOM_VARIABLE_NOT_ENABLED",
              "WARNING_REASON_CUSTOM_VARIABLE_NOT_PREDEFINED",
              "WARNING_REASON_CART_DATA_NOT_SUPPORTED_WITH_GBRAID_OR_WBRAID",
              "WARNING_REASON_CART_DATA_ITEM_MERCHANT_PRODUCT_ID_MISSING",
              "WARNING_REASON_CART_DATA_ITEM_UNIT_PRICE_MISSING",
              "WARNING_REASON_GENERIC",
              "WARNING_REASON_INVALID_CLIENT_ID",
              "WARNING_REASON_INVALID_SUBDIVISION_CODE",
              "WARNING_REASON_INVALID_REGION_CODE",
              "WARNING_REASON_INVALID_SUBCONTINENT_CODE",
              "WARNING_REASON_INVALID_CONTINENT_CODE",
              "WARNING_REASON_INVALID_DEVICE_CATEGORY",
              "WARNING_REASON_INVALID_DEVICE_SCREEN_RESOLUTION",
              "WARNING_REASON_INVALID_MERCHANT_ID",
            ],
          },
          description: { type: "string" },
          field: { type: "string" },
        },
      },
    },
  },
  required: ["requestId"],
};
