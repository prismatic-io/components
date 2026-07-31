export const contactDetailsOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    unique_name: { type: "string" },
    email: { type: "string" },
    phone_number_id: { type: "string" },
    external_id: { type: "string" },
    anonymous_id: { type: "string" },
    alternate_emails: { type: "array", items: { type: "string" } },
    address_line_1: { type: "string" },
    address_line_2: { type: "string" },
    city: { type: "string" },
    state_province_region: { type: "string" },
    country: { type: "string" },
    postal_code: { type: "string" },
    phone_number: { type: "string" },
    whatsapp: { type: "string" },
    line: { type: "string" },
    facebook: { type: "string" },
    list_ids: { type: "array", items: { type: "string" } },
    segment_ids: { type: "array", items: { type: "string" } },
    custom_fields: { type: "object" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    _metadata: { type: "object", properties: { self: { type: "string" } } },
  },
  required: ["id", "list_ids", "created_at", "updated_at"],
};
export const addOrUpdateContactOutputSchema = {
  type: "object" as const,
  properties: {
    job_id: { type: "string" },
  },
};
export const getContactsByEmailsOutputSchema = {
  type: "object" as const,
  properties: {
    result: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        properties: {
          contact: contactDetailsOutputSchema,
          error: { type: "string" },
        },
      },
    },
  },
};
export const getImportStatusOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    status: {
      type: "string",
      enum: ["pending", "completed", "errored", "failed"],
    },
    job_type: { type: "string", enum: ["upsert", "delete"] },
    results: {
      type: "object" as const,
      properties: {
        requested_count: { type: "number" },
        created_count: { type: "number" },
        updated_count: { type: "number" },
        deleted_count: { type: "number" },
        errored_count: { type: "number" },
        errors_url: { type: "string" },
      },
    },
    started_at: { type: "string" },
    finished_at: { type: "string" },
  },
};
export const initiateContactsImportOutputSchema = {
  type: "object" as const,
  properties: {
    job_id: { type: "string" },
    upload_uri: { type: "string" },
    upload_headers: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          header: { type: "string" },
          value: { type: "string" },
        },
        required: ["header", "value"],
      },
    },
  },
};
