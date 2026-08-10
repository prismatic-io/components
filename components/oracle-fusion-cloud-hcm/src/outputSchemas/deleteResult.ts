export const deleteResultOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    status: { type: "string", enum: ["DELETED"] },
  },
  required: ["id", "status"],
};
