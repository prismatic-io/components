import { pageInfoSchema, userErrorsArraySchema } from "./shared";
const inventoryItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    sku: { type: ["string", "null"] },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
    requiresShipping: { type: "boolean" as const },
    unitCost: {
      type: ["object", "null"],
      properties: {
        amount: { type: "string" as const },
        currencyCode: { type: "string" as const },
      },
    },
    countryCodeOfOrigin: { type: ["string", "null"] },
    provinceCodeOfOrigin: { type: ["string", "null"] },
    harmonizedSystemCode: { type: ["string", "null"] },
    tracked: { type: "boolean" as const },
    countryHarmonizedSystemCodes: {
      type: "object" as const,
      properties: {
        nodes: { type: "array" as const, items: { type: "object" } },
      },
    },
  },
};
export const getInventoryItemsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryItem: inventoryItemSchema,
  },
};
export const listInventoryItemsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryItems: { type: "array" as const, items: inventoryItemSchema },
    pageInfo: pageInfoSchema,
  },
};
export const updateInventoryItemsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryItemUpdate: {
      type: "object" as const,
      properties: {
        inventoryItem: inventoryItemSchema,
        userErrors: userErrorsArraySchema,
      },
    },
  },
};
