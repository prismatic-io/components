import { countSchema, pageInfoSchema, userErrorsArraySchema } from "./shared";
const collectionSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    description: { type: ["string", "null"] },
    descriptionHtml: { type: ["string", "null"] },
    handle: { type: "string" as const },
    products: {
      type: "object" as const,
      properties: {
        nodes: { type: "array" as const, items: { type: "object" } },
      },
    },
    productsCount: {
      type: "object" as const,
      properties: {
        count: { type: "number" as const },
      },
    },
    sortOrder: { type: "string" as const },
    title: { type: "string" as const },
  },
};
export const listCollectionsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    collections: { type: "array" as const, items: collectionSchema },
    pageInfo: pageInfoSchema,
  },
};
export const getCollectionGqlOutputSchema = {
  type: "object" as const,
  properties: {
    collection: collectionSchema,
  },
};
export const countCollectionsGqlOutputSchema = countSchema;
export const deleteCollectionGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedCollectionId: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};
