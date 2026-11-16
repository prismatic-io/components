import { action, outputSchema } from "@prismatic-io/spectral";
import { GRAPH_SUBSCRIPTION_MAX_MINUTES, renewSubscriptionFN } from "ms-utils";
import { createClient } from "../../client";
import { MINUTES_PER_DAY } from "../../constants";
import { renewSubscriptionExamplePayload } from "../../examplePayloads";
import { renewSubscriptionInputs } from "../../inputs";
import { renewSubscriptionOutputSchema } from "../../outputSchemas";

export const renewSubscription = action({
  display: {
    label: "Renew Subscription",
    description: "Extend the expiration date of an existing SharePoint subscription.",
  },
  inputs: renewSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, subscriptionId, expirationDays }) => {
    const client = await createClient(connection, context.debug.enabled);
    const subscription = await renewSubscriptionFN(
      client,
      subscriptionId,
      expirationDays * MINUTES_PER_DAY,
      GRAPH_SUBSCRIPTION_MAX_MINUTES.SHAREPOINT_LIST,
    );
    return { data: subscription };
  },
  examplePerform: async (_context, { subscriptionId }) => ({
    data: { ...renewSubscriptionExamplePayload.data, id: subscriptionId },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: renewSubscriptionOutputSchema,
  }),
  examplePayload: renewSubscriptionExamplePayload,
});
