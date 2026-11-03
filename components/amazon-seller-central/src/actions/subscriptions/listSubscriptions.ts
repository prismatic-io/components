import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads/notifications";
import { listSubscriptionsInputs } from "../../inputs";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description:
      "Returns information about subscriptions of the specified notification type.",
  },
  examplePayload: listSubscriptionsExamplePayload,
  inputs: listSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, notificationType }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/v1/subscriptions/${notificationType}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => listSubscriptionsExamplePayload,
});
