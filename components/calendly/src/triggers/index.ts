import {
  type ActionContext,
  type TriggerPayload,
  trigger,
} from "@prismatic-io/spectral";
import { postWebhookSubscription, deleteWebhookInstance } from "../util";
import {
  connection,
  organization,
  user,
  scope,
  signingKey,
  eventNamesInput,
} from "../inputs";
import { getCalendlyClient } from "../client";

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

const calendlyTrigger = trigger({
  display: {
    label: "Scheduled Event",
    description:
      "Receive data from scheduled events in real time with webhook subscriptions.",
  },
  allowsBranching: false,
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      comments:
        "The unique reference to the organization that the webhook will be tied to.",
    },
    user: {
      ...user,
      required: false,
      comments:
        "The unique reference to the user that the webhook will be tied to.",
    },
    eventNamesInput,
    scope,
    signingKey,
  },
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

export default {
  calendlyTrigger,
};
