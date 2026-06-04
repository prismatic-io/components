import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads/notifications";
import { connectionInput, notificationType } from "../../inputs";

export const listSubscriptions = action({
  display: {
    label: "List Subscription",
    description:
      "Returns information about subscriptions of the specified notification type.",
  },
  examplePayload: listSubscriptionsExamplePayload,
  inputs: {
    connectionInput,
    notificationType,
  },
  perform: async (context, { connectionInput, notificationType }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/v1/subscriptions/${notificationType}`,
    );
    return {
      data,
    };
  },
});
