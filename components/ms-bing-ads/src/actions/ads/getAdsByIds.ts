import { action } from "@prismatic-io/spectral";
import { getAdsByIdsExamplePayload } from "../../examplePayloads";
import { getAdsByIdsInputs } from "../../inputs/ads";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getAdsByIds = action({
  display: {
    label: "Get Ads By IDs",
    description: "Gets the specified ads within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      accountId,
      customerId,
      adGroupId,
      adIds,
      adTypes,
      returnAdditionalFields,
    },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>("/Ads/QueryByIds", {
      AdGroupId: adGroupId,
      AdIds: adIds,
      AdTypes: adTypes,
      ReturnAdditionalFields: returnAdditionalFields,
    });

    return { data };
  },
  inputs: getAdsByIdsInputs,
  examplePayload: getAdsByIdsExamplePayload,
});
