import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countLocationsInputs } from "../../inputs";
import { countLocationsExamplePayload } from "../../payloadExamples";

export const countLocations = action({
  display: {
    label: "Count Location (Deprecated)",
    description:
      "Count the number of locations enabled on your platform. This version of the action is being deprecated. Please replace action with Count Locations.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get("/locations/count.json");
    return { data: { data, headers } };
  },
  inputs: countLocationsInputs,
  examplePayload: { data: countLocationsExamplePayload },
});
