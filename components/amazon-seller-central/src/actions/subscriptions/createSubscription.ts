import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads/notifications";
import { createSubscriptionInputs } from "../../inputs";
import { createSubscriptionOutputSchema } from "../../outputSchemas";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description:
      "Creates a subscription for the specified notification type to be delivered to the specified destination.",
  },
  examplePayload: createSubscriptionExamplePayload,
  inputs: createSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSubscriptionOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      notificationType,
      destinationId,
      payloadVersion,
      marketplaceIds,
      orderChangeTypes,
      aggregationTimePeriod,
      eventFilterType,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/notifications/v1/subscriptions/${notificationType}`,
      {
        payloadVersion,
        destinationId,
        processingDirective: {
          eventFilter: {
            aggregationSettings: {
              aggregationTimePeriod,
            },
            marketplaceIds,
            orderChangeTypes,
            eventFilterType,
          },
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => createSubscriptionExamplePayload,
});
