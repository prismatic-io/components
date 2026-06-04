import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { connectionInput, workspaceId } from "../../inputs";

interface AsanaWebhook {
  gid: string;
  active: boolean;
  resource: {
    gid: string;
    name: string;
    resource_type: string;
  };
  resource_type: string;
  target: string;
}

interface WebhookResponse {
  data: {
    data: AsanaWebhook[];
    next_page: {
      offset: string;
      path: string;
      uri: string;
    };
  };
}

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all Asana webhooks that point to a flow in this instance.",
  },
  inputs: { asanaConnection: connectionInput, workspaceId },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );

    let webhooks: AsanaWebhook[] = [];
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: WebhookResponse = await client.get("/webhooks", {
        params: { workspace: params.workspaceId, limit: "100", offset: offset },
      });
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
