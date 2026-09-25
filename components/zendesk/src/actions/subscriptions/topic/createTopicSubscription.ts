import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { createTopicSubscriptionExamplePayload } from "../../../examplePayloads";
import { createTopicSubscriptionInputs } from "../../../inputs";
import { createTopicSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
export const createTopicSubscription = action({
  display: {
    label: "Create Topic Subscription",
    description: "Create a new topic subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { includeComments, zendeskConnection, topicId, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      include_comments: includeComments,
      user_id: userId,
    };
    const { data } = await client.post<SubscriptionResponse>(
      `/community/topics/${topicId}/subscriptions`,
      payload,
    );
    return {
      data,
    };
  },
  examplePerform: async (_context, { topicId, userId }) => ({
    data: {
      ...createTopicSubscriptionExamplePayload.data,
      subscription: {
        ...createTopicSubscriptionExamplePayload.data.subscription,
        ...(topicId ? { content_id: topicId } : {}),
        ...(userId ? { user_id: userId } : {}),
      },
    },
  }),
  inputs: createTopicSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTopicSubscriptionOutputSchema,
  }),
  examplePayload: createTopicSubscriptionExamplePayload,
});
