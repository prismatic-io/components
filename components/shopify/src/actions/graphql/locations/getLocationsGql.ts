import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getLocationsExamplePayload as examplePayload } from "../../../examplePayloads";
import { getLocationInputs as inputs } from "../../../inputsGql";
import { getLocationsGqlOutputSchema } from "../../../outputSchemas";
import getLocationsQuery from "../queries/locations/GetLocations.gql";
export const getLocationsGql = action({
  display: {
    label: "Get Location",
    description: "Retrieves a location by ID.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection, locationId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getLocationsQuery, {
      id: locationId,
    });
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLocationsGqlOutputSchema,
  }),
  examplePayload,
});
