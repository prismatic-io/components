export const updateAssetTagsOutputSchema = {
  type: "object" as const,
  properties: {
    ServiceResponse: {
      type: "object",
      properties: {
        responseCode: { type: "string" },
        count: { type: "string" },
        data: {
          type: "object",
          properties: {
            Asset: {
              type: "object",
              properties: {
                id: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
