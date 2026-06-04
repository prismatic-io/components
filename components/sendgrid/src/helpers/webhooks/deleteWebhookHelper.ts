import type { Client } from "@sendgrid/client/src/client";
import type { DeleteWebhookParams } from "../../types";

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
