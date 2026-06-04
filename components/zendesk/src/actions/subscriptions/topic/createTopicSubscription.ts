import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  topicId,
  userId,
  includeComments,
} from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { subscriptionPayload } from "../../../examplePayloads";

export const createTopicSubscription = action({
  display: {
    label: "Create Topic Subscription",
    description: "Create a new topic subscription in the Help Center.",
  },
  perform: async (
    context,
    { includeComments, zendeskConnection, topicId, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      include_comments: includeComments,
      user_id: userId || undefined,
    };

    const { data } = await client.post<SubscriptionResponse>(
      `/community/topics/${topicId}/subscriptions`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId,
    userId: {
      ...userId,
      comments:
        "The ID of the user to subscribe to the topic. If none provided, the API assumes the current user.",
      required: false,
    },
    includeComments,
  },
  examplePayload: { data: subscriptionPayload },
});
