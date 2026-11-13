import { action, outputSchema } from "@prismatic-io/spectral";
import { renewSubscriptionFN } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { MINUTES_PER_DAY, RENEWAL_EXPIRATION_MINUTES } from "../../constants";
import { renewSubscriptionExamplePayload } from "../../examplePayloads";
import { renewSubscriptionInputs } from "../../inputs";
import { renewSubscriptionOutputSchema } from "../../outputSchemas";

export const renewSubscription = action({
  display: {
    label: "Renew Subscription",
    description:
      "Extends the expiration date of an existing OneDrive subscription.",
  },
  inputs: renewSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { oneDriveConnection, subscriptionId, expirationDays },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const subscription = await renewSubscriptionFN(
      client,
      subscriptionId,
      expirationDays * MINUTES_PER_DAY,
      RENEWAL_EXPIRATION_MINUTES,
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
