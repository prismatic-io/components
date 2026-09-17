const softwareBaseProperties = {
  id: { type: "number" },
  workspace_id: { type: "number" },
  name: { type: "string" },
  description: { type: ["string", "null"] },
  application_type: { type: "string", enum: ["desktop", "saas", "mobile"] },
  status: { type: "string" },
  publisher_id: { type: ["number", "null"] },
  managed_by_id: { type: ["number", "null"] },
  notes: { type: ["string", "null"] },
  category: { type: ["string", "null"] },
  source: { type: "string" },
  user_count: { type: "number" },
  installation_count: { type: "number" },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
};
export const softwareSchema = {
  type: "object" as const,
  properties: { ...softwareBaseProperties },
  required: ["id"],
  additionalProperties: false,
};
export const softwareOutputSchema = {
  type: "object" as const,
  properties: {
    application: softwareSchema,
  },
  required: ["application"],
  additionalProperties: false,
};
export const moveSoftwareOutputSchema = {
  type: "object" as const,
  properties: {
    application: {
      type: "object",
      properties: {
        ...softwareBaseProperties,
        additional_data: {
          type: "object",
          properties: {
            overview: {},
            graph_data: {},
            last_sync_date: {},
          },
        },
        sources: { type: "array" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  required: ["application"],
  additionalProperties: false,
};
export const listSoftwareOutputSchema = {
  type: "object" as const,
  properties: {
    application: { type: "array", items: softwareSchema },
  },
};
