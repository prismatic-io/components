import { pageInfoSchema, userErrorsArraySchema } from "./shared";

const metafieldSchema = {
  type: "object" as const,
  properties: {
    key: { type: "string" as const },
    value: { type: "string" as const },
    type: { type: "string" as const },
    namespace: { type: "string" as const },
    productId: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    jsonValue: { type: ["string", "null"] },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
  },
};

export const listMetafieldsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    metafields: { type: "array" as const, items: metafieldSchema },
    pageInfo: pageInfoSchema,
  },
};

export const setMetafieldGqlOutputSchema = {
  type: "object" as const,
  properties: {
    metafields: { type: "array" as const, items: metafieldSchema },
    userErrors: userErrorsArraySchema,
  },
};

export const deleteMetafieldGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedMetafields: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          key: { type: "string" as const },
          namespace: { type: "string" as const },
          ownerId: { type: "string" as const },
        },
      },
    },
    userErrors: userErrorsArraySchema,
  },
};
