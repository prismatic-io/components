import { deleteResponseSchema, pageSchema } from "./shared";
const customAccountingFieldSchema = {
  type: "object" as const,
  properties: {
    accounting_connection_id: {
      type: "string",
      format: "uuid",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    display_name: {
      type: ["string", "null"],
    },
    id: {
      type: "string",
    },
    input_type: {
      type: "string",
      enum: ["BOOLEAN", "DATE", "FREE_FORM_TEXT", "SINGLE_CHOICE"],
    },
    is_active: {
      type: "boolean",
    },
    is_required_for: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "BILL",
          "BILL_PAYMENT",
          "CUSTOMER",
          "INVOICE",
          "PURCHASE_ORDER",
          "REIMBURSEMENT",
          "SPEND_PROGRAM",
          "TRANSACTION",
          "TRANSFER_LEDGER_ENTRY_MAPPING",
          "VENDOR_CREDIT",
        ],
      },
    },
    is_splittable: {
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
  },
  required: [
    "accounting_connection_id",
    "display_name",
    "input_type",
    "is_required_for",
    "provider_name",
  ],
};
export const createCustomAccountingFieldOutputSchema =
  customAccountingFieldSchema;
export const getCustomAccountingFieldOutputSchema = customAccountingFieldSchema;
export const listCustomAccountingFieldOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: customAccountingFieldSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateCustomAccountingFieldOutputSchema =
  customAccountingFieldSchema;
export const deleteCustomAccountingFieldOutputSchema = deleteResponseSchema;
