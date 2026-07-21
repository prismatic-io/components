import { action } from "@prismatic-io/spectral";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update the properties of an existing webhook.",
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
    const client = await getTableauClient({
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
  inputs: updateWebhookInputs,
});
