export const responseEnvelopeSchema = {
  type: "object" as const,
  properties: {
    responseCode: { type: "number" },
    responseMessage: { type: "string" },
  },
  required: ["responseCode"],
};

export const reportIssueSchema = {
  type: "object" as const,
  properties: {
    reason: { type: "string" },
    reportID: { type: "string" },
  },
};

export const emailsByIdSchema = {
  type: "object" as const,
  additionalProperties: {
    type: "array",
    items: { type: "string", format: "email" },
  },
};
