export const attachmentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" },
    content_type: { type: "string" },
    size: { type: "number" },
    name: { type: "string" },
    attachment_url: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
  required: ["id"],
};
export const customFieldsSchema = { type: "object" as const };
export const successOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
  },
  required: ["success"],
  additionalProperties: false,
};
