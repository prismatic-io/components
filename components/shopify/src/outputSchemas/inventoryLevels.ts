import { pageInfoSchema, userErrorsArraySchema } from "./shared";

const inventoryLevelSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    item: {
      type: "object" as const,
      properties: { id: { type: "string" as const } },
    },
    location: {
      type: "object" as const,
      properties: { id: { type: "string" as const } },
    },
    quantities: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          name: { type: "string" as const },
          quantity: { type: "number" as const },
        },
      },
    },
    updatedAt: { type: "string" as const },
  },
};

export const connectInventoryLevelGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryLevel: inventoryLevelSchema,
    userErrors: userErrorsArraySchema,
  },
};

export const deleteInventoryLevelsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    userErrors: userErrorsArraySchema,
  },
};

export const getInventoryLevelsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryLevel: inventoryLevelSchema,
  },
};

export const listInventoryLevelsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    inventoryLevels: { type: "array" as const, items: inventoryLevelSchema },
    pageInfo: pageInfoSchema,
  },
};
