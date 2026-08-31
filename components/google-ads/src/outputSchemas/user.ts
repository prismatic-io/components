export const inviteUserOutputSchema = {
  type: "object" as const,
  properties: {
    result: {
      type: "object",
      properties: {
        resourceName: { type: "string" },
        multiPartyAuthReview: { type: "string" },
      },
      required: ["resourceName"],
    },
  },
  required: ["result"],
};
