import { action } from "@prismatic-io/spectral";
import { addAdsExamplePayload } from "../../examplePayloads";
import { addAdsInputs } from "../../inputs/ads";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addAds = action({
  display: {
    label: "Add Ads",
    description: "Creates one or more ads within the specified ad group.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, adGroupId, ads },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/Ads", {
      AdGroupId: adGroupId,
      Ads: ads,
    });

    return { data };
  },
  inputs: addAdsInputs,
  examplePayload: addAdsExamplePayload,
});
