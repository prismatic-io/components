import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { WEBHOOK_DEFAULTS, WEBHOOK_SECRET_BYTES } from "../constants";
import { eventWebhookExamplePayload } from "../examplePayloads";
import { eventWebhookInputs } from "../inputs";
import { validateWebhookSignature } from "../utils";
export const eventWebhook = trigger({
  display: {
    label: "Event Webhook",
    description:
      "Receive event notifications from GitHub. Automatically creates and manages a webhook subscription for the selected event types when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: async (context, payload) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({ payload });
    }
    const flowKey = context.flow.id;
    const storedSecret = context.crossFlowState[`${flowKey}_secret`];
    validateWebhookSignature(
      payload,
      storedSecret ? util.types.toString(storedSecret) : undefined,
    );
    return Promise.resolve({ payload });
  },
  inputs: eventWebhookInputs,
  examplePayload: eventWebhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const webhookUrl = context.webhookUrls[context.flow.name];
      const flowKey = context.flow.id;
      const currentEvents = [...params.events].sort().join(",");
      const existingWebhookId = context.crossFlowState[flowKey];
      if (existingWebhookId) {
        const previousOwner =
          util.types.toString(context.crossFlowState[`${flowKey}_owner`]) ||
          params.owner;
        const previousRepo =
          util.types.toString(context.crossFlowState[`${flowKey}_repo`]) ||
          params.repo;
        const previousEvents = util.types.toString(
          context.crossFlowState[`${flowKey}_events`],
        );
        if (
          previousOwner === params.owner &&
          previousRepo === params.repo &&
          previousEvents === currentEvents
        ) {
          context.logger.info(
            `Webhook ${existingWebhookId} already exists with the same configuration, skipping creation`,
          );
          return;
        }
        context.logger.info(
          `Inputs changed, recreating webhook ${existingWebhookId} for ${previousOwner}/${previousRepo}`,
        );
        await client.delete(
          `/repos/${previousOwner}/${previousRepo}/hooks/${existingWebhookId}`,
        );
      }
      const webhookSecret = crypto
        .randomBytes(WEBHOOK_SECRET_BYTES)
        .toString("hex");
      const { data } = await client.post(
        `/repos/${params.owner}/${params.repo}/hooks`,
        {
          name: WEBHOOK_DEFAULTS.name,
          config: {
            url: webhookUrl,
            content_type: WEBHOOK_DEFAULTS.contentType,
            insecure_ssl: WEBHOOK_DEFAULTS.insecureSsl,
            secret: webhookSecret,
          },
          events: params.events,
          active: true,
        },
      );
      context.crossFlowState[flowKey] = data.id;
      context.crossFlowState[`${flowKey}_secret`] = webhookSecret;
      context.crossFlowState[`${flowKey}_owner`] = params.owner;
      context.crossFlowState[`${flowKey}_repo`] = params.repo;
      context.crossFlowState[`${flowKey}_events`] = currentEvents;
      context.logger.info(
        `Created webhook ${data.id} for ${params.owner}/${params.repo} with events: ${params.events.join(", ")}`,
      );
    },
    delete: async (context, params) => {
      const client = createClient(params.connection, context.debug.enabled);
      const flowKey = context.flow.id;
      const webhookId = context.crossFlowState[flowKey];
      if (!webhookId) {
        context.logger.warn(
          `No webhook ID found in crossFlowState for flow ${context.flow.name} (${flowKey})`,
        );
        return;
      }
      await client.delete(
        `/repos/${params.owner}/${params.repo}/hooks/${webhookId}`,
      );
      context.crossFlowState[flowKey] = undefined;
      context.crossFlowState[`${flowKey}_secret`] = undefined;
      context.crossFlowState[`${flowKey}_owner`] = undefined;
      context.crossFlowState[`${flowKey}_repo`] = undefined;
      context.crossFlowState[`${flowKey}_events`] = undefined;
      context.logger.info(
        `Deleted webhook ${webhookId} for ${params.owner}/${params.repo}`,
      );
    },
  },
});
