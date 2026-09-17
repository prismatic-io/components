export const listSavedFunnelsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      funnel_id: { type: "integer" },
      name: { type: "string" },
    },
    required: ["funnel_id", "name"],
  },
};
export const queryFunnelSavedReportsOutputSchema = {
  type: "object" as const,
  properties: {
    meta: {
      type: "object" as const,
      properties: {
        dates: { type: "array", items: { type: "string" } },
      },
      required: ["dates"],
    },
    data: {
      type: "object" as const,
      additionalProperties: {
        type: "object" as const,
        properties: {
          steps: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                count: { type: "integer" },
                goal: { type: "string" },
                event: { type: "string" },
                step_conv_ratio: { type: "number" },
                overall_conv_ratio: { type: "number" },
                avg_time: { type: ["integer", "null"] },
                avg_time_from_start: { type: "integer" },
                step_label: { type: "string" },
                custom_event: { type: "boolean" },
                custom_event_id: { type: "integer" },
              },
              required: [
                "count",
                "goal",
                "event",
                "step_conv_ratio",
                "overall_conv_ratio",
                "avg_time_from_start",
              ],
            },
          },
          analysis: {
            type: "object" as const,
            properties: {
              completion: { type: "integer" },
              starting_amount: { type: "integer" },
              steps: { type: "integer" },
              worst: { type: "integer" },
            },
            required: ["completion", "starting_amount", "steps", "worst"],
          },
        },
      },
    },
  },
  required: ["meta", "data"],
};
