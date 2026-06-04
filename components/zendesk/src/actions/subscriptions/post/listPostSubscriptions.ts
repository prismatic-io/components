import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import type { PaginatedResponse, Subscription } from "../../../types";
import { connectionInput, cursor, pageLimit, postId } from "../../../inputs";
import { paginatedSubscriptionPayload } from "../../../examplePayloads";

export const listPostSubscriptions = action({
  display: {
    label: "List Post Subscriptions",
    description: "List all post subscriptions in the Help Center.",
  },
  perform: async (
    context,
    { postId, zendeskConnection, cursor, pageLimit },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    const { data } = await client.get<
      | PaginatedResponse<{ subscriptions: Subscription[] }>
      | { subscriptions: Subscription[] }
    >(`/community/posts/${postId}/subscriptions`, { params });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
    cursor,
    pageLimit,
  },
  examplePayload: {
    data: paginatedSubscriptionPayload,
  },
});
