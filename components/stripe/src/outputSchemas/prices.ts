export const priceOutputSchema = {
  type: "object" as const,
  properties: {
    active: {
      type: "boolean",
    },
    billing_scheme: {
      type: "string",
      enum: ["per_unit", "tiered"],
    },
    created: {
      type: "integer",
      format: "unix-time",
    },
    currency: {
      type: "string",
      format: "currency",
    },
    currency_options: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        properties: {
          custom_unit_amount: {
            type: ["object", "null"],
            properties: {
              maximum: {
                type: ["integer", "null"],
              },
              minimum: {
                type: ["integer", "null"],
              },
              preset: {
                type: ["integer", "null"],
              },
            },
          },
          tax_behavior: {
            type: ["string", "null"],
            enum: ["exclusive", "inclusive", "unspecified"],
          },
          tiers: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                flat_amount: {
                  type: ["integer", "null"],
                },
                flat_amount_decimal: {
                  type: ["string", "null"],
                  format: "decimal",
                },
                unit_amount: {
                  type: ["integer", "null"],
                },
                unit_amount_decimal: {
                  type: ["string", "null"],
                  format: "decimal",
                },
                up_to: {
                  type: ["integer", "null"],
                },
              },
            },
          },
          unit_amount: {
            type: ["integer", "null"],
          },
          unit_amount_decimal: {
            type: ["string", "null"],
            format: "decimal",
          },
        },
      },
    },
    custom_unit_amount: {
      type: ["object", "null"],
      properties: {
        maximum: {
          type: ["integer", "null"],
        },
        minimum: {
          type: ["integer", "null"],
        },
        preset: {
          type: ["integer", "null"],
        },
      },
    },
    id: {
      type: "string",
    },
    livemode: {
      type: "boolean",
    },
    lookup_key: {
      type: ["string", "null"],
    },
    metadata: {
      type: "object" as const,
      additionalProperties: {
        type: "string",
      },
    },
    nickname: {
      type: ["string", "null"],
    },
    object: {
      type: "string",
      enum: ["price"],
    },
    product: {
      type: "string",
    },
    recurring: {
      type: ["object", "null"],
      properties: {
        interval: {
          type: "string",
          enum: ["day", "month", "week", "year"],
        },
        interval_count: {
          type: "integer",
        },
        meter: {
          type: ["string", "null"],
        },
        usage_type: {
          type: "string",
          enum: ["licensed", "metered"],
        },
      },
      required: ["interval", "interval_count", "usage_type"],
    },
    tax_behavior: {
      type: ["string", "null"],
      enum: ["exclusive", "inclusive", "unspecified"],
    },
    tiers: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          flat_amount: {
            type: ["integer", "null"],
          },
          flat_amount_decimal: {
            type: ["string", "null"],
            format: "decimal",
          },
          unit_amount: {
            type: ["integer", "null"],
          },
          unit_amount_decimal: {
            type: ["string", "null"],
            format: "decimal",
          },
          up_to: {
            type: ["integer", "null"],
          },
        },
      },
    },
    tiers_mode: {
      type: ["string", "null"],
      enum: ["graduated", "volume"],
    },
    transform_quantity: {
      type: ["object", "null"],
      properties: {
        divide_by: {
          type: "integer",
        },
        round: {
          type: "string",
          enum: ["down", "up"],
        },
      },
      required: ["divide_by", "round"],
    },
    type: {
      type: "string",
      enum: ["one_time", "recurring"],
    },
    unit_amount: {
      type: ["integer", "null"],
    },
    unit_amount_decimal: {
      type: ["string", "null"],
      format: "decimal",
    },
  },
  required: [
    "active",
    "billing_scheme",
    "created",
    "currency",
    "id",
    "livemode",
    "metadata",
    "object",
    "product",
    "type",
  ],
};
export const listPricesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    data: { type: "array", items: priceOutputSchema },
    has_more: { type: "boolean" },
    url: { type: "string" },
  },
  required: ["object", "data", "has_more", "url"],
};
