import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { DEFAULT_PAGE_LIMIT } from "../../constants";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import { deleteInstanceWebhooksOutputSchema } from "../../outputSchemas";
import type { AsanaWebhook, PaginatedResponse } from "../../types";
export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all Asana webhooks that point to a flow in this instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstanceWebhooksOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let webhooks: AsanaWebhook[] = [];
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: PaginatedResponse<AsanaWebhook> = await client.get(
        "/webhooks",
        {
          params: {
            workspace: params.workspaceId,
            limit: util.types.toString(DEFAULT_PAGE_LIMIT),
            offset: offset,
          },
        },
      );
      webhooks = [...webhooks, ...response.data.data];
      offset = response.data.next_page?.offset;
      if (!offset) {
        stop = true;
      }
    }
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const instanceWebhooks = webhooks.filter((webhook) =>
      instanceWebhookUrls.includes(webhook.target),
    );
    for (const webhook of instanceWebhooks) {
      context.logger.info(`Deleting webhook ${webhook.gid}...`);
      await client.delete(`/webhooks/${webhook.gid}`);
    }
    return { data: {} };
  },
});
