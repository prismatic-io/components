import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getLocationsInputs } from "../../inputs";
import { getLocationExamplePayload } from "../../payloadExamples";

export const getLocations = action({
  display: {
    label: "Get Location (Deprecated)",
    description:
      "Get the information and metadata of a location enabled on your platform. This version of the action is being deprecated. Please replace action with Get Location.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/locations/${params.locationId}.json`);
    return { data: { data, headers } };
  },
  inputs: getLocationsInputs,
  examplePayload: { data: getLocationExamplePayload },
});
