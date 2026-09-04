export const changeLifecycleStatusOutputSchema = {
  type: "object" as const,
  properties: {
    change: {
      type: "object",
      properties: {
        guid: { type: "string" },
        number: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    implStatus: {
      type: "object",
      properties: { guid: { type: "string" }, value: { type: "string" } },
    },
    status: {
      type: "string",
      enum: [
        "OPEN",
        "SUBMITTED_FOR_APPROVAL",
        "SUBMITTED",
        "APPROVED",
        "EFFECTIVE",
        "EXPIRED",
        "REJECTED",
        "OPEN_AND_UNLOCKED",
        "OPEN_AND_LOCKED",
        "SUBMITTED_FOR_ROUTING",
        "CANCELED",
        "COMPLETED",
      ],
    },
    comment: { type: "string" },
    administrators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string" },
          fullName: { type: "string" },
          guid: { type: "string" },
        },
      },
    },
  },
};
