import { connectionInput, webhookTopic } from "../common";
import { postUrl, webhookFormat } from "./common";

export const createWebhookInputs = {
  shopifyConnection: connectionInput,
  webhookTopic,
  postUrl,
  webhookFormat,
};
