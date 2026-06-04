import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { updateSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs } from "../../inputs";

export const updateSubscription = action({
  examplePayload: updateSubscriptionExamplePayload,
  display: {
    label: "Update ENS Subscription",
    description:
      "Update an Event Notification Service (ENS) subscription. Can modify the subscription name, event types, or status.",
  },
  inputs: updateSubscriptionInputs,
  perform: async (
    context,
    { connection, subscriptionId, subscriptionName, eventCategoryTypes },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: Record<string, unknown> = { subscriptionId };
    if (subscriptionName) body.subscriptionName = subscriptionName;
    if (eventCategoryTypes) body.eventCategoryTypes = eventCategoryTypes;

    const { data } = await client.put(ENS_SUBSCRIPTIONS_PATH, [body]);

    return { data };
  },
});
