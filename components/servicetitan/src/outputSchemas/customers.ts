import { addressSchema, listEnvelope } from "./shared";
const customerSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["Residential", "Commercial"],
    },
    address: addressSchema,
    customFields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          typeId: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: ["string", "null"],
          },
          value: {
            type: ["string", "null"],
          },
        },
        required: ["typeId"],
      },
    },
    balance: {
      type: "number",
      format: "decimal",
    },
    taxExempt: {
      type: "boolean",
    },
    tagTypeIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    doNotMail: {
      type: "boolean",
    },
    doNotService: {
      type: "boolean",
    },
    nationalAccount: {
      type: "boolean",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    createdById: {
      type: "integer",
      format: "int64",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    mergedToId: {
      type: ["integer", "null"],
      format: "int64",
    },
    paymentTermId: {
      type: ["integer", "null"],
      format: "int64",
    },
    creditLimit: {
      type: ["number", "null"],
      format: "decimal",
    },
    creditLimitBalance: {
      type: ["number", "null"],
      format: "decimal",
    },
    externalData: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          key: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
        required: ["key", "value"],
      },
    },
  },
  required: [
    "id",
    "active",
    "name",
    "type",
    "address",
    "customFields",
    "balance",
    "taxExempt",
    "tagTypeIds",
    "doNotMail",
    "doNotService",
    "nationalAccount",
    "createdOn",
    "createdById",
    "modifiedOn",
    "externalData",
  ],
};
const createdCustomerSchema = {
  ...customerSchema,
  properties: {
    ...customerSchema.properties,
    locations: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          taxZoneId: {
            type: ["integer", "null"],
            format: "int64",
          },
          id: {
            type: "integer",
            format: "int64",
          },
          customerId: {
            type: "integer",
            format: "int64",
          },
          active: {
            type: "boolean",
          },
          name: {
            type: "string",
          },
          address: addressSchema,
          customFields: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                typeId: {
                  type: "integer",
                  format: "int64",
                },
                name: {
                  type: ["string", "null"],
                },
                value: {
                  type: ["string", "null"],
                },
              },
              required: ["typeId"],
            },
          },
          createdOn: {
            type: "string",
            format: "date-time",
          },
          createdById: {
            type: "integer",
            format: "int64",
          },
          modifiedOn: {
            type: "string",
            format: "date-time",
          },
          mergedToId: {
            type: ["integer", "null"],
            format: "int64",
          },
          zoneId: {
            type: ["integer", "null"],
            format: "int64",
          },
          taxExempt: {
            type: "boolean",
          },
          tagTypeIds: {
            type: "array",
            items: {
              type: "integer",
              format: "int64",
            },
          },
          externalData: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                key: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
              required: ["key", "value"],
            },
          },
          contacts: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                id: {
                  type: "integer",
                  format: "int64",
                },
                type: {
                  type: "string",
                  enum: [
                    "Phone",
                    "LandlinePhone",
                    "Email",
                    "Fax",
                    "MobilePhone",
                  ],
                },
                value: {
                  type: "string",
                },
                memo: {
                  type: ["string", "null"],
                },
              },
              required: ["id", "type", "value"],
            },
          },
        },
        required: [
          "id",
          "customerId",
          "active",
          "name",
          "address",
          "customFields",
          "createdOn",
          "createdById",
          "modifiedOn",
          "taxExempt",
          "tagTypeIds",
          "externalData",
          "contacts",
        ],
      },
    },
    contacts: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          type: {
            type: "string",
            enum: ["Phone", "LandlinePhone", "Email", "Fax", "MobilePhone"],
          },
          value: {
            type: "string",
          },
          memo: {
            type: ["string", "null"],
          },
        },
        required: ["id", "type", "value"],
      },
    },
  },
  required: [...customerSchema.required, "locations", "contacts"],
};
export const createCustomerOutputSchema = createdCustomerSchema;
export const getCustomerOutputSchema = customerSchema;
export const updateCustomerOutputSchema = customerSchema;
export const listCustomersOutputSchema = listEnvelope(customerSchema);
