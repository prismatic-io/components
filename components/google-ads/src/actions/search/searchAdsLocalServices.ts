import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchAdsExamplePayload } from "../../examplePayloads";
import { searchAdsLocalServicesInputs } from "../../inputs";
import { searchGoogleAds } from "../../util";

export const searchAdsLocalServices = action({
  display: {
    label: "Search Ads",
    description:
      "Returns rows matching a GAQL query against Local Services resources.",
  },
  inputs: searchAdsLocalServicesInputs,
  perform: async (
    context,
    {
      connection,
      customerId,
      managerCustomerId,
      pageTokenInput,
      query,
      returnTotalResultsCount,
      fetchAll,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
      managerCustomerId,
    );
    const data = await searchGoogleAds(client, {
      customerId,
      fetchAll,
      params: {
        pageToken: pageTokenInput || undefined,
        query: query || undefined,
        returnTotalResultsCount: returnTotalResultsCount || undefined,
      },
    });
    return { data };
  },
  examplePayload: searchAdsExamplePayload,
});
