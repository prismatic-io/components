export const modelOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    model: { type: "string" },
    state: { type: "string", enum: ["base", "manual"] },
    modules: { type: "string" },
    display_name: { type: "string" },
  },
  required: ["id", "name", "model", "state", "modules", "display_name"],
};
export const listModelsOutputSchema = {
  type: "array" as const,
  items: modelOutputSchema,
};
