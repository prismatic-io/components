import { listEnvelope } from "./shared";
const customerContactSchema = {
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
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    phoneSettings: {
      type: "object" as const,
      properties: {
        phoneNumber: {
          type: "string",
        },
        doNotText: {
          type: "boolean",
        },
      },
      required: ["phoneNumber", "doNotText"],
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    preferences: {
      type: ["object", "null"],
      properties: {
        jobRemindersEnabled: {
          type: "boolean",
        },
        marketingUpdatesEnabled: {
          type: "boolean",
        },
        invoiceStatementNotification: {
          type: "boolean",
        },
        invoiceNotification: {
          type: "boolean",
        },
        statementNotification: {
          type: "boolean",
        },
      },
      required: [
        "jobRemindersEnabled",
        "marketingUpdatesEnabled",
        "invoiceStatementNotification",
        "invoiceNotification",
        "statementNotification",
      ],
    },
  },
  required: ["id", "type", "value", "modifiedOn", "phoneSettings", "createdOn"],
};
const customerContactWithCustomerIdSchema = {
  ...customerContactSchema,
  properties: {
    ...customerContactSchema.properties,
    customerId: { type: "integer", format: "int64" },
  },
};
export const createCustomerContactOutputSchema = customerContactSchema;
export const updateCustomerContactOutputSchema = customerContactSchema;
export const listCustomersContactOutputSchema = listEnvelope(
  customerContactWithCustomerIdSchema,
);
