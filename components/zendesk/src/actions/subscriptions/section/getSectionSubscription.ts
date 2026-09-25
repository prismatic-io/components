import { getSectionSubscriptionInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { getSectionSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { getSectionSubscriptionExamplePayload } from "../../../examplePayloads";
export const getSectionSubscription = action({
  display: {
    label: "Get Section Subscription",
    description: "Get a section subscription from the Help Center.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { zendeskConnection, sectionId, subscriptionId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/help_center/sections/${sectionId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  inputs: getSectionSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSectionSubscriptionOutputSchema,
  }),
  examplePayload: getSectionSubscriptionExamplePayload,
});
