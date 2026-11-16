import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSiteListSubscriptionExamplePayload } from "../../examplePayloads";
import { createSiteListSubscriptionInputs } from "../../inputs";
import { createSiteListSubscriptionOutputSchema } from "../../outputSchemas";

export const createSiteListSubscription = action({
  display: {
    label: "Create Site List Subscription",
    description: "Create a Site List subscription for Microsoft SharePoint.",
  },
  inputs: createSiteListSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    if (!params.allowDuplicates) {
      const {
        data: { value: subscriptions },
      } = await client.get<{ value: { notificationUrl: string }[] }>("/subscriptions");
      const [existingSubscription] = subscriptions.filter(
        ({ notificationUrl }) => params.notificationUrl === notificationUrl,
      );
      if (existingSubscription) {
        context.logger.info(
          "A webhook with the specified Notification URL already exists. Skipping webhook creation and returning existing webhook.",
        );
        return { data: existingSubscription };
      }
    }

    const { data } = await client.post("/subscriptions", {
      resource: `sites/${params.siteId}/lists/${params.listId}`,
      notificationUrl: params.notificationUrl,
      changeType: "updated",
      expirationDateTime: params.expirationDateTime,
    });
    return { data };
  },
  examplePerform: async (_context, { siteId, listId, notificationUrl, expirationDateTime }) => ({
    data: {
      ...createSiteListSubscriptionExamplePayload.data,
      resource: `sites/${siteId}/lists/${listId}`,
      notificationUrl,
      expirationDateTime,
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSiteListSubscriptionOutputSchema,
  }),
  examplePayload: createSiteListSubscriptionExamplePayload,
});
