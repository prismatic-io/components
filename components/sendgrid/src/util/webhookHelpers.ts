import type { Client } from "@sendgrid/client/src/client";
import type {
  CreateWebhookParams,
  DeleteWebhookParams,
  ToggleSignatureVerificationParams,
  TrackEvents,
  UpdateWebhookParams,
  WebhookRequestBody,
  WebhookResponse,
} from "../types";
export const eventsBuilder = (events: string[]): TrackEvents => {
  const trackEvents: TrackEvents = {
    delivered: false,
    bounce: false,
    deferred: false,
    processed: false,
    dropped: false,
    open: false,
    click: false,
    spamReport: false,
    unsubscribe: false,
    groupUnsubscribe: false,
    groupResubscribe: false,
    accountStatusChange: false,
  };
  events.forEach((event) => {
    switch (event) {
      case "delivered":
        trackEvents.delivered = true;
        break;
      case "bounce":
        trackEvents.bounce = true;
        break;
      case "deferred":
        trackEvents.deferred = true;
        break;
      case "processed":
        trackEvents.processed = true;
        break;
      case "dropped":
        trackEvents.dropped = true;
        break;
      case "open":
        trackEvents.open = true;
        break;
      case "click":
        trackEvents.click = true;
        break;
      case "spamReport":
        trackEvents.spamReport = true;
        break;
      case "unsubscribe":
        trackEvents.unsubscribe = true;
        break;
      case "groupUnsubscribe":
        trackEvents.groupUnsubscribe = true;
        break;
      case "groupResubscribe":
        trackEvents.groupResubscribe = true;
        break;
      case "accountStatusChange":
        trackEvents.accountStatusChange = true;
        break;
    }
  });
  return trackEvents;
};
const buildWebhookRequestBody = (
  params: CreateWebhookParams | UpdateWebhookParams,
): WebhookRequestBody => {
  const requestBody: WebhookRequestBody = {
    enabled: params.enabled,
    url: params.url,
    delivered: params.delivered,
    bounce: params.bounce,
    deferred: params.deferred,
    processed: params.processed,
    dropped: params.dropped,
    open: params.open,
    click: params.click,
    spam_report: params.spamReport,
    unsubscribe: params.unsubscribe,
    group_unsubscribe: params.groupUnsubscribe,
    group_resubscribe: params.groupResubscribe,
    account_status_change: params.accountStatusChange,
  };
  if (params.friendlyName) {
    requestBody.friendly_name = params.friendlyName;
  }
  return requestBody;
};
export const createWebhookHelper = async (
  client: Client,
  params: CreateWebhookParams,
): Promise<WebhookResponse> => {
  const [_response, body] = await client.request({
    url: "/v3/user/webhooks/event/settings",
    method: "POST",
    body: buildWebhookRequestBody(params),
  });
  return body as WebhookResponse;
};
export const updateWebhookHelper = async (
  client: Client,
  params: UpdateWebhookParams,
): Promise<WebhookResponse> => {
  const [_response, body] = await client.request({
    url: `/v3/user/webhooks/event/settings/${params.webhookId}`,
    method: "PATCH",
    body: buildWebhookRequestBody(params),
  });
  return body as WebhookResponse;
};
export const deleteWebhookHelper = async (
  client: Client,
  params: DeleteWebhookParams,
) => {
  await client.request({
    url: `/v3/user/webhooks/event/settings/${params.webhookId}`,
    method: "DELETE",
  });
  return {
    success: true,
    message: "Webhook deleted successfully",
  };
};
export const toggleSignatureVerificationHelper = async (
  client: Client,
  params: ToggleSignatureVerificationParams,
): Promise<WebhookResponse> => {
  const [_response, body] = await client.request({
    url: `/v3/user/webhooks/event/settings/signed/${params.webhookId}`,
    method: "PATCH",
    body: {
      enabled: params.enabled,
    },
  });
  return body as WebhookResponse;
};
