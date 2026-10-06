export const getAccessibleCustomFieldsOutputSchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          type: { type: "string" },
          type_config: {
            type: "object" as const,
            properties: {
              options: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    id: { type: "string" },
                    label: { type: "string" },
                    color: { type: ["string", "null"] },
                    name: { type: "string" },
                    value: { type: "integer" },
                    type: { type: "string" },
                    orderindex: { type: "integer" },
                  },
                  required: ["id", "color"],
                },
              },
              default: {},
              precision: { type: "integer" },
              currency_type: { type: "string" },
              placeholder: { type: ["string", "null"] },
              end: { type: "integer" },
              start: { type: "integer" },
              count: { type: "integer" },
              code_point: { type: "string" },
              tracking: {
                type: "object" as const,
                properties: {
                  subtasks: { type: "boolean" },
                  checklists: { type: "boolean" },
                  assigned_comments: { type: "boolean" },
                },
                required: ["subtasks", "checklists", "assigned_comments"],
              },
              complete_on: { type: "integer" },
            },
          },
          date_created: { type: "string" },
          hide_from_guests: { type: "boolean" },
          applied_objects: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                object_type: { type: "integer" },
                object_id: { type: "integer" },
              },
              required: ["object_type", "object_id"],
            },
          },
        },
        required: [
          "id",
          "name",
          "type",
          "type_config",
          "date_created",
          "hide_from_guests",
        ],
      },
    },
  },
  required: ["fields"],
};
