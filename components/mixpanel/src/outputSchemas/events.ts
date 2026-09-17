export const importEventsOutputSchema = {
  type: "object" as const,
  properties: {
    code: { type: "integer" },
    num_records_imported: { type: "integer" },
    status: { type: "string" },
  },
  required: ["code", "num_records_imported", "status"],
};
