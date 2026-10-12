export const getUserConnectionsOutputSchema = {
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
              id: { type: "string" },
              user_id: { type: "integer" },
              type: { type: "string" },
              connected: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
