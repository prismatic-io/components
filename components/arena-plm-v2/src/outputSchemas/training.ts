export const trainingItemSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revisionNumber: { type: "string" },
        revisionStatus: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
  },
};
export const listTrainingPlanItemsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: trainingItemSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const trainingRecordSchema = {
  type: "object" as const,
  properties: {
    item: {
      type: "object",
      properties: {
        guid: { type: "string" },
        name: { type: "string" },
        number: { type: "string" },
        revisionNumber: { type: "string" },
        revisionStatus: { type: "string" },
        url: {
          type: "object",
          properties: { api: { type: "string" }, app: { type: "string" } },
        },
      },
    },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    guid: { type: "string" },
    signedDateTime: { type: "string" },
    dueDate: { type: "string" },
    requiresUserAction: { type: "boolean" },
  },
};
export const listTrainingPlanRecordsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: trainingRecordSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const trainingShortSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    number: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    daysToComplete: { type: "integer", format: "int32" },
    creationDateTime: { type: "string" },
    status: { type: "string", enum: ["OPEN", "CLOSED"] },
    manager: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    creator: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const listTrainingPlansOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: trainingShortSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const trainingUserSchema = {
  type: "object" as const,
  properties: {
    guid: { type: "string" },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
    dueDate: { type: "string" },
  },
};
export const listTrainingPlanUsersOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: trainingUserSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const removeFileFromTrainingPlanOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeItemFromTrainingPlanOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
export const removeQualityFromTrainingPlanOutputSchema = {
  type: "object" as const,
  properties: { success: { type: "boolean" }, message: { type: "string" } },
  required: ["success", "message"],
};
