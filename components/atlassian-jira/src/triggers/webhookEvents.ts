import { trigger, util } from "@prismatic-io/spectral";
import {
  checkAndRefreshWebhook,
  createWebhookTrigger,
  createWebhookTriggerBasic,
  deleteWebhookTrigger,
  deleteWebhookTriggerBasic,
} from "atlassian-utils";
import { createV3Client } from "../connections/auth";
import { webhookEventsExamplePayload } from "../examplePayloads";
import { eventsWebhookInputs } from "../inputs";
import { isBasicAuth, toOptionalString } from "../util";

export const webhookEvents = trigger({
  display: {
    label: "Issue Events",
    description:
      "Receive real-time notifications when Jira issues are created, updated, or deleted. Automatically creates and manages a webhook subscription for selected issue events when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "invalid",
  inputs: eventsWebhookInputs,
  examplePayload: webhookEventsExamplePayload,
  webhookLifecycleHandlers: {
    create: async (context, { jiraConnection, eventTypes, jqlFilter, fieldIdsFilter }) => {
      const useBasicAuth = isBasicAuth(jiraConnection);
      const client = await createV3Client(jiraConnection, context.debug.enabled, useBasicAuth);

      const events = Array.isArray(eventTypes) ? eventTypes : [eventTypes];
      const fieldIds =
        Array.isArray(fieldIdsFilter) && fieldIdsFilter.length > 0
          ? fieldIdsFilter.map((f) => toOptionalString(f)).filter(Boolean)
          : undefined;

      const webhookParams = {
        events: events.map((e) => util.types.toString(e)),
        jqlFilter,
        fieldIdsFilter: fieldIds,
      };

      if (useBasicAuth) {
        await createWebhookTriggerBasic(client, webhookParams, context);
      } else {
        await createWebhookTrigger(client, webhookParams, context);
      }
    },
    delete: async (context, { jiraConnection }) => {
      const useBasicAuth = isBasicAuth(jiraConnection);
      const client = await createV3Client(jiraConnection, context.debug.enabled, useBasicAuth);

      if (useBasicAuth) {
        await deleteWebhookTriggerBasic(client, context);
      } else {
        await deleteWebhookTrigger(client, context);
      }
    },
  },
  perform: async (context, payload, { jiraConnection }) => {
    const useBasicAuth = isBasicAuth(jiraConnection);

    if (!useBasicAuth) {
      const client = await createV3Client(jiraConnection, context.debug.enabled);
      await checkAndRefreshWebhook(client, context);
    }

    return Promise.resolve({
      payload,
    });
  },
});
