import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countLocationsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countLocationsInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countLocationsQuery from "../queries/locations/CountLocations.gql";

export const countLocationsGql = action({
  display: {
    label: "Count Locations",
    description: "Returns a count of all locations.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { locationsCount: Count } = await client.request(countLocationsQuery);

    return {
      data: data.locationsCount,
    };
  },
  inputs,
  examplePayload,
});
