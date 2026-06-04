import { trigger } from "@prismatic-io/spectral";
import entityTriggerInputs from "../inputs/triggers/entityTrigger";
import { createWebhook, deleteWebhook } from "../utils";

export const entityTrigger = trigger({
  display: {
    label: "Entity Trigger",
    description: "Get notified to this flow when a Karbon entity changes",
  },
  allowsBranching: false,
  inputs: {
    ...entityTriggerInputs,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
    });
  },
  webhookLifecycleHandlers: {
    create: async (context, { connection, webhookType }) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await createWebhook(connection, false, endpoint, webhookType!);
    },
    delete: async (_context, { connection, webhookType }) => {
      await deleteWebhook(connection, false, webhookType!);
    },
  },
});
