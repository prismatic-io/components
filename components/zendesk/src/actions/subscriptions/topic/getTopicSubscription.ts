import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { connectionInput, subscriptionId, topicId } from "../../../inputs";
import type { SubscriptionResponse } from "../../../types";
import { subscriptionPayload } from "../../../examplePayloads";

export const getTopicSubscription = action({
  display: {
    label: "Get Topic Subscription",
    description: "Get a topic subscription from the Help Center.",
  },
  perform: async (context, { zendeskConnection, topicId, subscriptionId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/community/topics/${topicId}/subscriptions/${subscriptionId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    subscriptionId: {
      ...subscriptionId,
      dataSource: "selectTopicSubscription",
    },
    topicId,
  },
  examplePayload: { data: subscriptionPayload },
});
