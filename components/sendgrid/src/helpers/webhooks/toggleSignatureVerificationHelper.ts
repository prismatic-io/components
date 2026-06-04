import type { Client } from "@sendgrid/client/src/client";
import type {
  ToggleSignatureVerificationParams,
  WebhookResponse,
} from "../../types";

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
