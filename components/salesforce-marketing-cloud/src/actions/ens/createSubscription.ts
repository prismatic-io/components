import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";
import { createSubscriptionOutputSchema } from "../../outputSchemas";
export const createSubscription = action({
  examplePayload: createSubscriptionExamplePayload,
  display: {
    label: "Create ENS Subscription",
    description:
      "Create a new Event Notification Service (ENS) subscription for specific event types.",
  },
  inputs: createSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, subscriptionName, callbackId, eventCategoryTypes },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = [
      {
        subscriptionName,
        callbackId,
        eventCategoryTypes,
      },
    ];
    const { data } = await client.post(ENS_SUBSCRIPTIONS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { subscriptionName, callbackId, eventCategoryTypes },
  ): Promise<{
    data: unknown;
  }> => ({
    data: [
      {
        ...createSubscriptionExamplePayload.data[0],
        subscriptionName,
        callbackId,
        eventCategoryTypes,
      },
    ],
  }),
});
