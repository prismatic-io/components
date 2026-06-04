import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listLocationsInputs } from "../../inputs";
import { listLocationsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listLocations = action({
  display: {
    label: "List Locations (Deprecated)",
    description:
      "List all locations enabled on your platform. This version of the action is being deprecated. Please replace action with List Locations.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      "/locations.json",
      { limit: params.limit, page_info: params.pageInfo || undefined },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listLocationsInputs,
  examplePayload: { data: listLocationsExamplePayload },
});
