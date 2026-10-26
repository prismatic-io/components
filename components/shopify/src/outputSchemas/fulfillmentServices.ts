import { userErrorsArraySchema } from "./shared";
const fulfillmentServiceSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    serviceName: { type: "string" as const },
    handle: { type: "string" as const },
    location: {
      type: "object" as const,
      properties: { id: { type: "string" as const } },
    },
    callbackUrl: { type: ["string", "null"] },
    trackingSupport: { type: "boolean" as const },
    inventoryManagement: { type: "boolean" as const },
    permitsSkuSharing: { type: "boolean" as const },
  },
};
export const createFulfillmentServiceGqlOutputSchema = {
  type: "object" as const,
  properties: {
    fulfillmentService: fulfillmentServiceSchema,
    userErrors: userErrorsArraySchema,
  },
};
export const deleteFulfillmentServiceGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedId: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};
export const getFulfillmentServiceGqlOutputSchema = {
  type: "object" as const,
  properties: {
    fulfillmentService: fulfillmentServiceSchema,
  },
};
export const listFulfillmentServicesGqlOutputSchema = {
  type: "object" as const,
  properties: {
    fulfillmentServices: {
      type: "array" as const,
      items: fulfillmentServiceSchema,
    },
  },
};
export const updateFulfillmentServiceGqlOutputSchema =
  createFulfillmentServiceGqlOutputSchema;
