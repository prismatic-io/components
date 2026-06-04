import { action, input, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listWebhooksPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import { fetchWebhooks } from "./utils";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks configured in Zendesk.",
  },
  inputs: {
    zendeskConnection: connectionInput,
    showOnlyInstanceWebhooks: input({
      label: "Show only instance webhooks",
      comments: "Show only webhooks that point to this instance",
      type: "boolean",
      default: "true",
      clean: util.types.toBool,
    }),
  },
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
  examplePayload: {
    data: listWebhooksPayload as unknown,
  },
});
