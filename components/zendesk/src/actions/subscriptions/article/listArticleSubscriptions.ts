import { action } from "@prismatic-io/spectral";
import { articleId, connectionInput, cursor, pageLimit } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { PaginatedResponse, Subscription } from "../../../types";
import { paginatedSubscriptionPayload } from "../../../examplePayloads";

export const listArticleSubscriptions = action({
  display: {
    label: "List Article Subscriptions",
    description: "List all subscriptions for an article in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, articleId, cursor, pageLimit },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);

    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    const { data } = await client.get<
      | PaginatedResponse<{ subscriptions: Subscription[] }>
      | { subscriptions: Subscription[] }
    >(`/community/articles/${articleId}/subscriptions`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    pageLimit,
    cursor,
    articleId,
  },
  examplePayload: { data: paginatedSubscriptionPayload },
});
