export const getCurrentUserOutputSchema = {
  type: "object" as const,
  properties: {
    portalId: { type: "integer" },
    timeZone: { type: "string" },
    accountType: {
      type: "string",
      enum: ["APP_DEVELOPER", "DEVELOPER_TEST", "SANDBOX", "STANDARD"],
    },
    companyCurrency: { type: "string" },
    additionalCurrencies: {
      type: "array" as const,
      items: { type: "string" },
    },
    utcOffset: { type: "string" },
    utcOffsetMilliseconds: { type: "integer" },
    uiDomain: { type: "string" },
    dataHostingLocation: { type: "string" },
    user_id: { type: "number" },
    user: { type: "string" },
  },
  required: ["portalId", "timeZone", "accountType"],
};
export const validateConnectionOutputSchema = {
  type: "boolean" as const,
};
export const deleteAllWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};
