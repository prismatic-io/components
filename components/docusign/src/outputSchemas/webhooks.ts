import {
  connectConfigResultsSchema,
  connectCustomConfigurationSchema,
} from "./definitions";

export const createWebhookOutputSchema = connectCustomConfigurationSchema;

export const listWebhooksOutputSchema = connectConfigResultsSchema;

export const getWebhookOutputSchema = connectConfigResultsSchema;

export const updateWebhookOutputSchema = connectCustomConfigurationSchema;

export const deleteAllInstancedWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    deletedWebhooks: { type: "number" },
  },
  required: ["deletedWebhooks"],
};
