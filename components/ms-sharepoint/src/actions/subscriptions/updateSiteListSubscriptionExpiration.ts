import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateSiteListSubscriptionExpirationExamplePayload } from "../../examplePayloads";
import { updateSiteListSubscriptionExpirationInputs } from "../../inputs";
import { updateSiteListSubscriptionExpirationOutputSchema } from "../../outputSchemas";

export const updateSiteListSubscriptionExpiration = action({
  display: {
    label: "Update Site List Subscription Expiration",
    description: "Update existing Site List subscription expiration for Microsoft SharePoint.",
  },
  inputs: updateSiteListSubscriptionExpirationInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.patch(`/subscriptions/${params.subscriptionId}`, {
      expirationDateTime: params.expirationDateTime,
    });
    return { data };
  },
  examplePerform: async (_context, { subscriptionId }) => ({
    data: { ...updateSiteListSubscriptionExpirationExamplePayload.data, id: subscriptionId },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSiteListSubscriptionExpirationOutputSchema,
  }),
  examplePayload: updateSiteListSubscriptionExpirationExamplePayload,
});
