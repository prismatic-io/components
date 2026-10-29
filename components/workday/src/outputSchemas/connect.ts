import { idDescriptorReferenceSchema, instanceReferenceSchema } from "./shared";

export const emailDetailSchema = {
  type: "object" as const,
  properties: {
    subject: {
      type: "string",
    },
    replyTo: {
      type: "string",
    },
    name: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
  required: ["body", "subject"],
};

export const pushDetailSchema = {
  type: "object" as const,
  properties: {
    redirectURL: {
      type: "string",
    },
    message: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  required: ["message"],
};

export const messageTemplateDetailSchema = {
  type: "object" as const,
  properties: {
    createdBy: instanceReferenceSchema,
    emailDetail: emailDetailSchema,
    lastUpdated: {
      type: "string",
      format: "date",
    },
    pushDetail: pushDetailSchema,
    usageCount: {
      type: "integer",
    },
    createdOn: {
      type: "string",
      format: "date",
    },
    notificationType: instanceReferenceSchema,
    name: {
      type: "string",
    },
    lastUpdatedBy: instanceReferenceSchema,
    referenceID: {
      type: "string",
    },
    inactive: {
      type: "boolean",
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  required: ["name", "notificationType"],
};

export const getMessageTemplateByIdOutputSchema = messageTemplateDetailSchema;

export const listMessageTemplatesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: messageTemplateDetailSchema,
    },
  },
  items: messageTemplateDetailSchema,
  required: [],
  additionalProperties: true,
};

export const postMessageTemplatesOutputSchema = messageTemplateDetailSchema;

export const sendMessageOutputSchema = {
  type: "object" as const,
  properties: {
    emailDetail: emailDetailSchema,
    recipients: {
      type: "object" as const,
      properties: {
        contacts: {
          type: "array",
          items: idDescriptorReferenceSchema,
        },
      },
    },
    pushDetail: pushDetailSchema,
    notificationType: instanceReferenceSchema,
    messageTemplate: instanceReferenceSchema,
    senderOverride: instanceReferenceSchema,
    commID: instanceReferenceSchema,
  },
};

export const updateMessageTemplateByIdOutputSchema =
  messageTemplateDetailSchema;
