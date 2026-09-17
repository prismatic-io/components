export const createOnboardingRequestOutputSchema = {
  type: "object" as const,
  properties: {
    onboarding_request: {
      type: "object",
      properties: {
        id: { type: "number" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        status: { type: "number" },
        subject: { type: "string" },
        ticket_id: { type: ["number", "null"] },
        actors: {
          type: "object",
          additionalProperties: {
            type: "object",
            properties: {
              email: { type: "string", format: "email" },
              name: { type: "string" },
              response_status: {},
            },
          },
        },
        fields: { type: "object" },
        lookup_values: { type: "object" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  required: ["onboarding_request"],
  additionalProperties: false,
};
export const viewOnboardingRequestOutputSchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          placeholder: { type: "string" },
          label: { type: "string" },
          name: { type: "string" },
          position: { type: "number" },
          required: { type: "boolean" },
          default: { type: "boolean" },
          field_type: {
            type: "string",
            enum: [
              "custom_text",
              "custom_date",
              "custom_lookup_bigint",
              "custom_dropdown",
              "custom_url",
              "custom_paragraph",
              "custom_decimal",
              "custom_checkbox",
              "nested_field",
              "custom_multi_select_dropdown",
              "custom_multi_lookup",
            ],
          },
          data_source: { type: "number" },
          choices: { type: "array", items: { type: "string" } },
          nested_fields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                label: { type: "string" },
                name: { type: "string" },
                level: { type: "number" },
                required: { type: "boolean" },
                deleted: { type: "boolean" },
                parent_id: { type: "number" },
              },
            },
          },
          nested_field_choices: { type: "object" },
        },
        required: ["name", "field_type"],
      },
    },
  },
  required: ["fields"],
};
