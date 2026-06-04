import { ActionContext, TriggerPayload, trigger } from "@prismatic-io/spectral";
import { connectionInput, timeout } from "./inputs";
import { getTableuClient } from "./auth";
import { events, apiVersion } from "./inputs";
import {
  deleteWebhooksInstance,
  createWebhookSubscriptions,
  getEventInfo,
} from "./utils";
import tableauEvents from "./tableauEvents.json";
import { TableauTriggerPayload } from "./interfaces";

const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
  { connectionInput, apiVersion, timeout },
): Promise<{
  payload: TriggerPayload;
}> => {
  const data = payload.body.data as TableauTriggerPayload;
  const filteredEvents = tableauEvents.filter(
    (event) => event.apiEventName === data.event_type,
  );
  if (filteredEvents.length === 0) {
    throw new Error(
      `Event ${data.event_type} is not supported by this trigger.`,
    );
  }

  const client = await getTableuClient({
    tableauConnection: connectionInput,
    timeout,
    debug: context.debug.enabled,
    apiVersion,
  });

  const eventInfo = await getEventInfo(client, data);

  payload.body.data = eventInfo;

  return Promise.resolve({
    payload,
    response: {
      statusCode: 200,
    },
  });
};

const tableauTrigger = trigger({
  display: {
    label: "Scheduled Event",
    description:
      "Receive data from scheduled events in real time with webhook subscriptions.",
  },
  allowsBranching: false,
  inputs: {
    connectionInput,
    events: {
      ...events,
      required: true,
      collection: "valuelist",
      comments: "The events to subscribe to.",
      clean: (value: unknown) => {
        if (value instanceof Array) {
          return value;
        }
        return [value];
      },
    },
    apiVersion,
    timeout,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connectionInput, events, timeout, apiVersion },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = await getTableuClient({
        tableauConnection: connectionInput,
        timeout,
        debug: context.debug.enabled,
        apiVersion,
      });
      await createWebhookSubscriptions(client, endpoint, events);
    },
    delete: async (context, { connectionInput, timeout, apiVersion }) => {
      const client = await getTableuClient({
        debug: context.debug.enabled,
        apiVersion,
        timeout,
        tableauConnection: connectionInput,
      });
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhooksInstance(client, endpoint);
    },
  },
});

export default {
  tableauTrigger,
};
