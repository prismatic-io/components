import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { deleteTopicSubscriptionExamplePayload } from "../../../examplePayloads";
import { deleteTopicSubscriptionInputs } from "../../../inputs";
import { deleteTopicSubscriptionOutputSchema } from "../../../outputSchemas";
export const deleteTopicSubscription = action({
  display: {
    label: "Delete Topic Subscription",
    description: "Delete a topic subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, topicId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/community/topics/${topicId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteTopicSubscriptionExamplePayload,
  inputs: deleteTopicSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTopicSubscriptionOutputSchema,
  }),
  examplePayload: deleteTopicSubscriptionExamplePayload,
});
