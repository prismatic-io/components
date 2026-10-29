import { action } from "@prismatic-io/spectral";
import { addCampaignsExamplePayload } from "../../examplePayloads";
import { addCampaignsInputs } from "../../inputs/campaigns";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addCampaigns = action({
  display: {
    label: "Add Campaigns",
    description: "Creates one or more campaigns within the specified account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaigns },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/Campaigns", {
      AccountId: accountId,
      Campaigns: campaigns,
    });

    return { data };
  },
  inputs: addCampaignsInputs,
  examplePayload: addCampaignsExamplePayload,
});
