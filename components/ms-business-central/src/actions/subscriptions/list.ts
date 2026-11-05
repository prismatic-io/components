import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs/general";
import { showInstanceWebhooks } from "../../inputs/subscriptions";
import { listSubscriptionsFn } from "../../utils";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all subscriptions for Microsoft Business Central.",
  },
  inputs: {
    connection: connectionInput,
    showInstanceWebhooks,
  },
  perform: async (context, { connection, showInstanceWebhooks }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const data = await listSubscriptionsFn(client, instanceWebhooks, showInstanceWebhooks);
    return {
      data,
    };
  },
  examplePayload: {
    data: listSubscriptionsExamplePayload as unknown,
  },
});
