export const getEmployeeTableOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      employeeId: { type: "string" },
    },
    required: [],
    additionalProperties: true,
  },
};

export const getTabularFieldsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      alias: { type: "string" },
      fields: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            alias: { type: "string" },
            type: { type: "string" },
          },
        },
      },
    },
  },
};
