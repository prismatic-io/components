export const getCompanyAddonsOutputSchema = {
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
              code: { type: "string" },
              has_trial: { type: "boolean" },
              tier_code: { type: "string" },
            },
          },
        },
      },
    },
  },
};
