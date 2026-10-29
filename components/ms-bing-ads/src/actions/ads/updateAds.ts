import { action } from "@prismatic-io/spectral";
import { updateAdsExamplePayload } from "../../examplePayloads";
import { updateAdsInputs } from "../../inputs/ads";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateAds = action({
  display: {
    label: "Update Ads",
    description: "Updates one or more ads within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, ads },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/Ads", {
      AdGroupId: adGroupId,
      Ads: ads,
    });

    return { data };
  },
  inputs: updateAdsInputs,
  examplePayload: updateAdsExamplePayload,
});
