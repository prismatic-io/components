export const emailDefinitionOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    name: { type: "string" },
    definitionKey: { type: "string" },
    definitionId: { type: "string" },
    description: { type: "string" },
    classification: { type: "string" },
    status: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    modifiedDate: { type: "string", format: "date-time" },
    content: { type: "object", additionalProperties: true },
    subscriptions: { type: "object", additionalProperties: true },
    options: { type: "object", additionalProperties: true },
    journey: { type: "object", additionalProperties: true },
  },
  additionalProperties: true,
};
export const listEmailDefinitionsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    definitions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          definitionKey: { type: "string" },
          status: { type: "string" },
          name: { type: "string" },
          createdDate: { type: "string", format: "date-time" },
          modifiedDate: { type: "string", format: "date-time" },
        },
        additionalProperties: true,
      },
    },
    count: { type: "integer" },
    page: { type: "integer" },
    pageSize: { type: "integer" },
  },
  additionalProperties: true,
};
export const deleteEmailDefinitionOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    requestId: { type: "string" },
    deletedDefinitionKey: { type: "string" },
  },
  additionalProperties: true,
};
export const sendEmailOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    errorcode: { type: "integer" },
    responses: { type: "array" },
  },
  additionalProperties: true,
};
export const getEmailSendStatusOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    eventCategoryType: { type: "string" },
    timestamp: { type: "string" },
    compositeId: { type: "string" },
    info: { type: "object", additionalProperties: true },
    statusCode: { type: "integer" },
    statusMessage: { type: "string" },
  },
  additionalProperties: true,
};
