import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { connectionInput, postId, subscriptionId } from "../../../inputs";

export const deletePostSubscription = action({
  display: {
    label: "Delete Post Subscription",
    description: "Delete a post subscription in the Help Center.",
  },
  perform: async (context, { zendeskConnection, postId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/community/posts/${postId}/subscriptions/${subscriptionId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
    subscriptionId: { ...subscriptionId, dataSource: "selectPostSubscription" },
  },
  examplePayload: {
    data: null,
  },
});
