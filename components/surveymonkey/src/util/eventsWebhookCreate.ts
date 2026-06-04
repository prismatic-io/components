import type { ActionContext } from "@prismatic-io/spectral";
import { createClient } from "../client";
import type {
  CreateWebhookInput,
  EventsWebhookInputs,
  Webhook,
} from "../types";
import { getBase64FromUrl, generateWebhookName } from "../util";

export const eventsWebhookCreate = async (
  context: ActionContext,
  { connection, eventType, objectType, objectIds }: EventsWebhookInputs,
) => {
  const client = createClient(connection, context.debug.enabled);

  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const stateKey = getBase64FromUrl(webhookUrl);

  const webhookId = context.crossFlowState[stateKey] as string | undefined;

  context.logger.info(`Started Events Webhook Create for ${flowName}`);

  if (webhookId) {
    context.logger.info(`Updating existing webhook ${webhookId}`);

    const updateBody = {
      event_type: eventType,
      object_type: objectType,
      ...(objectIds && objectIds.length > 0 && { object_ids: objectIds }),
    };

    try {
      const { data } = await client.patch<Webhook>(
        `/webhooks/${webhookId}`,
        updateBody,
      );

      context.logger.info(
        `Webhook ${data.id} updated successfully for ${flowName}`,
      );
    } catch (error) {
      context.logger.error(
        `Error updating webhook ${webhookId} for ${flowName}: ${(error as Error).message}`,
      );
      throw error;
    }
  } else {
    
    const name = generateWebhookName(flowName, stateKey);

    const createBody: CreateWebhookInput = {
      name,
      event_type: eventType as CreateWebhookInput["event_type"],
      subscription_url: webhookUrl,
      object_type: objectType as "survey" | "collector",
      ...(objectIds && objectIds.length > 0 && { object_ids: objectIds }),
    };

    try {
      const { data } = await client.post<Webhook>("/webhooks", createBody);

      context.crossFlowState[stateKey] = data.id;
      context.logger.info(
        `Webhook ${data.id} created successfully for ${flowName}`,
      );
    } catch (error) {
      context.logger.error(
        `Error creating webhook for ${flowName}: ${(error as Error).message}`,
      );

      throw error;
    }
  }
};
