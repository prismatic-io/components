import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import type { AsanaWebhook } from "../../types";
export const listWebhooks = action({
  display: {
    label: "List Workspace Webhooks",
    description:
      "List all webhooks configured in Asana, including those for other integrations.",
  },
  inputs: listWebhooksInputs,
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/webhooks", {
      params: {
        workspace: params.workspaceId,
        limit: params.pagination.limit,
        offset: params.pagination.offset,
      },
    });
    if (params.showOnlyInstanceWebhooks) {
      const instanceWebhookUrls = Object.values(context.webhookUrls);
      return {
        data: (data.data || []).filter((webhook: AsanaWebhook) =>
          instanceWebhookUrls.includes(webhook.target),
        ),
      };
    }
    return { data: data.data };
  },
  examplePayload: listWebhooksExamplePayload,
});
