const webhookSummaryProperties = {
  id: { type: "string" },
  name: { type: "string" },
  created: { type: "string" },
  lastSent: { type: ["string", "null"] },
  url: { type: "string" },
};

const fieldReferenceSchema = {
  type: "object",
  properties: {
    id: { type: ["integer", "string"] },
    name: { type: "string" },
  },
};

export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    ...webhookSummaryProperties,
    monitorFields: {
      type: ["array", "null"],
      items: { type: "string" },
    },
    postFields: {
      type: "object",
      additionalProperties: { type: "string" },
    },
    format: { type: "string", enum: ["json", "form-encoded"] },
    includeCompanyDomain: { type: "boolean" },
    events: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "employee_with_fields.updated",
          "employee_with_fields.created",
          "employee_with_fields.deleted",
          "company-integrations.updated",
          "employee.created",
          "employee.updated",
          "employee.deleted",
          "company.updated",
          "company.deleted",
        ],
      },
    },
    privateKey: { type: "string" },
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          error: { type: "string" },
          unknownFields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: ["integer", "string", "null"] },
                name: { type: "string" },
              },
            },
          },
          monitorFields: { type: "array", items: fieldReferenceSchema },
          duplicatePostString: { type: "array", items: { type: "string" } },
          postFields: { type: "array", items: fieldReferenceSchema },
        },
      },
    },
  },
  required: [],
  additionalProperties: true,
};

export const listWebhooksOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: webhookSummaryProperties,
  },
};

export const deleteWebhookByIdOutputSchema = {
  type: "string" as const,
};
