import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { reposDeleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { reposDeleteInstanceWebhooksInputs } from "../../inputs";
import { fetchWebhooks } from "../../utils";
export const reposDeleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Delete all webhooks pointed at this instance.",
  },
  examplePayload: reposDeleteInstanceWebhooksExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      owner: params.owner,
      repo: params.repo,
      showOnlyInstanceWebhooks: true,
      instanceWebhookUrls,
    });
    for (const webhook of webhooks) {
      console.info(`Deleting webhook ${webhook.id}`);
      await client.delete(
        `/repos/${params.owner}/${params.repo}/hooks/${webhook.id}`,
      );
    }
    return { data: {} };
  },
  examplePerform: async () => reposDeleteInstanceWebhooksExamplePayload,
  inputs: reposDeleteInstanceWebhooksInputs,
});
