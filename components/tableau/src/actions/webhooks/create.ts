import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  timeout,
  apiVersion,
  webhookName,
  events,
  webhookUrl,
  webhookEnabled,
} from "../../inputs";
import { createWebhookSubscription } from "../../utils";
import { createWebhookExamplePayload } from "../../examplePayloads";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook for a site.",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (
    context,
    {
      apiVersion,
      events,
      tableauConnection,
      timeout,
      webhookEnabled,
      webhookName,
      webhookUrl,
    },
  ) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await createWebhookSubscription(
      client,
      webhookUrl,
      events,
      webhookName,
      webhookEnabled,
    );

    return {
      data,
    };
  },
  inputs: {
    tableauConnection: connectionInput,
    webhookName: {
      ...webhookName,
      required: false,
    },
    events: {
      ...events,
      required: false,
    },
    webhookUrl: {
      ...webhookUrl,
      required: false,
    },
    webhookEnabled,
    timeout,
    apiVersion,
  },
});
