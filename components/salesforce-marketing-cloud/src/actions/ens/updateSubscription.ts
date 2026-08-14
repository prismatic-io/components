import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { updateSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs } from "../../inputs";
import { updateSubscriptionOutputSchema } from "../../outputSchemas";
export const updateSubscription = action({
  examplePayload: updateSubscriptionExamplePayload,
  display: {
    label: "Update ENS Subscription",
    description:
      "Update an Event Notification Service (ENS) subscription. Can modify the subscription name, event types, or status.",
  },
  inputs: updateSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { subscriptionId, subscriptionName, eventCategoryTypes },
  ): Promise<{
    data: unknown;
  }> => ({
    data: [
      {
        ...updateSubscriptionExamplePayload.data[0],
        subscriptionId,
        subscriptionName:
          subscriptionName ??
          updateSubscriptionExamplePayload.data[0].subscriptionName,
        eventCategoryTypes:
          eventCategoryTypes ??
          updateSubscriptionExamplePayload.data[0].eventCategoryTypes,
      },
    ],
  }),
});
