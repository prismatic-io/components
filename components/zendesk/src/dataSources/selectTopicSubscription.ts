import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectTopicSubscriptionExamplePayload } from "../examplePayloads";
import { selectTopicSubscriptionInputs } from "../inputs";
import type { Subscription } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectTopicSubscription = dataSource({
  display: {
    label: "Select Topic Subscription",
    description:
      "Select a subscription for a topic in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];
    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/topics/${topicId}/subscriptions`,
      results,
      "subscriptions",
    );
    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "topic"})`,
          key: util.types.toString(sub.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectTopicSubscriptionInputs,
  dataSourceType: "picklist",
  examplePayload: selectTopicSubscriptionExamplePayload,
});
