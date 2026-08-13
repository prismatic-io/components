import { deleteResponseSchema, pageSchema } from "./shared";
const customAccountingFieldOptionSchema = {
  type: "object" as const,
  properties: {
    accounting_connection_id: {
      type: "string",
      format: "uuid",
    },
    code: {
      type: "string",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    display_name: {
      type: "string",
    },
    entity_remote_ids: {
      type: ["array", "null"],
      items: {
        type: "string",
      },
    },
    id: {
      type: "string",
    },
    is_active: {
      type: "boolean",
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
    value: {
      type: "string",
    },
    visibility: {
      type: "string",
      enum: ["HIDDEN", "VISIBLE"],
    },
  },
  required: ["accounting_connection_id", "entity_remote_ids", "provider_name"],
};
export const getCustomAccountingFieldOptionOutputSchema =
  customAccountingFieldOptionSchema;
export const listCustomAccountingFieldOptionsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: customAccountingFieldOptionSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateCustomAccountingFieldOptionOutputSchema =
  customAccountingFieldOptionSchema;
export const uploadCustomAccountingFieldOptionOutputSchema = {
  type: "object" as const,
  properties: {
    accounting_connection_id: {
      type: "string",
      format: "uuid",
    },
    options: {
      type: "array",
      items: customAccountingFieldOptionSchema,
    },
    uploaded: {
      type: "array",
      items: {
        type: "string",
        format: "uuid",
      },
    },
  },
  required: ["accounting_connection_id"],
};
export const deleteCustomAccountingFieldOptionOutputSchema =
  deleteResponseSchema;
