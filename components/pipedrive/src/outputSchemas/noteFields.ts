export const getNoteFieldsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              key: { type: "string" },
              name: { type: "string" },
              field_type: { type: "string" },
              active_flag: { type: "boolean" },
              edit_flag: { type: "boolean" },
              mandatory_flag: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
