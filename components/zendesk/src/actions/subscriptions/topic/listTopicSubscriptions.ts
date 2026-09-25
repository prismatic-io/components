import { listTopicSubscriptionsInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { listTopicSubscriptionsOutputSchema } from "../../../outputSchemas";
import type { PaginatedResponse, Subscription } from "../../../types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { listTopicSubscriptionsExamplePayload } from "../../../examplePayloads";
export const listTopicSubscriptions = action({
  display: {
    label: "List Topic Subscriptions",
    description: "List all topic subscriptions in the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, topicId, pagination }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      "page[size]": pagination.pageLimit,
      "page[after]": pagination.cursor,
    };
    const { data } = await client.get<
      | PaginatedResponse<{
          subscriptions: Subscription[];
        }>
      | {
          subscriptions: Subscription[];
        }
    >(`/community/topics/${topicId}/subscriptions`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listTopicSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTopicSubscriptionsOutputSchema,
  }),
  examplePayload: listTopicSubscriptionsExamplePayload,
});
