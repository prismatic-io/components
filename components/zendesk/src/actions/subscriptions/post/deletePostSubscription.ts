import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { deletePostSubscriptionExamplePayload } from "../../../examplePayloads";
import { deletePostSubscriptionInputs } from "../../../inputs";
import { deletePostSubscriptionOutputSchema } from "../../../outputSchemas";
export const deletePostSubscription = action({
  display: {
    label: "Delete Post Subscription",
    description: "Delete a post subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, postId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/community/posts/${postId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deletePostSubscriptionExamplePayload,
  inputs: deletePostSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePostSubscriptionOutputSchema,
  }),
  examplePayload: deletePostSubscriptionExamplePayload,
});
