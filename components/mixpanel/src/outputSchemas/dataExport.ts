export const downloadDataOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      event: { type: "string" },
      properties: {
        type: "object" as const,
        properties: {
          time: { type: "integer" },
          $insert_id: { type: "string" },
          mp_processing_time_ms: { type: "integer" },
        },
        required: [],
        additionalProperties: true,
      },
    },
    required: ["event", "properties"],
  },
};
