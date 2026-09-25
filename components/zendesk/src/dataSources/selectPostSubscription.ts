import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectPostSubscriptionExamplePayload } from "../examplePayloads";
import { selectPostSubscriptionInputs } from "../inputs";
import type { Subscription } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectPostSubscription = dataSource({
  display: {
    label: "Select Post Subscription",
    description: "Select a subscription for a post in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, postId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];
    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/posts/${postId}/subscriptions`,
      results,
      "subscriptions",
    );
    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "post"})`,
          key: util.types.toString(sub.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectPostSubscriptionInputs,
  dataSourceType: "picklist",
  examplePayload: selectPostSubscriptionExamplePayload,
});
