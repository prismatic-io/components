import { action } from "@prismatic-io/spectral";
import { renewSubscriptionFN } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { renewSubscriptionExamplePayload } from "../../examplePayloads";
import { renewSubscriptionInputs } from "../../inputs";

export const renewSubscription = action({
  display: {
    label: "Renew Subscription",
    description:
      "Extend the expiration date of an existing OneDrive subscription",
  },
  inputs: renewSubscriptionInputs,
  perform: async (
    context,
    { oneDriveConnection, subscriptionId, expirationDays },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const subscription = await renewSubscriptionFN(
      client,
      subscriptionId,
      expirationDays,
    );
    return { data: subscription };
  },
  examplePayload: renewSubscriptionExamplePayload,
});
