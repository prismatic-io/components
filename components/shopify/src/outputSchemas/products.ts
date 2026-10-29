import { userErrorsArraySchema } from "./shared";

const restProductSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    title: { type: "string" as const },
    body_html: { type: ["string", "null"] },
    vendor: { type: "string" as const },
    product_type: { type: "string" as const },
    created_at: { type: "string" as const },
    handle: { type: "string" as const },
    updated_at: { type: "string" as const },
    published_at: { type: ["string", "null"] },
    template_suffix: { type: ["string", "null"] },
    status: { type: "string" as const },
    published_scope: { type: ["string", "null"] },
    tags: { type: "string" as const },
    admin_graphql_api_id: { type: "string" as const },
    variants: { type: "array" as const, items: { type: "object" } },
    options: { type: "array" as const, items: { type: "object" } },
    images: { type: "array" as const, items: { type: "object" } },
    image: { type: ["object", "null"] },
  },
};

const restMappedProductSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    title: { type: "string" as const },
    body_html: { type: ["string", "null"] },
    vendor: { type: "string" as const },
    product_type: { type: "string" as const },
    created_at: { type: "string" as const },
    handle: { type: "string" as const },
    updated_at: { type: "string" as const },
    published_at: { type: ["string", "null"] },
    template_suffix: { type: ["string", "null"] },
    tags: { type: "string" as const },
    status: { type: "string" as const },
    admin_graphql_api_id: { type: "string" as const },
    variants: { type: "array" as const, items: { type: "object" } },
    options: { type: "array" as const, items: { type: "object" } },
    images: { type: "array" as const, items: { type: "object" } },
    image: { type: ["object", "null"] },
  },
};

export const getProductOutputSchema = {
  type: "object" as const,
  properties: {
    product: restProductSchema,
  },
};

export const listProductsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        products: { type: "array" as const, items: restProductSchema },
      },
    },
    pagination: {
      type: ["object", "null"],
      properties: {
        previous: {
          type: "object" as const,
          properties: {
            limit: { type: "string" as const },
            page_info: { type: "string" as const },
            rel: { type: "string" as const },
            url: { type: "string" as const },
          },
        },
        next: {
          type: "object" as const,
          properties: {
            page_info: { type: "string" as const },
            rel: { type: "string" as const },
          },
        },
      },
    },
    pageInfo: { type: ["string", "null"] },
    rel: { type: ["string", "null"] },
  },
};

export const countProductsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        count: { type: "number" as const },
      },
    },
  },
};

export const createProductGqlOutputSchema = {
  type: "object" as const,
  properties: {
    product: restMappedProductSchema,
  },
};

export const countProductsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        count: { type: "number" as const },
      },
    },
  },
};

export const deleteProductGqlOutputSchema = {
  type: "object" as const,
  properties: {
    deletedProductId: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};

export const getProductGqlOutputSchema = createProductGqlOutputSchema;

export const listProductsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        products: { type: "array" as const, items: restMappedProductSchema },
      },
    },
    pagination: {
      type: ["object", "null"],
      properties: {
        next: {
          type: "object" as const,
          properties: {
            page_info: { type: "string" as const },
            rel: { type: "string" as const },
          },
        },
      },
    },
    pageInfo: { type: ["string", "null"] },
    rel: { type: ["string", "null"] },
  },
};

export const updateProductGqlOutputSchema = {
  type: "object" as const,
  properties: {
    product: {
      type: "object" as const,
      properties: {
        id: { type: "string" as const },
        title: { type: "string" as const },
        media: {
          type: "object" as const,
          properties: {
            nodes: { type: "array" as const, items: { type: "object" } },
          },
        },
      },
    },
    userErrors: userErrorsArraySchema,
  },
};
