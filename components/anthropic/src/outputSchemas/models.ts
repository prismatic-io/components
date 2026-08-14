const capabilitySupportSchema = {
  type: "object",
  properties: {
    supported: { type: "boolean" },
  },
  required: ["supported"],
};
const nullableCapabilitySupportSchema = {
  type: ["object", "null"],
  properties: {
    supported: { type: "boolean" },
  },
  required: ["supported"],
};
export const getModelOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["model"] },
    display_name: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    max_input_tokens: { type: ["number", "null"] },
    max_tokens: { type: ["number", "null"] },
    capabilities: {
      type: ["object", "null"],
      properties: {
        batch: capabilitySupportSchema,
        citations: capabilitySupportSchema,
        code_execution: capabilitySupportSchema,
        image_input: capabilitySupportSchema,
        pdf_input: capabilitySupportSchema,
        structured_outputs: capabilitySupportSchema,
        context_management: {
          type: "object",
          properties: {
            supported: { type: "boolean" },
            clear_thinking_20251015: nullableCapabilitySupportSchema,
            clear_tool_uses_20250919: nullableCapabilitySupportSchema,
            compact_20260112: nullableCapabilitySupportSchema,
          },
          required: [
            "supported",
            "clear_thinking_20251015",
            "clear_tool_uses_20250919",
            "compact_20260112",
          ],
        },
        effort: {
          type: "object",
          properties: {
            supported: { type: "boolean" },
            low: capabilitySupportSchema,
            medium: capabilitySupportSchema,
            high: capabilitySupportSchema,
            max: capabilitySupportSchema,
            xhigh: nullableCapabilitySupportSchema,
          },
          required: ["supported", "low", "medium", "high", "max", "xhigh"],
        },
        thinking: {
          type: "object",
          properties: {
            supported: { type: "boolean" },
            types: {
              type: "object",
              properties: {
                adaptive: capabilitySupportSchema,
                enabled: capabilitySupportSchema,
              },
              required: ["adaptive", "enabled"],
            },
          },
          required: ["supported", "types"],
        },
      },
      required: [
        "batch",
        "citations",
        "code_execution",
        "context_management",
        "effort",
        "image_input",
        "pdf_input",
        "structured_outputs",
        "thinking",
      ],
    },
  },
  required: ["id", "type", "display_name", "created_at"],
};
export const listModelsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: getModelOutputSchema },
    first_id: { type: ["string", "null"] },
    has_more: { type: "boolean" },
    last_id: { type: ["string", "null"] },
  },
  required: ["data", "first_id", "has_more", "last_id"],
};
