import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  webhookCustomHeaders,
  webhookName,
  webhookPayload,
} from "../inputs";











export const webhook = trigger({
  display: {
    label: "Alert Notification Events",
    description:
      "Receive Datadog monitor alert notifications via webhook. Automatically registers a webhook in Datadog on deploy and removes it on delete.",
  },
  inputs: {
    connection,
    webhookName,
    webhookPayload,
    webhookCustomHeaders,
  },
  perform: async (context, payload, params) => {
    return Promise.resolve({ payload });
  },
  onInstanceDeploy: async (
    context,
    { connection, webhookName, webhookPayload, webhookCustomHeaders },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const webhookUrl = context.webhookUrls.Webhook;

    await client.post("/api/v1/integration/webhooks/configuration/webhooks", {
      name: webhookName,
      url: webhookUrl,
      encode_as: "json",
      payload: webhookPayload,
      custom_headers: webhookCustomHeaders,
    });
    context.logger.info(
      `Registered Datadog webhook "${webhookName}" pointing to ${webhookUrl}`,
    );
  },
  onInstanceDelete: async (context, { connection, webhookName }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(
      `/api/v1/integration/webhooks/configuration/webhooks/${encodeURIComponent(webhookName)}`,
    );
    context.logger.info(`Deleted Datadog webhook "${webhookName}".`);
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
