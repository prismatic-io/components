import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { eventsTriggerExamplePayload } from "../examplePayloads";
import { eventsTriggerInputs } from "../inputs";
import type { EventsWebhookFlowState } from "../types";
import {
  getEventsWebhookStateKey,
  removeEventsWebhooks,
  upsertEventsWebhook,
  validateContentfulWebhookRequest,
} from "../util";
export const eventsTrigger = trigger({
  display: {
    label: "Event Subscription",
    description:
      "Receive event notifications from Contentful. Automatically creates and manages a webhook subscription for selected topics when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: async (context, payload, { signingSecret }) => {
    validateContentfulWebhookRequest(payload, {
      signingSecret,
      isSimulatedTestExecution: context.isSimulatedTestExecution,
      flowWebhookUrl: context.webhookUrls[context.flow.name],
    });
    return { payload };
  },
  inputs: eventsTriggerInputs,
  examplePayload: eventsTriggerExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: async (context, { connection, spaceId, topics }) => {
      const stateKey = getEventsWebhookStateKey(context.flow.name);
      const client = createClient(connection, context);
      const state = await upsertEventsWebhook(client, {
        spaceId,
        webhookUrl: context.webhookUrls[context.flow.name],
        webhookName: `Events Trigger - ${context.flow.name}`,
        topics: topics ?? [],
        previousState: context.crossFlowState[stateKey] as
          | EventsWebhookFlowState
          | undefined,
        log: (message) => context.logger.info(message),
      });
      return {
        crossFlowState: { ...context.crossFlowState, [stateKey]: state },
      };
    },
    delete: async (context, { connection, spaceId }) => {
      const stateKey = getEventsWebhookStateKey(context.flow.name);
      const client = createClient(connection, context);
      const removed = await removeEventsWebhooks(client, {
        spaceId,
        webhookUrl: context.webhookUrls[context.flow.name],
        previousState: context.crossFlowState[stateKey] as
          | EventsWebhookFlowState
          | undefined,
        log: (message) => context.logger.info(message),
      });
      context.logger.info(`Removed ${removed} webhook(s) for this flow.`);
      const { [stateKey]: _removed, ...crossFlowState } =
        context.crossFlowState;
      return { crossFlowState };
    },
  },
});
