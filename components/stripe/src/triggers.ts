import { util, pollingTrigger, trigger } from "@prismatic-io/spectral";
import { createStripeClient } from "./auth";
import { pollChangesTriggerExamplePayload } from "./examplePayloads/triggers";
import {
  connectionInput,
  disableWebhookValidation,
  pollChangesInputs,
  webhookEvents,
} from "./inputs";
import type { CreatedWebhook, PollingState, StripeEvent } from "./types";
import {
  fetchEventsSince,
  getStripeHeaderSignature,
  onInstanceDelete,
  onInstanceDeploy,
  validateTrigger,
} from "./util";

export const webhook = trigger({
  display: {
    label: "Webhook (Deprecated)",
    description: "Receive and validate webhook requests from Stripe for webhooks you configure.",
  },
  perform: async (context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});

export const instanceDeployWebhook = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Receive event notifications from Stripe. Automatically creates and manages a webhook subscription for the selected events when the instance is deployed, and removes the subscription when the instance is deleted. Incoming webhook signatures are validated by default.",
  },
  perform: async (context, payload, { connection, disableWebhookValidation }) => {
    const createdWebhook = context.crossFlowState[context.flow.name] as CreatedWebhook;
    const sig = disableWebhookValidation
      ? undefined
      : getStripeHeaderSignature(util.types.lowerCaseHeaders(payload.headers));
    const client = createStripeClient({
      stripeConnection: connection,
      timeout: 5000,
    });
    if (!disableWebhookValidation && !context.isSimulatedTestExecution) {
      validateTrigger(client, payload.rawBody.data as string, sig, createdWebhook.webhook.secret);
    }

    return Promise.resolve({
      payload,
    });
  },
  inputs: {
    webhookEvents,
    connection: connectionInput,
    disableWebhookValidation,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: onInstanceDeploy,
    delete: onInstanceDelete,
  },
});

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Stripe on a configured schedule. Events with a type ending in `.created` are partitioned into the `created` bucket; all other event types (such as `.updated`, `.deleted`, or `.succeeded`) are partitioned into the `updated` bucket.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const createdGte = Math.floor(new Date(lastPolledAt).getTime() / 1000);

    const { events, truncated } = await fetchEventsSince(
      params.connection,
      createdGte,
      params.pollEventTypes,
    );

    const created: StripeEvent[] = [];
    const updated: StripeEvent[] = [];
    for (const event of events) {
      const isNew = typeof event.type === "string" && event.type.endsWith(".created");
      if (isNew && params.showNewRecords !== false) created.push(event);
      else if (!isNew && params.showUpdatedRecords !== false) updated.push(event);
    }

    
    
    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestFetched = events
        .map((e) => e.created)
        .filter((c): c is number => typeof c === "number")
        .reduce((min, c) => (c < min ? c : min), Number.POSITIVE_INFINITY);
      if (Number.isFinite(oldestFetched)) {
        nextCursor = new Date(oldestFetched * 1000).toISOString();
      }
      context.logger.warn(
        `Polling truncated at the page cap for Stripe events. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Stripe events: ${events.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});

export default { instanceDeployWebhook, pollChangesTrigger, webhook };
