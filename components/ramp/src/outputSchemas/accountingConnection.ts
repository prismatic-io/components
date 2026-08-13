import { deleteResponseSchema } from "./shared";
const accountingProviderSchema = {
  type: "object" as const,
  properties: {
    connection_type: {
      type: "string",
      enum: ["API", "CSV", "DIRECT"],
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
      format: "uuid",
    },
    is_active: {
      type: "boolean",
    },
    is_ready_to_migrate: {
      type: "boolean",
    },
    last_linked_at: {
      type: ["string", "null"],
      format: "date-time",
    },
    remote_provider_name: {
      type: ["string", "null"],
    },
    settings: {
      type: ["object", "null"],
      properties: {
        entity_selection_enabled: {
          type: "boolean",
        },
        reimbursement_sync_button_enabled: {
          type: "boolean",
        },
        transaction_accounting_vendor_creation_on_sync_enabled: {
          type: "boolean",
        },
        transaction_sync_button_enabled: {
          type: "boolean",
        },
        vendor_credits_enabled: {
          type: "boolean",
        },
      },
      required: [
        "entity_selection_enabled",
        "reimbursement_sync_button_enabled",
        "transaction_accounting_vendor_creation_on_sync_enabled",
        "transaction_sync_button_enabled",
        "vendor_credits_enabled",
      ],
    },
    status: {
      type: "string",
      enum: ["failed_to_auth", "linked", "revoked", "unlinked"],
    },
  },
  required: [
    "connection_type",
    "created_at",
    "id",
    "is_active",
    "is_ready_to_migrate",
    "last_linked_at",
    "remote_provider_name",
    "settings",
    "status",
  ],
};
export const createAccountingConnectionOutputSchema = accountingProviderSchema;
export const getAccountConnectionOutputSchema = {
  type: "object" as const,
  properties: {
    connection_type: {
      type: "string",
      enum: ["API", "CSV", "DIRECT"],
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
      format: "uuid",
    },
    is_active: {
      type: "boolean",
    },
    is_ready_to_migrate: {
      type: "boolean",
    },
    last_linked_at: {
      type: ["string", "null"],
      format: "date-time",
    },
    message: {
      type: "string",
    },
    remote_provider_name: {
      type: ["string", "null"],
    },
    settings: {
      type: ["object", "null"],
      properties: {
        entity_selection_enabled: {
          type: "boolean",
        },
        reimbursement_sync_button_enabled: {
          type: "boolean",
        },
        transaction_accounting_vendor_creation_on_sync_enabled: {
          type: "boolean",
        },
        transaction_sync_button_enabled: {
          type: "boolean",
        },
        vendor_credits_enabled: {
          type: "boolean",
        },
      },
      required: [
        "entity_selection_enabled",
        "reimbursement_sync_button_enabled",
        "transaction_accounting_vendor_creation_on_sync_enabled",
        "transaction_sync_button_enabled",
        "vendor_credits_enabled",
      ],
    },
    status: {
      type: "string",
      enum: ["failed_to_auth", "linked", "revoked", "unlinked"],
    },
  },
};
export const deleteAccountConnectionOutputSchema = deleteResponseSchema;
