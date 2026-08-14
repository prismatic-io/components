const journeyTriggerSchema = {
  type: "object" as const,
  properties: {
    key: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    eventDefinitionKey: { type: "string" },
    arguments: { type: "object", additionalProperties: true },
  },
  additionalProperties: true,
};
const journeyGoalSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    key: { type: "string" },
    type: { type: "string" },
    description: { type: "string" },
    arguments: { type: "object", additionalProperties: true },
  },
  additionalProperties: true,
};
const journeyActivitySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    outcomes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          next: { type: "string" },
          arguments: { type: "object", additionalProperties: true },
        },
        additionalProperties: true,
      },
    },
    arguments: { type: "object", additionalProperties: true },
  },
  additionalProperties: true,
};
export const createJourneyOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    status: { type: "string" },
    definitionId: { type: "string" },
    workflowApiVersion: { type: "number" },
    createdDate: { type: "string", format: "date-time" },
    modifiedDate: { type: "string", format: "date-time" },
    lastPublishedDate: { type: "string", format: "date-time" },
    triggers: { type: "array" },
    goals: { type: "array" },
    activities: { type: "array" },
  },
  additionalProperties: true,
};
export const getJourneyOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    status: { type: "string" },
    definitionId: { type: "string" },
    version: { type: "number" },
    workflowApiVersion: { type: "number" },
    createdDate: { type: "string", format: "date-time" },
    modifiedDate: { type: "string", format: "date-time" },
    lastPublishedDate: { type: "string", format: "date-time" },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: { name: { type: "string" } },
        additionalProperties: true,
      },
    },
    triggers: { type: "array", items: journeyTriggerSchema },
    goals: { type: "array", items: journeyGoalSchema },
    activities: { type: "array", items: journeyActivitySchema },
  },
  additionalProperties: true,
};
export const updateJourneyOutputSchema = {
  type: "object" as const,
  properties: {
    ...createJourneyOutputSchema.properties,
    version: { type: "number" },
  },
  additionalProperties: true,
};
export const listJourneysOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "number" },
    page: { type: "number" },
    pageSize: { type: "number" },
    links: { type: "object", additionalProperties: true },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...getJourneyOutputSchema.properties,
          stats: { type: "object", additionalProperties: true },
          entryMode: { type: "string" },
          defaults: { type: "object", additionalProperties: true },
          executionMode: { type: "string" },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const exitContactFromJourneyOutputSchema = {
  type: "object" as const,
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          contactKey: { type: "string" },
          definitionKey: { type: "string" },
          status: {
            type: "array",
            items: {
              type: "object",
              properties: {
                version: { type: ["number", "string"] },
                message: { type: "string" },
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
export const fireEntryEventOutputSchema = {
  type: "object" as const,
  properties: {
    eventInstanceId: { type: "string" },
  },
  additionalProperties: true,
};
