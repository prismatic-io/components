export const getCurrenciesOutputSchema = {
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
              code: { type: "string" },
              name: { type: "string" },
              decimal_points: { type: "integer" },
              symbol: { type: "string" },
              active_flag: { type: "boolean" },
              is_custom_flag: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
