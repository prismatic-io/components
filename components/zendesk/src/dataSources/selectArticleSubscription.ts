import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectArticleSubscriptionExamplePayload } from "../examplePayloads";
import { selectArticleSubscriptionInputs } from "../inputs";
import type { Subscription } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectArticleSubscription = dataSource({
  display: {
    label: "Select Article Subscription",
    description:
      "Select a subscription for an article in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, articleId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];
    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/articles/${articleId}/subscriptions`,
      results,
      "subscriptions",
    );
    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "article"})`,
          key: util.types.toString(sub.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectArticleSubscriptionInputs,
  dataSourceType: "picklist",
  examplePayload: selectArticleSubscriptionExamplePayload,
});
