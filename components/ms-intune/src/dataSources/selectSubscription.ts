import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectSubscriptionExamplePayload } from "../examplePayloads";
import { selectSubscriptionInputs } from "../inputs";
import type { SelectableSubscription } from "../types";
import { paginateResults } from "../util";
export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "Select a subscription from the list of subscriptions.",
  },
  inputs: selectSubscriptionInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateResults(client, ENDPOINTS.SUBSCRIPTIONS, true);
    const result = (data.value as SelectableSubscription[])
      .map<Element>((subscription) => ({
        label: `${subscription.resource} (${subscription.changeType})`,
        key: subscription.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectSubscriptionExamplePayload,
});
