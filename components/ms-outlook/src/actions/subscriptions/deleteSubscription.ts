import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Deletes an existing subscription for Microsoft Outlook.",
  },
  inputs: deleteSubscriptionInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(`/subscriptions/${params.subscriptionId}`);
    return { data };
  },
  examplePayload: deleteSubscriptionExamplePayload,
});
