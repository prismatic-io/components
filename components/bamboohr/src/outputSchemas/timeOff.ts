export const getTimeOffRequestsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      employeeId: { type: "string" },
      name: { type: "string" },
      start: { type: "string", format: "date" },
      end: { type: "string", format: "date" },
      created: { type: "string", format: "date" },
      updated: { type: ["string", "null"], format: "date-time" },
      status: {
        type: "object",
        properties: {
          lastChanged: { type: "string", format: "date" },
          lastChangedByUserId: { type: "string" },
          status: { type: "string" },
        },
      },
      type: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          icon: { type: "string" },
        },
      },
      amount: {
        type: "object",
        properties: {
          unit: { type: "string", enum: ["hours", "days"] },
          amount: { type: "number" },
        },
      },
      actions: {
        type: "object",
        properties: {
          view: { type: "boolean" },
          edit: { type: "boolean" },
          cancel: { type: "boolean" },
          approve: { type: "boolean" },
          deny: { type: "boolean" },
          bypass: { type: "boolean" },
        },
      },
      dates: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      notes: {
        type: "object",
        properties: {
          employee: { type: "string" },
          manager: { type: "string" },
        },
      },
    },
  },
};

export const whosOutOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      id: { type: "integer" },
      type: { type: "string", enum: ["timeOff", "holiday"] },
      employeeId: { type: "integer" },
      name: { type: "string" },
      start: { type: "string", format: "date" },
      end: { type: "string", format: "date" },
    },
  },
};
