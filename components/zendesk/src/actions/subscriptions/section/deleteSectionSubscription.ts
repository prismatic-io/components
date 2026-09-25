import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { deleteSectionSubscriptionExamplePayload } from "../../../examplePayloads";
import { deleteSectionSubscriptionInputs } from "../../../inputs";
import { deleteSectionSubscriptionOutputSchema } from "../../../outputSchemas";
export const deleteSectionSubscription = action({
  display: {
    label: "Delete Section Subscription",
    description: "Delete a section subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, sectionId, subscriptionId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    await client.delete(
      `/help_center/sections/${sectionId}/subscriptions/${subscriptionId}`,
    );
    return {
      data: null,
    };
  },
  examplePerform: async () => deleteSectionSubscriptionExamplePayload,
  inputs: deleteSectionSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSectionSubscriptionOutputSchema,
  }),
  examplePayload: deleteSectionSubscriptionExamplePayload,
});
