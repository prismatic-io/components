import { action } from "@prismatic-io/spectral";
import { connectionInput, topicId, subscriptionId } from "../../../inputs";
import { rawHttpClient } from "../../../auth";

export const deleteTopicSubscription = action({
  display: {
    label: "Delete Topic Subscription",
    description: "Delete a topic subscription in the Help Center.",
  },
  perform: async (context, { zendeskConnection, topicId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/community/topics/${topicId}/subscriptions/${subscriptionId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId,
    subscriptionId: {
      ...subscriptionId,
      dataSource: "selectTopicSubscription",
    },
  },
  examplePayload: {
    data: null,
  },
});
