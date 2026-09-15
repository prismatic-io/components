import {
  type ActionContext,
  type TriggerPayload,
  trigger,
} from "@prismatic-io/spectral";
import { postWebhookSubscription, deleteWebhookInstance } from "../util";
import { calendlyTriggerInputs } from "../inputs";
import { getCalendlyClient } from "../client";
import { calendlyTriggerExamplePayload } from "../examplePayloads";
const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
): Promise<{
  payload: TriggerPayload;
}> =>
  Promise.resolve({
    payload,
    response: {
      statusCode: 200,
    },
  });
export const calendlyTrigger = trigger({
  display: {
    label: "Scheduled Event",
    description:
      "Receive data from scheduled events in real time with webhook subscriptions.",
  },
  examplePayload: calendlyTriggerExamplePayload,
  allowsBranching: false,
  inputs: calendlyTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connection, organization, user, scope, signingKey, eventNamesInput },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = getCalendlyClient(connection, context.debug.enabled);
      await postWebhookSubscription(
        client,
        endpoint,
        eventNamesInput,
        organization,
        user,
        scope,
        signingKey,
      );
    },
    delete: async (context, { connection, organization, user, scope }) => {
      const client = getCalendlyClient(connection, context.debug.enabled);
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhookInstance(client, endpoint, organization, user, scope);
    },
  },
});
