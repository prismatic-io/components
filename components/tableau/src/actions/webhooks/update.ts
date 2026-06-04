import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  timeout,
  webhookId,
  apiVersion,
  webhookName,
  events,
  webhookUrl,
  webhookEnabled,
  webhookDisableReason,
} from "../../inputs";
import { updateWebhookExamplePayload } from "../../examplePayloads";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Modify the properties of an existing webhook.",
  },
  examplePayload: updateWebhookExamplePayload,
  perform: async (
    context,
    {
      apiVersion,
      events,
      tableauConnection,
      timeout,
      webhookEnabled,
      webhookId,
      webhookName,
      webhookUrl,
      webhookDisableReason,
    },
  ) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const body = {
      webhook: {
        name: webhookName || undefined,
        isEnabled: webhookEnabled || undefined,
        statusChangeReason: webhookDisableReason || undefined,
        event: events || undefined,
      },
    };
    if (webhookUrl) {
      body.webhook["webhook-destination"] = {
        "webhook-destination-http": {
          url: webhookUrl,
          method: "POST",
        },
      };
    }
    const { data } = await client.put(`/webhooks/${webhookId}`, body);

    return {
      data,
    };
  },
  inputs: {
    tableauConnection: connectionInput,
    webhookId,
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
    webhookDisableReason,
    timeout,
    apiVersion,
  },
});
