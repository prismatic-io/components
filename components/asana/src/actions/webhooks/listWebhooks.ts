import { action, input, util } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { connectionInput, limit, offset, workspaceId } from "../../inputs";

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

export const listWebhooks = action({
  display: {
    label: "List Workspace Webhooks",
    description:
      "List all webhooks configured in Asana, including those for other integrations.",
  },
  inputs: {
    asanaConnection: connectionInput,
    workspaceId,
    showOnlyInstanceWebhooks: input({
      label: "Show only instance webhooks",
      comments: "Show only webhooks that point to this instance",
      type: "boolean",
      default: "true",
      clean: util.types.toBool,
    }),
    limit,
    offset,
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/webhooks", {
      params: {
        workspace: params.workspaceId,
        limit: params.limit,
        offset: params.offset,
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
  examplePayload: {
    data: [
      {
        gid: "1202700984385446",
        active: true,
        resource: {
          gid: "1202467472002605",
          name: "Brand redesign campaign",
          resource_type: "project",
        },
        resource_type: "webhook",
        target: "https://hooks.example.com/trigger/EXAMPLE",
      },
    ],
  },
});
