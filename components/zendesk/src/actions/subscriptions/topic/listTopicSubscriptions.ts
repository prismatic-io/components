import { connectionInput, cursor, pageLimit, topicId } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { PaginatedResponse, Subscription } from "../../../types";
import { action } from "@prismatic-io/spectral";
import { paginatedSubscriptionPayload } from "../../../examplePayloads";

export const listTopicSubscriptions = action({
  display: {
    label: "List Topic Subscriptions",
    description: "List all topic subscriptions in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, topicId, pageLimit, cursor },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    const { data } = await client.get<
      | PaginatedResponse<{ subscriptions: Subscription[] }>
      | { subscriptions: Subscription[] }
    >(`/community/topics/${topicId}/subscriptions`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    cursor,
    topicId,
    pageLimit,
  },
  examplePayload: { data: paginatedSubscriptionPayload },
});
