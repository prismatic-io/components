import { deleteResponseSchema, pageSchema } from "./shared";
const generalLedgerAccountSchema = {
  type: "object" as const,
  properties: {
    accounting_connection_id: {
      type: "string",
      format: "uuid",
    },
    classification: {
      type: ["string", "null"],
      enum: [
        "ANY",
        "ASSET",
        "CREDCARD",
        "EQUITY",
        "EXPENSE",
        "LIABILITY",
        "REVENUE",
        "UNKNOWN",
      ],
    },
    code: {
      type: "string",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    entity_remote_ids: {
      type: ["array", "null"],
      items: {
        type: "string",
      },
    },
    gl_account_category_info: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        ramp_id: {
          type: "string",
          format: "uuid",
        },
      },
    },
    id: {
      type: "string",
    },
    is_active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    provider_name: {
      type: ["string", "null"],
    },
    ramp_id: {
      type: "string",
      format: "uuid",
    },
    updated_at: {
      type: "string",
      format: "date-time",
    },
    visibility: {
      type: "string",
      enum: ["HIDDEN", "VISIBLE"],
    },
  },
  required: [
    "accounting_connection_id",
    "created_at",
    "entity_remote_ids",
    "is_active",
    "name",
    "provider_name",
    "ramp_id",
  ],
};
export const getGeneralLedgerAccountOutputSchema = generalLedgerAccountSchema;
export const listGeneralLedgerAccountsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: generalLedgerAccountSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateGeneralLedgerAccountOutputSchema =
  generalLedgerAccountSchema;
export const deleteGeneralLedgerAccountOutputSchema = deleteResponseSchema;
