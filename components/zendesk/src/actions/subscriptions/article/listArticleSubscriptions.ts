import { action, outputSchema } from "@prismatic-io/spectral";
import { listArticleSubscriptionsInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { listArticleSubscriptionsOutputSchema } from "../../../outputSchemas";
import type { PaginatedResponse, Subscription } from "../../../types";
import { listArticleSubscriptionsExamplePayload } from "../../../examplePayloads";
export const listArticleSubscriptions = action({
  display: {
    label: "List Article Subscriptions",
    description: "List all subscriptions for an article in the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, articleId, pagination }) => {
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
    >(`/help_center/articles/${articleId}/subscriptions`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listArticleSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listArticleSubscriptionsOutputSchema,
  }),
  examplePayload: listArticleSubscriptionsExamplePayload,
});
