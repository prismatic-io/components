import { action } from "@prismatic-io/spectral";
import type { Subscription } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
import { fetchAllData } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Lists all subscriptions for Microsoft Outlook.",
  },
  inputs: listSubscriptionsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const data = await fetchAllData<Subscription>(client, "/subscriptions", params.fetchAll, {});

    if (params.showInstanceWebhooks) {
      const instanceWebhooks = new Set(Object.values(context.webhookUrls));
      const instanceSubscriptions = data.value.filter(({ notificationUrl }) =>
        instanceWebhooks.has(notificationUrl ?? ""),
      );
      return { data: { ...data, value: instanceSubscriptions } };
    }

    return { data };
  },
  examplePayload: listSubscriptionsExamplePayload,
});
