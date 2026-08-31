import { mutateResourceNameResultSchema } from "./common";
export const listAccessibleCustomersOutputSchema = {
  type: "object" as const,
  properties: {
    resourceNames: { type: "array", items: { type: "string" } },
  },
};
export const listCustomersOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          customerClient: {
            type: "object",
            properties: {
              resourceName: { type: "string" },
              clientCustomer: { type: "string" },
              id: { type: "string" },
              level: { type: "string" },
              hidden: { type: "boolean" },
            },
          },
        },
        required: ["resourceName"],
      },
    },
    nextPageToken: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
  },
};
export const getCustomerOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          customer: {
            type: "object",
            properties: {
              resourceName: { type: "string" },
              id: { type: "string" },
              descriptiveName: { type: "string" },
              status: {
                type: "string",
                enum: [
                  "UNSPECIFIED",
                  "UNKNOWN",
                  "ENABLED",
                  "CANCELED",
                  "SUSPENDED",
                  "CLOSED",
                ],
              },
              testAccount: { type: "boolean" },
              manager: { type: "boolean" },
            },
          },
        },
        required: ["resourceName"],
      },
    },
    nextPageToken: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
  },
};
export const getConversionActionOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          conversionAction: {
            type: "object",
            properties: {
              resourceName: { type: "string" },
              id: { type: "string" },
              name: { type: "string" },
            },
          },
        },
        required: ["resourceName"],
      },
    },
    nextPageToken: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
  },
};
export const createClientLinkOutputSchema = {
  type: "object" as const,
  properties: {
    resourceName: { type: "string" },
    managerCustomerId: { type: "string" },
    clientCustomerId: { type: "string" },
    managerLinkId: { type: "string" },
  },
  required: ["resourceName", "managerCustomerId", "clientCustomerId"],
};
export const confirmClientLinkOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: mutateResourceNameResultSchema },
  },
};
