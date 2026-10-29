import { action } from "@prismatic-io/spectral";
import { getCampaignsByAccountIdExamplePayload } from "../../examplePayloads";
import { getCampaignsByAccountIdInputs } from "../../inputs/campaigns";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getCampaignsByAccountId = action({
  display: {
    label: "Get Campaigns By Account ID",
    description: "Gets the campaigns that belong to the specified account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignType, returnAdditionalFields },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Campaigns/QueryByAccountId",
      {
        AccountId: accountId,
        CampaignType: campaignType,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getCampaignsByAccountIdInputs,
  examplePayload: getCampaignsByAccountIdExamplePayload,
});
