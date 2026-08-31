import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import { getAllWebhookEntries, getInstanceWebhookIds } from "../../util";
export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all Box webhooks that point to a flow in this instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  performSafety: "notAllowed",
  perform: async ({ logger, webhookUrls }, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const { entries } = await getAllWebhookEntries(client);
    const instanceWebhookIds = await getInstanceWebhookIds(
      client,
      entries,
      webhookUrls,
    );
    for (const webhookId of instanceWebhookIds) {
      logger.info(`Deleting webhook ${webhookId}...`);
      await client.webhooks.deleteWebhookById(util.types.toString(webhookId));
    }
    return { data: {} };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteInstanceWebhooksExamplePayload.data,
  }),
  examplePayload: deleteInstanceWebhooksExamplePayload,
});
