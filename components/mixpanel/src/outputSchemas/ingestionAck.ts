export const ingestionAckOutputSchema = {
  properties: {
    status: { type: "integer" },
    error: { type: "string" },
  },
  required: [],
  additionalProperties: true,
};
