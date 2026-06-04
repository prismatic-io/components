import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getLocationsExamplePayload as examplePayload } from "../../../examplePayloads";
import { getLocationInputs as inputs } from "../../../inputsGql";
import getLocationsQuery from "../queries/locations/GetLocations.gql";

export const getLocationsGql = action({
  display: {
    label: "Get Location",
    description: "Retrieves a location by ID.",
  },
  perform: async (context, { shopifyConnection, locationId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = await client.request(getLocationsQuery, {
      id: locationId,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
