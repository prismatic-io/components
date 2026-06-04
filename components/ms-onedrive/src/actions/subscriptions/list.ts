import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { oneDriveConnection, showInstanceSubscriptions } from "../../inputs";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all available Subscriptions",
  },
  inputs: {
    oneDriveConnection,
    showInstanceSubscriptions,
  },
  perform: async (context, { oneDriveConnection }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { notificationUrl: string; [key: string]: unknown }[];
    }>("/subscriptions");

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
