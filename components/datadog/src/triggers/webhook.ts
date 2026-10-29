import { trigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  DEFAULT_WEBHOOK_ENCODE_AS,
  WEBHOOK_STATE_KEY_PREFIX,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import type { RegisteredWebhookState } from "../types";
import {
  deleteOwnedWebhook,
  findWebhook,
  webhookConfigurationPath,
} from "../utils";

export const webhook = trigger({
  display: {
    label: "Alert Notification Events",
    description:
      "Receive Datadog monitor alert notifications via webhook. Automatically registers a webhook in Datadog on deploy and removes it on delete.",
  },
  inputs: webhookInputs,
  examplePayload: webhookExamplePayload,
  perform: async (context, payload, params) => {
    return Promise.resolve({ payload });
  },
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, webhookName, webhookPayload, webhookCustomHeaders },
    ) => {
      const client = createClient(connection);
      const webhookUrl = context.webhookUrls[context.flow.name];
      const stateKey = `${WEBHOOK_STATE_KEY_PREFIX}:${context.flow.stableId}`;
      const previous = context.crossFlowState[stateKey] as
        | RegisteredWebhookState
        | undefined;

      if (previous && previous.webhookName !== webhookName) {
        await deleteOwnedWebhook(
          client,
          context.logger,
          previous.webhookName,
          previous.webhookUrl,
        );
      }

      const body = {
        url: webhookUrl,
        encode_as: DEFAULT_WEBHOOK_ENCODE_AS,
        payload: webhookPayload,
        custom_headers: webhookCustomHeaders,
      };
      const existing = await findWebhook(client, webhookName);
      if (existing && existing.url !== webhookUrl) {
        throw new Error(
          `A Datadog webhook named "${webhookName}" already exists and points to a different URL. Choose a unique Webhook Name.`,
        );
      }
      if (existing) {
        await client.put(webhookConfigurationPath(webhookName), body);
      } else {
        await client.post(WEBHOOKS_CONFIGURATION_PATH, {
          name: webhookName,
          ...body,
        });
      }
      context.logger.info(
        `Registered Datadog webhook "${webhookName}" pointing to ${webhookUrl}`,
      );

      const registered: RegisteredWebhookState = { webhookName, webhookUrl };
      return {
        crossFlowState: { ...context.crossFlowState, [stateKey]: registered },
      };
    },
    delete: async (context, { connection, webhookName }) => {
      const client = createClient(connection);
      const stateKey = `${WEBHOOK_STATE_KEY_PREFIX}:${context.flow.stableId}`;
      const registered = context.crossFlowState[stateKey] as
        | RegisteredWebhookState
        | undefined;

      await deleteOwnedWebhook(
        client,
        context.logger,
        webhookName,
        registered?.webhookUrl ?? context.webhookUrls?.[context.flow.name],
      );
    },
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
