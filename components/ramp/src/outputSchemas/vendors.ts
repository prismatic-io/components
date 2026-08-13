import { deleteResponseSchema, pageSchema } from "./shared";
const vendorSchema = {
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
    is_synced: {
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
    vendor_category_info: {
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
  },
  required: [
    "accounting_connection_id",
    "created_at",
    "entity_remote_ids",
    "is_active",
    "is_synced",
    "name",
    "provider_name",
    "ramp_id",
    "updated_at",
  ],
};
export const getVendorOutputSchema = vendorSchema;
export const listVendorsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: vendorSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateVendorOutputSchema = vendorSchema;
export const deleteVendorOutputSchema = deleteResponseSchema;
