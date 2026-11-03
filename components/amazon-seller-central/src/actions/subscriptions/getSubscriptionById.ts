import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSubscriptionByIdExamplePayload } from "../../examplePayloads/notifications";
import { getSubscriptionByIdInputs } from "../../inputs";
import { getSubscriptionByIdOutputSchema } from "../../outputSchemas";

export const getSubscriptionById = action({
  display: {
    label: "Get Subscription By ID",
    description:
      "Returns information about a subscription for the specified notification type. The getSubscriptionById API is grantless. For more information, see Grantless operations in the Selling Partner API Developer Guide.",
  },
  examplePayload: getSubscriptionByIdExamplePayload,
  inputs: getSubscriptionByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSubscriptionByIdOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (
    context,
    { connectionInput, subscriptionId, notificationType },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/v1/subscriptions/${notificationType}/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => getSubscriptionByIdExamplePayload,
});
