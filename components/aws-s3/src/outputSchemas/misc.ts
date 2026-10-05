export const getCurrentAccountOutputSchema = {
  type: "object" as const,
  properties: {
    UserId: { type: "string" },
    Account: { type: "string" },
    Arn: { type: "string" },
  },
  required: [],
};
