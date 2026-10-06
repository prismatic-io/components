import { webhookSchema } from "./shared";
const webhookEnvelopeSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    webhook: webhookSchema,
  },
  required: ["id", "webhook"],
};
export const createWebhookOutputSchema = webhookEnvelopeSchema;
export const updateWebhookOutputSchema = webhookEnvelopeSchema;
export const getWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    webhooks: { type: "array", items: webhookSchema },
  },
  required: ["webhooks"],
};
