import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { renewSubscriptionInputs } from "../../inputs";
import { renewSubscriptionExamplePayload } from "../../examplePayloads/webhooks";
import { renewSubscriptionFN } from "ms-utils";

export const renewSubscription = action({
  display: {
    label: "Renew Subscription",
    description: "Extend the expiration date of an existing SharePoint subscription",
  },
  inputs: renewSubscriptionInputs,
  perform: async (context, { connection, subscriptionId, expirationDays }) => {
    const client = await createClient(connection, context.debug.enabled);
    const subscription = await renewSubscriptionFN(client, subscriptionId, expirationDays);
    return { data: subscription };
  },
  examplePayload: renewSubscriptionExamplePayload,
});
