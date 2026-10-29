import { action } from "@prismatic-io/spectral";
import { deleteCampaignsExamplePayload } from "../../examplePayloads";
import { deleteCampaignsInputs } from "../../inputs/campaigns";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteCampaigns = action({
  display: {
    label: "Delete Campaigns",
    description: "Deletes one or more campaigns from the specified account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/Campaigns", {
      data: { AccountId: accountId, CampaignIds: campaignIds },
    });

    return { data };
  },
  inputs: deleteCampaignsInputs,
  examplePayload: deleteCampaignsExamplePayload,
});
