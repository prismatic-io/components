import { connectionInput, secretKey, webhookTopic } from "../common";

export const eventTopicWebhookInputs = {
  secret_key: secretKey,
  connectionInput,
  webhookTopic: {
    ...webhookTopic,
    label: "Event Topic Name",
    required: true,
    comments: "Event that triggers the webhook.",
    collection: "valuelist" as const,
  },
};
