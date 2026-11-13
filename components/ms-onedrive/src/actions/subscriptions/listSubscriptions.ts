import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";
import type { GraphListResponse, Subscription } from "../../types";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Lists all available subscriptions.",
  },
  inputs: listSubscriptionsInputs,
  performSafety: "notAllowed",
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
  examplePerform: async () => listSubscriptionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  examplePayload: listSubscriptionsExamplePayload,
});
