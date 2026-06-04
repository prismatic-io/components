import { connectionInput, postId, subscriptionId } from "../../../inputs";
import { subscriptionPayload } from "../../../examplePayloads";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { action } from "@prismatic-io/spectral";

export const getPostSubscription = action({
  display: {
    label: "Get Post Subscription",
    description: "Get a post subscription from the Help Center.",
  },
  perform: async (context, { postId, subscriptionId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/community/posts/${postId}/subscriptions/${subscriptionId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    postId,
    subscriptionId: { ...subscriptionId, dataSource: "selectPostSubscription" },
    zendeskConnection: connectionInput,
  },
  examplePayload: { data: subscriptionPayload },
});
