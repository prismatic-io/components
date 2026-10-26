import { countSchema, pageInfoSchema, userErrorsArraySchema } from "./shared";
export const countVariantsGqlOutputSchema = countSchema;
export const createVariantGqlOutputSchema = {
  type: "object" as const,
  properties: {
    productVariants: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          title: { type: "string" as const },
          selectedOptions: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                name: { type: "string" as const },
                value: { type: "string" as const },
              },
            },
          },
        },
      },
    },
    userErrors: userErrorsArraySchema,
  },
};
export const deleteVariantGqlOutputSchema = {
  type: "object" as const,
  properties: {
    product: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" as const },
        title: { type: "string" as const },
      },
    },
    userErrors: userErrorsArraySchema,
  },
};
export const getVariantGqlOutputSchema = {
  type: "object" as const,
  properties: {
    productVariant: {
      type: "object" as const,
      properties: {
        id: { type: "string" as const },
        title: { type: "string" as const },
        availableForSale: { type: "boolean" as const },
        barcode: { type: ["string", "null"] },
        compareAtPrice: { type: ["string", "null"] },
        createdAt: { type: "string" as const },
      },
    },
  },
};
export const listVariantsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    productVariants: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          title: { type: "string" as const },
        },
      },
    },
    pageInfo: pageInfoSchema,
  },
};
export const updateVariantGqlOutputSchema = {
  type: "object" as const,
  properties: {
    product: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" as const },
      },
    },
    productVariants: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          metafields: {
            type: "object" as const,
            properties: {
              edges: {
                type: "array" as const,
                items: {
                  type: "object" as const,
                  properties: {
                    node: {
                      type: "object" as const,
                      properties: {
                        namespace: { type: "string" as const },
                        key: { type: "string" as const },
                        value: { type: "string" as const },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    userErrors: userErrorsArraySchema,
  },
};
