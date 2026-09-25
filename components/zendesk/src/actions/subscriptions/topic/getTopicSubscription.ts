import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { getTopicSubscriptionInputs } from "../../../inputs";
import { getTopicSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
import { getTopicSubscriptionExamplePayload } from "../../../examplePayloads";
export const getTopicSubscription = action({
  display: {
    label: "Get Topic Subscription",
    description: "Get a topic subscription from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, topicId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/community/topics/${topicId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  inputs: getTopicSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTopicSubscriptionOutputSchema,
  }),
  examplePayload: getTopicSubscriptionExamplePayload,
});
