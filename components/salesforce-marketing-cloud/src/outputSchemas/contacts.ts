export const createContactOutputSchema = {
  type: "object" as const,
  properties: {
    operationStatus: { type: "string" },
    rowsAffetcted: { type: "number" },
    contactKey: { type: "string" },
    contactId: { type: "number" },
    contactTypeID: { type: "number" },
    isNewContactKey: { type: "boolean" },
    requestServiceMessageID: { type: "string" },
    hasErrors: { type: "boolean" },
    resultMessages: { type: "array" },
    serviceMessageID: { type: "string" },
  },
  additionalProperties: true,
};
export const deleteContactOutputSchema = {
  type: "object" as const,
  properties: {
    operationInitiated: { type: "boolean" },
    operationID: { type: "integer" },
    requestServiceMessageID: { type: "string" },
    resultMessages: { type: "array" },
    serviceMessageID: { type: "string" },
  },
  additionalProperties: true,
};
export const getContactOutputSchema = {
  type: ["object", "null"],
  properties: {
    contactID: { type: "integer" },
    contactType: { type: "string" },
    contactKey: { type: "string" },
    contactStatus: { type: "string" },
  },
  additionalProperties: true,
};
export const getContactSchemaOutputSchema = {
  type: "object" as const,
  properties: {
    links: {
      type: "object",
      properties: {
        self: {
          type: "object",
          properties: { href: { type: "string" } },
          additionalProperties: true,
        },
      },
      additionalProperties: true,
    },
    page: { type: "integer" },
    pageSize: { type: "integer" },
    count: { type: "integer" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          enterpriseID: { type: "integer" },
          availableBusinessUnits: { type: "array", items: { type: "integer" } },
          version: { type: "integer" },
          schemaType: { type: "string" },
          links: {
            type: "object",
            properties: {
              self: {
                type: "object",
                properties: { href: { type: "string" } },
                additionalProperties: true,
              },
              attributeGroups: {
                type: "object",
                properties: { href: { type: "string" } },
                additionalProperties: true,
              },
              attributeSetDefinitions: {
                type: "object",
                properties: { href: { type: "string" } },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
    requestServiceMessageID: { type: "string" },
    resultMessages: { type: "array" },
    serviceMessageID: { type: "string" },
  },
  additionalProperties: true,
};
export const searchContactsByEmailOutputSchema = {
  type: "object" as const,
  properties: {
    channelAddressResponseEntities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          channelAddress: { type: "string" },
          contactKeyDetails: {
            type: "array",
            items: {
              type: "object",
              properties: {
                contactKey: { type: "string" },
                createDate: { type: "string", format: "date-time" },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
    requestServiceMessageID: { type: "string" },
    responseDateTime: { type: "string" },
    resultMessages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          message: { type: "string" },
          resultClass: { type: "string" },
          resultCode: { type: "string" },
          resultType: { type: "string" },
        },
        additionalProperties: true,
      },
    },
    serviceMessageID: { type: "string" },
  },
  additionalProperties: true,
};
