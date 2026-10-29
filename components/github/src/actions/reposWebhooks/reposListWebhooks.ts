import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { reposListWebhooksExamplePayload } from "../../examplePayloads";
import { reposListWebhooksInputs } from "../../inputs";
import { reposListWebhooksOutputSchema } from "../../outputSchemas";
import { fetchWebhooks } from "../../utils";

export const reposListWebhooks = action({
  display: {
    label: "List Repository Webhooks",
    description: "List webhooks of a repository.",
  },
  examplePayload: reposListWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reposListWebhooksOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      owner: params.owner,
      repo: params.repo,
      showOnlyInstanceWebhooks: params.showOnlyInstanceWebhooks,
      instanceWebhookUrls,
    });
    return { data: webhooks };
  },
  examplePerform: async () => reposListWebhooksExamplePayload,
  inputs: reposListWebhooksInputs,
});
