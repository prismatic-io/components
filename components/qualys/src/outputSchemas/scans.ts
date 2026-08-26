export const launchScanOutputSchema = {
  type: "object" as const,
  properties: {
    scanRef: { type: "string" },
    status: { type: "string" },
    message: { type: "string" },
  },
};
export const listScansOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      ref: { type: "string" },
      title: { type: "string" },
      type: { type: "string" },
      state: { type: "string" },
      launchDatetime: { type: "string" },
      duration: { type: "string" },
      target: { type: "string" },
      processed: { type: "string" },
      optionProfile: { type: ["string", "null"] },
    },
  },
};
