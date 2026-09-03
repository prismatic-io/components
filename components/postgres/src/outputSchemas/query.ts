export const queryOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    required: [],
    additionalProperties: true,
  },
};
