import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { fetchWebhooks } from "../../util";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks configured in Zendesk.",
  },
  inputs: listWebhooksInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = rawHttpClient(params.zendeskConnection);
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      showOnlyInstanceWebhooks: params.showOnlyInstanceWebhooks,
      instanceWebhookUrls,
    });
    return { data: webhooks };
  },
  examplePerform: async () => listWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
