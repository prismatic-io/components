import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { createPostSubscriptionExamplePayload } from "../../../examplePayloads";
import { createPostSubscriptionInputs } from "../../../inputs";
import { createPostSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
export const createPostSubscription = action({
  display: {
    label: "Create Post Subscription",
    description: "Create a post subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, postId, userId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      user_id: userId,
    };
    const { data } = await client.post<SubscriptionResponse>(
      `/community/posts/${postId}/subscriptions`,
      payload,
    );
    return {
      data,
    };
  },
  examplePerform: async (_context, { postId, userId }) => ({
    data: {
      ...createPostSubscriptionExamplePayload.data,
      subscription: {
        ...createPostSubscriptionExamplePayload.data.subscription,
        ...(postId ? { content_id: postId } : {}),
        ...(userId ? { user_id: userId } : {}),
      },
    },
  }),
  inputs: createPostSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPostSubscriptionOutputSchema,
  }),
  examplePayload: createPostSubscriptionExamplePayload,
});
