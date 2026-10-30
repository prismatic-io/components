import {
  registeredWebhookSchema,
  webhookSchema,
  webhooksExpirationDateSchema,
} from "./common";

export const refreshWebhookOutputSchema = webhooksExpirationDateSchema;

export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    webhookRegistrationResult: {
      type: "array",
      items: registeredWebhookSchema,
    },
  },
  required: [],
  additionalProperties: true,
};

export const listWebhooksOutputSchema = {
  type: ["object", "array"],
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    nextPage: {
      type: "string",
      format: "uri",
    },
    self: {
      type: "string",
      format: "uri",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
    values: {
      type: "array",
      items: webhookSchema,
    },
  },
  required: [],
  additionalProperties: true,
};
