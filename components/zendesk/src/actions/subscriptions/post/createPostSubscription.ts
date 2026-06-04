import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { connectionInput, postId, userId } from "../../../inputs";
import { subscriptionPayload } from "../../../examplePayloads";
import { action } from "@prismatic-io/spectral";

export const createPostSubscription = action({
  display: {
    label: "Create Post Subscription",
    description: "Create a post subscription in the Help Center.",
  },
  perform: async (context, { zendeskConnection, postId, userId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      user_id: userId || undefined,
    };

    const { data } = await client.post<SubscriptionResponse>(
      `/community/posts/${postId}/subscriptions`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
    userId: {
      ...userId,
      comments:
        "The ID of the user to subscribe to the post. If none provided, the API assumes the current user.",
      required: false,
    },
  },
  examplePayload: { data: subscriptionPayload },
});
