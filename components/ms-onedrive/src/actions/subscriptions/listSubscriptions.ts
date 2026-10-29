import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
import type { GraphListResponse, Subscription } from "../../types";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all available Subscriptions",
  },
  inputs: listSubscriptionsInputs,
  perform: async (
    context,
    { oneDriveConnection, showInstanceSubscriptions },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } =
      await client.get<GraphListResponse<Subscription>>("/subscriptions");

    if (showInstanceSubscriptions) {
      const instanceWebhooks = new Set(Object.values(context.webhookUrls));
      const instanceSubscriptions = data.value.filter(({ notificationUrl }) =>
        instanceWebhooks.has(notificationUrl),
      );
      return { data: { ...data, value: instanceSubscriptions } };
    }

    return { data };
  },
  examplePayload: listSubscriptionsExamplePayload,
});
