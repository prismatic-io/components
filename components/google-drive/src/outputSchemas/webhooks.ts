import { emptyResponseSchema } from "./common";
const channelSchema = {
  type: "object" as const,
  properties: {
    kind: { type: "string", enum: ["api#channel"] },
    id: { type: "string" },
    resourceId: { type: "string" },
    resourceUri: { type: "string" },
    token: { type: "string" },
    expiration: { type: "string" },
    type: { type: "string" },
    address: { type: "string" },
    payload: { type: "boolean" },
    params: { type: "object", additionalProperties: { type: "string" } },
  },
  required: [],
};
export const createDriveWebhookOutputSchema = channelSchema;
export const createFileWebhookOutputSchema = channelSchema;
export const deleteWebhookOutputSchema = emptyResponseSchema;
