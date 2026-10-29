import type { Element } from "@prismatic-io/spectral";
import type {
  Webhook,
  WebhookMutationResult,
  WebhookResponse,
  WebhooksListResponse,
} from "../types";

const webhookExample: Webhook = {
  id: 1,
  name: "New Computer Notifier",
  enabled: true,
  url: "https://example.com/webhook",
  content_type: "application/json",
  event: "ComputerAdded",
  connection_timeout: 5,
  read_timeout: 2,
  authentication_type: "NONE",
};

export const getWebhookExamplePayload: { data: WebhookResponse } = {
  data: { webhook: webhookExample },
};

export const createWebhookExamplePayload: { data: WebhookMutationResult } = {
  data: { id: 1 },
};

export const updateWebhookExamplePayload: { data: WebhookMutationResult } = {
  data: { id: 1 },
};

export const listWebhooksExamplePayload: { data: WebhooksListResponse } = {
  data: {
    webhooks: [{ id: 1, name: "New Computer Notifier" }],
  },
};

export const deleteWebhookExamplePayload: { data: string } = {
  data: "Successfully deleted webhook 1",
};

export const deleteInstancedWebhooksExamplePayload: {
  data: { webhooksDeleted: number };
} = {
  data: { webhooksDeleted: 1 },
};

export const selectWebhookExamplePayload: { result: Element[] } = {
  result: [{ key: "1", label: "New Computer Notifier" }],
};
