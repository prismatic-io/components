export const sendEventDataOutputSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean" },
    uuid: { type: "string", format: "uuid" },
  },
  required: ["success", "uuid"],
};
export const sendMetricsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
  },
  required: ["requestId"],
};
export const sendLogsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
  },
};
export const sendDetailedLogsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
  },
};
