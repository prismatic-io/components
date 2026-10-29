import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countLocationsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countLocationsInputs as inputs } from "../../../inputsGql";
import { countLocationsGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countLocationsQuery from "../queries/locations/CountLocations.gql";

export const countLocationsGql = action({
  display: {
    label: "Count Locations",
    description: "Returns a count of all locations.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { locationsCount: Count } =
      await client.request(countLocationsQuery);

    return {
      data: data.locationsCount,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countLocationsGqlOutputSchema,
  }),
  examplePayload,
});
