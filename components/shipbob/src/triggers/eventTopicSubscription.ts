import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connectionInput,
  overwriteWebhookSettings,
  topicsToSubscribe,
  version,
} from "../inputs";
import type { WebhookData } from "../interfaces/WebhookData";
import {
  getAllPaginatedData,
  getExistingWebhookIds,
  hasRepeatedString,
  webhookPerformFunction,
} from "../util";

export const eventTopicSubscription = trigger({
  display: {
    label: "Event Topic Subscription",
    description: "Get notified when a specific event occurs",
  },
  allowsBranching: false,
  inputs: {
    connectionInput,
    version,
    topicsToSubscribe,
    overwriteWebhookSettings,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: webhookPerformFunction,
  onInstanceDeploy: async (
    context,
    { connectionInput, version, topicsToSubscribe, overwriteWebhookSettings },
  ) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );

    if (hasRepeatedString(topicsToSubscribe))
      throw new Error("Cannot have repeated topics in the subscription list");

    const data = await getAllPaginatedData<WebhookData>(client, "/webhook");

    const webhookUrl = context.webhookUrls[context.flow.name];

    const existingFlowWebhooks = getExistingWebhookIds(webhookUrl, data);

    if (existingFlowWebhooks.length > 0 && !overwriteWebhookSettings)
      throw new Error(
        `Webhook configuration already exists for the flow and overwrite is set to false. No action will be taken.`,
      );

    await Promise.all(
      existingFlowWebhooks.map((id) => client.delete(`/webhook/${id}`)),
    );

    await Promise.all(
      topicsToSubscribe.map((topic) =>
        client.post(`/webhook`, {
          topic,
          subscription_url: webhookUrl,
        }),
      ),
    );
  },

  onInstanceDelete: async (context, { connectionInput, version }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const webhookUrl = context.webhookUrls[context.flow.name];

    const data = await getAllPaginatedData<WebhookData>(client, "/webhook");

    const existingFlowWebhooks = getExistingWebhookIds(webhookUrl, data);

    await Promise.all(
      existingFlowWebhooks.map((id) => client.delete(`/webhook/${id}`)),
    );
  },
});
