import { action } from "@prismatic-io/spectral";
import { getAdsByAdGroupIdExamplePayload } from "../../examplePayloads";
import { getAdsByAdGroupIdInputs } from "../../inputs/ads";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getAdsByAdGroupId = action({
  display: {
    label: "Get Ads By Ad Group ID",
    description: "Gets the ads that belong to the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      adGroupId,
      adTypes,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Ads/QueryByAdGroupId",
      {
        AdGroupId: adGroupId,
        AdTypes: adTypes,
        ReturnAdditionalFields: returnAdditionalFields,
      },
    );

    return { data };
  },
  inputs: getAdsByAdGroupIdInputs,
  examplePayload: getAdsByAdGroupIdExamplePayload,
});
