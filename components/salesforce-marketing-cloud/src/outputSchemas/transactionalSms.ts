export const smsDefinitionOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    name: { type: "string" },
    definitionKey: { type: "string" },
    definitionId: { type: "string" },
    description: { type: "string" },
    status: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    modifiedDate: { type: "string", format: "date-time" },
    content: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      additionalProperties: true,
    },
    subscriptions: {
      type: "object",
      properties: {
        shortCode: { type: "string" },
        countryCode: { type: "string" },
        autoAddSubscriber: { type: "boolean" },
        updateSubscriber: { type: "boolean" },
        keyword: { type: "string" },
      },
      additionalProperties: true,
    },
    options: {
      type: "object",
      properties: {
        urlShortenerOptions: {
          type: "object",
          properties: {
            isLinkShorteningEnabled: { type: "boolean" },
            isSubscriberTrackingEnabled: { type: "boolean" },
            shortenerType: { type: "string" },
          },
          additionalProperties: true,
        },
        smsMessageRegulatoryAuthorityTemplateId: { type: "string" },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};
export const listSmsDefinitionsOutputSchema = {
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
export const deleteSmsDefinitionOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    requestId: { type: "string" },
    deletedDefinitionKey: { type: "string" },
  },
  additionalProperties: true,
};
export const sendSmsOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    errorcode: { type: "integer" },
    responses: {
      type: "array",
      items: {
        type: "object",
        properties: {
          errorcode: { type: "integer" },
          message: { type: "string" },
        },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
};
export const sendSmsBatchOutputSchema = {
  type: "object" as const,
  properties: {
    ...sendSmsOutputSchema.properties,
    message: { type: "string" },
  },
  additionalProperties: true,
};
