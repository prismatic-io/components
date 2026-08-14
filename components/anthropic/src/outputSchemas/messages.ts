export const chatOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["message"] },
    role: { type: "string", enum: ["assistant"] },
    model: { type: "string" },
    content: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["text"] },
          text: { type: "string" },
        },
        required: ["type", "text"],
      },
    },
    stop_reason: {
      type: ["string", "null"],
      enum: [
        "end_turn",
        "max_tokens",
        "stop_sequence",
        "tool_use",
        "pause_turn",
        "refusal",
        "model_context_window_exceeded",
        null,
      ],
    },
    stop_sequence: { type: ["string", "null"] },
    usage: {
      type: "object",
      properties: {
        input_tokens: { type: "number" },
        output_tokens: { type: "number" },
        cache_creation_input_tokens: { type: ["number", "null"] },
        cache_read_input_tokens: { type: ["number", "null"] },
        cache_creation: {
          type: ["object", "null"],
          properties: {
            ephemeral_5m_input_tokens: { type: "number" },
            ephemeral_1h_input_tokens: { type: "number" },
          },
        },
        output_tokens_details: {
          type: ["object", "null"],
          properties: {
            thinking_tokens: { type: "number" },
          },
        },
        inference_geo: { type: ["string", "null"] },
        service_tier: {
          type: ["string", "null"],
          enum: ["standard", "priority", "batch", null],
        },
      },
      required: ["input_tokens", "output_tokens"],
    },
  },
  required: [
    "id",
    "type",
    "role",
    "model",
    "content",
    "stop_reason",
    "stop_sequence",
    "usage",
  ],
};
export const countTokensOutputSchema = {
  type: "object" as const,
  properties: {
    input_tokens: { type: "number" },
  },
  required: ["input_tokens"],
};
