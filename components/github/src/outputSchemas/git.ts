export const gitCreateBlobOutputSchema = {
  type: "object" as const,
  properties: {
    url: { type: "string", format: "uri" },
    sha: { type: "string" },
  },
  required: ["url", "sha"],
};
export const gitRefOutputSchema = {
  type: "object" as const,
  properties: {
    ref: { type: "string" },
    node_id: { type: "string" },
    url: { type: "string", format: "uri" },
    object: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        sha: { type: "string" },
        url: { type: "string", format: "uri" },
      },
      required: ["type", "sha", "url"],
    },
  },
  required: ["ref", "node_id", "url", "object"],
};
export const gitCreateTreeOutputSchema = {
  type: "object" as const,
  properties: {
    sha: { type: "string" },
    url: { type: "string", format: "uri" },
    truncated: { type: "boolean" },
    tree: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          path: { type: "string" },
          mode: { type: "string" },
          type: { type: "string" },
          sha: { type: "string" },
          size: { type: "integer" },
          url: { type: "string", format: "uri" },
        },
        required: ["path", "mode", "type", "sha"],
      },
    },
  },
  required: ["sha", "url", "truncated", "tree"],
};
