import { action } from "@prismatic-io/spectral";
import { getCampaignsByIdsExamplePayload } from "../../examplePayloads";
import { getCampaignsByIdsInputs } from "../../inputs/campaigns";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getCampaignsByIds = action({
  display: {
    label: "Get Campaigns By IDs",
    description: "Gets the specified campaigns within the specified account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      campaignIds,
      campaignType,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Campaigns/QueryByIds",
      {
        AccountId: accountId,
        CampaignIds: campaignIds,
        CampaignType: campaignType,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getCampaignsByIdsInputs,
  examplePayload: getCampaignsByIdsExamplePayload,
});
