export const exportCRMDataOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    links: {
      type: "object" as const,
      additionalProperties: { type: "string" },
    },
  },
  required: ["id"],
};
