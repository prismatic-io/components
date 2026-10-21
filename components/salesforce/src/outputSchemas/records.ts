const restErrorSchema = {
  type: "object" as const,
  properties: {
    statusCode: { type: "string" },
    errorCode: { type: "string" },
    message: { type: "string" },
    fields: { type: "array", items: { type: "string" } },
  },
};
export const createRecordOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    success: { type: "boolean" },
    errors: { type: "array", items: restErrorSchema },
  },
  required: ["success", "errors"],
};
export const updateRecordOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    success: { type: "boolean" },
    errors: { type: "array", items: restErrorSchema },
  },
  required: ["id", "success", "errors"],
};
export const deleteRecordOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    success: { type: "boolean" },
    errors: { type: "array", items: restErrorSchema },
  },
  required: ["id", "success", "errors"],
};
export const upsertRecordOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      id: { type: "string" },
      success: { type: "boolean" },
      errors: { type: "array", items: restErrorSchema },
      created: { type: "boolean" },
    },
    required: ["success", "errors"],
  },
};
export const queryOutputSchema = {
  type: "object" as const,
  properties: {
    totalSize: { type: "integer" },
    done: { type: "boolean" },
    nextRecordsUrl: { type: "string" },
    records: {
      type: "array",
      items: {
        type: "object",
        properties: {
          attributes: {
            type: "object",
            properties: { type: { type: "string" }, url: { type: "string" } },
          },
          Id: { type: "string" },
          Name: { type: "string" },
        },
        required: [],
        additionalProperties: true,
      },
    },
  },
  required: ["totalSize", "done", "records"],
};
