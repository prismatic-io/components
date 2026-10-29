import { action } from "@prismatic-io/spectral";
import { updateCampaignsExamplePayload } from "../../examplePayloads";
import { updateCampaignsInputs } from "../../inputs/campaigns";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateCampaigns = action({
  display: {
    label: "Update Campaigns",
    description: "Updates one or more campaigns within the specified account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaigns },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/Campaigns", {
      AccountId: accountId,
      Campaigns: campaigns,
    });

    return { data };
  },
  inputs: updateCampaignsInputs,
  examplePayload: updateCampaignsExamplePayload,
});
