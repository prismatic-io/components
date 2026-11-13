import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { selectSubscriptionExamplePayload } from "../examplePayloads";
import { selectSubscriptionInputs } from "../inputs";
import type { GraphListResponse, Subscription } from "../types";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "Lists subscriptions available to the current user.",
  },
  inputs: selectSubscriptionInputs,
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const {
      data: { value },
    } = await client.get<GraphListResponse<Subscription>>("/subscriptions");

    return {
      result: value
        .map<Element>((item) => ({
          label: `${item.resource} (${item.changeType})`,
          key: item.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectSubscriptionExamplePayload,
});
