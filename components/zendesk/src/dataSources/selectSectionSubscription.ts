import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectSectionSubscriptionExamplePayload } from "../examplePayloads";
import { selectSectionSubscriptionInputs } from "../inputs";
import type { Subscription } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectSectionSubscription = dataSource({
  display: {
    label: "Select Section Subscription",
    description:
      "Select a subscription for a section in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, sectionId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];
    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/help_center/sections/${sectionId}/subscriptions`,
      results,
      "subscriptions",
    );
    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "section"})`,
          key: util.types.toString(sub.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectSectionSubscriptionInputs,
  dataSourceType: "picklist",
  examplePayload: selectSectionSubscriptionExamplePayload,
});
