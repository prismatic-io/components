const attributeItemSchema = {
  type: ["object", "null"],
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    value: { type: ["string", "number", "boolean", "object", "array"] },
  },
  required: ["name", "type", "value"],
};
export const createCustomerOutputSchema = {
  type: "object" as const,
  properties: {
    createCustomer: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" },
        username: { type: ["string", "null"] },
        primaryEmail: { type: ["string", "null"] },
        primaryPhone: { type: ["string", "null"] },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        timezone: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        promotionOptIn: { type: ["boolean", "null"] },
        retailer: {
          type: ["object", "null"],
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        attributes: {
          type: ["array", "null"],
          items: attributeItemSchema,
        },
      },
      required: [
        "id",
        "username",
        "primaryEmail",
        "primaryPhone",
        "firstName",
        "lastName",
        "timezone",
        "country",
        "promotionOptIn",
        "retailer",
        "attributes",
      ],
    },
  },
  required: ["createCustomer"],
};
export const getCustomerByEmailAddressOutputSchema = {
  type: "object" as const,
  properties: {
    customers: {
      type: ["object", "null"],
      properties: {
        edges: {
          type: ["array", "null"],
          items: {
            type: ["object", "null"],
            properties: {
              node: {
                type: ["object", "null"],
                properties: {
                  id: { type: "string" },
                  ref: { type: ["string", "null"] },
                  firstName: { type: ["string", "null"] },
                  lastName: { type: ["string", "null"] },
                  username: { type: ["string", "null"] },
                  primaryEmail: { type: ["string", "null"] },
                  primaryPhone: { type: ["string", "null"] },
                  timezone: { type: ["string", "null"] },
                  attributes: {
                    type: ["array", "null"],
                    items: {
                      type: ["object", "null"],
                      properties: {
                        name: { type: "string" },
                        type: { type: "string" },
                      },
                      required: ["name", "type"],
                    },
                  },
                },
                required: [
                  "id",
                  "ref",
                  "firstName",
                  "lastName",
                  "username",
                  "primaryEmail",
                  "primaryPhone",
                  "timezone",
                  "attributes",
                ],
              },
            },
            required: ["node"],
          },
        },
      },
      required: ["edges"],
    },
  },
  required: ["customers"],
};
export const getCurrentUserOutputSchema = {
  type: "object" as const,
  properties: {
    me: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        title: { type: ["string", "null"] },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        primaryEmail: { type: ["string", "null"] },
        primaryPhone: { type: ["string", "null"] },
        type: { type: "string" },
        status: { type: ["string", "null"] },
        attributes: {
          type: ["array", "null"],
          items: attributeItemSchema,
        },
        department: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        timezone: { type: ["string", "null"] },
        language: {
          type: ["object", "null"],
          properties: {
            value: { type: ["string", "null"] },
            label: { type: ["string", "null"] },
          },
          required: ["value", "label"],
        },
        promotionOptIn: { type: ["boolean", "null"] },
        primaryRetailer: {
          type: ["object", "null"],
          properties: {
            id: { type: "string" },
            tradingName: { type: ["string", "null"] },
          },
          required: ["id", "tradingName"],
        },
        primaryLocation: {
          type: ["object", "null"],
          properties: {
            id: { type: "string" },
            type: { type: ["string", "null"] },
            status: { type: ["string", "null"] },
            name: { type: ["string", "null"] },
          },
          required: ["id", "type", "status", "name"],
        },
        roles: {
          type: ["array", "null"],
          items: {
            type: ["object", "null"],
            properties: {
              role: {
                type: "object" as const,
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  permissions: {
                    type: ["array", "null"],
                    items: {
                      type: ["object", "null"],
                      properties: {
                        name: { type: "string" },
                      },
                      required: ["name"],
                    },
                  },
                },
                required: ["id", "name", "permissions"],
              },
            },
            required: ["role"],
          },
        },
        apps: {
          type: ["array", "null"],
          items: {
            type: ["object", "null"],
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              version: {
                type: "object" as const,
                properties: {
                  major: { type: "integer" },
                  minor: { type: "integer" },
                  patch: { type: "integer" },
                },
                required: ["major", "minor", "patch"],
              },
            },
            required: ["id", "name", "version"],
          },
        },
      },
      required: [
        "id",
        "username",
        "title",
        "firstName",
        "lastName",
        "primaryEmail",
        "primaryPhone",
        "type",
        "status",
        "attributes",
        "department",
        "country",
        "timezone",
        "language",
        "promotionOptIn",
        "primaryRetailer",
        "primaryLocation",
        "roles",
        "apps",
      ],
    },
  },
  required: ["me"],
};
export const createProductOutputSchema = {
  type: "object" as const,
  properties: {
    createStandardProduct: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" },
        ref: { type: "string" },
      },
      required: ["id", "ref"],
    },
  },
  required: ["createStandardProduct"],
};
