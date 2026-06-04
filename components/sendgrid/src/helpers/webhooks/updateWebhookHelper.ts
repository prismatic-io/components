import type { Client } from "@sendgrid/client/src/client";
import type {
  UpdateWebhookParams,
  WebhookRequestBody,
  WebhookResponse,
} from "../../types";

export const updateWebhookHelper = async (
  client: Client,
  params: UpdateWebhookParams,
): Promise<WebhookResponse> => {
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
  };

  if (params.friendlyName) {
    requestBody.friendly_name = params.friendlyName;
  }

  const [_response, body] = await client.request({
    url: `/v3/user/webhooks/event/settings/${params.webhookId}`,
    method: "PATCH",
    body: requestBody,
  });

  return body as WebhookResponse;
};
