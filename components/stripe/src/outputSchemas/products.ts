export const productOutputSchema = {
  type: "object" as const,
  properties: {
    active: {
      type: "boolean",
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    default_price: {
      type: ["string", "null"],
    },
    description: {
      type: ["string", "null"],
    },
    id: {
      type: "string",
    },
    images: {
      type: "array",
      items: {
        type: "string",
      },
    },
    livemode: {
      type: "boolean",
    },
    marketing_features: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          name: {
            type: "string",
          },
        },
      },
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    name: {
      type: "string",
    },
    object: {
      type: "string",
      enum: ["product"],
    },
    package_dimensions: {
      type: ["object", "null"],
      properties: {
        height: {
          type: "number",
        },
        length: {
          type: "number",
        },
        weight: {
          type: "number",
        },
        width: {
          type: "number",
        },
      },
      required: ["height", "length", "weight", "width"],
    },
    shippable: {
      type: ["boolean", "null"],
    },
    statement_descriptor: {
      type: ["string", "null"],
    },
    tax_code: {
      type: ["string", "null"],
    },
    unit_label: {
      type: ["string", "null"],
    },
    updated: {
      type: "integer",
      format: "unix-time",
    },
    url: {
      type: ["string", "null"],
    },
  },
  required: [
    "active",
    "created",
    "id",
    "images",
    "livemode",
    "marketing_features",
    "metadata",
    "name",
    "object",
    "updated",
  ],
};
export const listProductsOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: productOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
export const deleteProductOutputSchema = {
  type: "object" as const,
  properties: {
    deleted: {
      type: "boolean",
      enum: [true],
    },
    id: {
      type: "string",
    },
    object: {
      type: "string",
      enum: ["product"],
    },
  },
  required: ["deleted", "id", "object"],
};
