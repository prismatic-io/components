import { action } from "@prismatic-io/spectral";
import { getAdGroupsByCampaignIdExamplePayload } from "../../examplePayloads";
import { getAdGroupsByCampaignIdInputs } from "../../inputs/adGroups";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getAdGroupsByCampaignId = action({
  display: {
    label: "Get Ad Groups By Campaign ID",
    description: "Gets the ad groups that belong to the specified campaign.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, campaignId, returnAdditionalFields },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/AdGroups/QueryByCampaignId",
      {
        CampaignId: campaignId,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getAdGroupsByCampaignIdInputs,
  examplePayload: getAdGroupsByCampaignIdExamplePayload,
});
