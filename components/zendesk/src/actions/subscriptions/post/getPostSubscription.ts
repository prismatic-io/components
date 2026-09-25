import { getPostSubscriptionInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { getPostSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { getPostSubscriptionExamplePayload } from "../../../examplePayloads";
export const getPostSubscription = action({
  display: {
    label: "Get Post Subscription",
    description: "Get a post subscription from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { postId, subscriptionId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/community/posts/${postId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  inputs: getPostSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPostSubscriptionOutputSchema,
  }),
  examplePayload: getPostSubscriptionExamplePayload,
});
