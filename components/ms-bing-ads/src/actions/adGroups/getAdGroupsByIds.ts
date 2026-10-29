import { action } from "@prismatic-io/spectral";
import { getAdGroupsByIdsExamplePayload } from "../../examplePayloads";
import { getAdGroupsByIdsInputs } from "../../inputs/adGroups";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getAdGroupsByIds = action({
  display: {
    label: "Get Ad Groups By IDs",
    description: "Gets the specified ad groups within the specified campaign.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      campaignId,
      adGroupIds,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/AdGroups/QueryByIds",
      {
        CampaignId: campaignId,
        AdGroupIds: adGroupIds,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getAdGroupsByIdsInputs,
  examplePayload: getAdGroupsByIdsExamplePayload,
});
