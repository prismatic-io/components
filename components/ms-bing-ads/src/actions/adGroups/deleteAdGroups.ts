import { action } from "@prismatic-io/spectral";
import { deleteAdGroupsExamplePayload } from "../../examplePayloads";
import { deleteAdGroupsInputs } from "../../inputs/adGroups";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteAdGroups = action({
  display: {
    label: "Delete Ad Groups",
    description: "Deletes one or more ad groups from the specified campaign.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignId, adGroupIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/AdGroups", {
      data: { CampaignId: campaignId, AdGroupIds: adGroupIds },
    });

    return { data };
  },
  inputs: deleteAdGroupsInputs,
  examplePayload: deleteAdGroupsExamplePayload,
});
