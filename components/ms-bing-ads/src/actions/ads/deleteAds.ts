import { action } from "@prismatic-io/spectral";
import { deleteAdsExamplePayload } from "../../examplePayloads";
import { deleteAdsInputs } from "../../inputs/ads";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteAds = action({
  display: {
    label: "Delete Ads",
    description: "Deletes one or more ads from the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, adIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/Ads", {
      data: { AdGroupId: adGroupId, AdIds: adIds },
    });

    return { data };
  },
  inputs: deleteAdsInputs,
  examplePayload: deleteAdsExamplePayload,
});
