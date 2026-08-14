export const createAutomationOutputSchema = {
  type: "object" as const,
  properties: {
    categoryId: { type: "integer" },
    createdByName: { type: "string" },
    createdDate: { type: "string" },
    description: { type: "string" },
    id: { type: "string" },
    key: { type: "string" },
    legacyId: { type: "string" },
    lastSavedByName: { type: "string" },
    name: { type: "string" },
    statusId: { type: "integer" },
    updateInProgress: { type: "boolean" },
    startSource: {
      type: "object",
      properties: {
        typeId: { type: "integer" },
        automationTrigger: { type: "object", additionalProperties: true },
        fileDrop: { type: "object", additionalProperties: true },
        schedule: { type: "object", additionalProperties: true },
      },
      additionalProperties: true,
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          annotation: { type: "string" },
          stepNumber: { type: "integer" },
          activities: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                activityObjectId: { type: "string" },
                objectTypeId: { type: "integer" },
                displayOrder: { type: "integer" },
                serializedObject: { type: "string" },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const getAutomationOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    key: { type: "string" },
    typeId: { type: "integer" },
    type: { type: "string" },
    statusId: { type: "integer" },
    categoryId: { type: "integer" },
    lastRunTime: { type: "string" },
    status: {
      type: "string",
      enum: [
        "AwaitingTrigger",
        "Building",
        "BuildingError",
        "Error",
        "InactiveTrigger",
        "Initialized",
        "PausedExecution",
        "PausedSchedule",
        "Ready",
      ],
    },
    schedule: {
      type: "object",
      properties: {
        scheduleStatus: { type: "string", enum: ["none"] },
      },
      additionalProperties: true,
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          step: { type: "integer" },
          activities: { type: "array" },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const listAutomationsOutputSchema = {
  type: "object" as const,
  properties: {
    page: { type: "integer" },
    pageSize: { type: "integer" },
    count: { type: "integer" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          key: { type: "string" },
          categoryId: { type: "integer" },
          lastRunTime: { type: "string" },
          lastRunInstanceId: { type: "string" },
          statusId: { type: "integer" },
          status: {
            type: "string",
            enum: [
              "AwaitingTrigger",
              "Building",
              "BuildingError",
              "Error",
              "InactiveTrigger",
              "Initialized",
              "PausedExecution",
              "PausedSchedule",
              "Ready",
              "Running",
              "Scheduled",
              "Stopped",
            ],
          },
          type: { type: "string" },
          typeId: { type: "integer" },
          schedule: { type: "object", additionalProperties: true },
          automationTrigger: { type: "object", additionalProperties: true },
          fileTrigger: { type: "object", additionalProperties: true },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const executeAutomationActivitiesOutputSchema = {
  type: "string" as const,
};
