import type { ActionContext } from "@prismatic-io/spectral";
import { createClient } from "../client";
import type { EventsWebhookInputs } from "../types";
import { getBase64FromUrl } from "../util";





export const eventsWebhookDelete = async (
  context: ActionContext,
  { connection }: EventsWebhookInputs,
) => {
  const client = createClient(connection, context.debug.enabled);

  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const stateKey = getBase64FromUrl(webhookUrl);

  const webhookId = context.crossFlowState[stateKey] as string | undefined;

  context.logger.info(`Started Events Webhook Delete for ${flowName}`);

  if (webhookId) {
    context.logger.info(`Deleting webhook ${webhookId}`);

    try {
      await client.delete(`/webhooks/${webhookId}`);

      
      delete context.crossFlowState[stateKey];

      context.logger.info(
        `Webhook ${webhookId} deleted successfully for ${flowName}`,
      );
    } catch (error) {
      context.logger.error(
        `Error deleting webhook ${webhookId} for ${flowName}: ${(error as Error).message}`,
      );
      throw error;
    }
  } else {
    context.logger.info(`No webhook found to delete for ${flowName}`);
  }
};
