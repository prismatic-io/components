import type { WebhookExistsParams } from "../../interfaces";
import type { ListWebhookPayloadsResponse } from "../../interfaces";

export const webhookExists = async ({
  client,
  baseId,
  webhookId,
}: WebhookExistsParams): Promise<boolean> => {
  try {
    await client.get<ListWebhookPayloadsResponse>(
      `/v0/bases/${baseId}/webhooks/${webhookId}/payloads`,
    );
    return true;
  } catch (e) {
    const error = e as Error;
    if (error.message.includes("404")) {
      return false;
    }
    throw new Error(`Failed to check if webhook exists: ${error.message}`);
  }
};
