import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchAdsLocalServicesExamplePayload } from "../../examplePayloads";
import { searchAdsLocalServicesInputs } from "../../inputs";
import { searchAdsOutputSchema } from "../../outputSchemas";
import { searchGoogleAds } from "../../util";
export const searchAdsLocalServices = action({
  display: {
    label: "Search Ads",
    description:
      "Returns rows matching a GAQL query against Google Ads resources.",
  },
  inputs: searchAdsLocalServicesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchAdsOutputSchema,
  }),
  performSafety: "notAllowed",
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
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => searchAdsLocalServicesExamplePayload,
  examplePayload: searchAdsLocalServicesExamplePayload,
});
