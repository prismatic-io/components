import type { ActionLogger } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { WEBHOOKS_CONFIGURATION_PATH } from "../constants";
import type { WebhooksIntegration } from "../types";
export const webhookConfigurationPath = (webhookName: string): string =>
  `${WEBHOOKS_CONFIGURATION_PATH}/${encodeURIComponent(webhookName)}`;
const isNotFoundError = (error: unknown): boolean =>
  (
    error as {
      response?: {
        status?: number;
      };
    }
  )?.response?.status === 404;
export const findWebhook = async (
  client: HttpClient,
  webhookName: string,
): Promise<WebhooksIntegration | undefined> => {
  try {
    const { data } = await client.get<WebhooksIntegration>(
      webhookConfigurationPath(webhookName),
    );
    return data;
  } catch (error) {
    if (isNotFoundError(error)) return undefined;
    throw error;
  }
};
export const deleteOwnedWebhook = async (
  client: HttpClient,
  logger: ActionLogger,
  webhookName: string,
  webhookUrl: string | undefined,
): Promise<void> => {
  if (!webhookUrl) {
    logger.warn(
      `Skipped deleting Datadog webhook "${webhookName}": the URL of this flow is unknown.`,
    );
    return;
  }
  const existing = await findWebhook(client, webhookName);
  if (!existing) return;
  if (existing.url !== webhookUrl) {
    logger.warn(
      `Skipped deleting Datadog webhook "${webhookName}": it points to a different URL.`,
    );
    return;
  }
  await client.delete(webhookConfigurationPath(webhookName));
  logger.info(`Deleted Datadog webhook "${webhookName}".`);
};
