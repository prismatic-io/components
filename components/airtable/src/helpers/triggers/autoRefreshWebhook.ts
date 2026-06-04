import { needsRefresh } from "../../util";
import type { AutoRefreshWebhookParams } from "../../interfaces";

export const autoRefreshWebhook = async ({
  client,
  baseId,
  webhookId,
  expirationTime,
  logger,
  debug,
}: AutoRefreshWebhookParams): Promise<string> => {
  if (needsRefresh(expirationTime)) {
    if (debug) {
      logger.info(`Webhook expiring soon (${expirationTime}), refreshing...`);
    }

    try {
      const { data: refreshData } = await client.post(
        `/v0/bases/${baseId}/webhooks/${webhookId}/refresh`,
      );

      if (debug) {
        logger.info(
          `Webhook expiration refreshed (new expiration: ${refreshData.expirationTime})`,
        );
      }
      return refreshData.expirationTime;
    } catch (e) {
      const error = e as Error;
      if (debug) {
        logger.error(`Failed to refresh webhook: ${error.message}`);
      }
      return expirationTime;
    }
  }
  return expirationTime;
};
