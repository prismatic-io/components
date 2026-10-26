import { countSchema, userErrorsArraySchema } from "./shared";
const restProductImageSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    alt: { type: ["string", "null"] },
    position: { type: "number" as const },
    product_id: { type: "number" as const },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    admin_graphql_api_id: { type: "string" as const },
    width: { type: ["number", "null"] },
    height: { type: ["number", "null"] },
    src: { type: ["string", "null"] },
  },
};
export const listProductImagesOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        images: { type: "array" as const, items: restProductImageSchema },
      },
    },
  },
};
export const countProductImagesGqlOutputSchema = countSchema;
export const createProductImageGqlOutputSchema = {
  type: "object" as const,
  properties: {
    media: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          alt: { type: ["string", "null"] },
          status: { type: "string" as const },
          image: { type: ["object", "null"] },
        },
      },
    },
    mediaUserErrors: userErrorsArraySchema,
  },
};
export const deleteProductImageGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedMediaIds: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    deletedProductImageIds: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    mediaUserErrors: userErrorsArraySchema,
  },
};
export const getProductImageGqlOutputSchema = {
  type: "object" as const,
  properties: {
    image: {
      type: "object" as const,
      properties: {
        alt: { type: ["string", "null"] },
        id: { type: "string" as const },
        mediaContentType: { type: "string" as const },
        status: { type: "string" as const },
        preview: {
          type: ["object", "null"],
          properties: {
            image: {
              type: ["object", "null"],
              properties: {
                altText: { type: ["string", "null"] },
                height: { type: ["number", "null"] },
                id: { type: "string" as const },
                originalSrc: { type: "string" as const },
                url: { type: "string" as const },
                width: { type: ["number", "null"] },
                src: { type: "string" as const },
              },
            },
            status: { type: "string" as const },
          },
        },
      },
    },
  },
};
export const listProductImagesGqlOutputSchema = listProductImagesOutputSchema;
