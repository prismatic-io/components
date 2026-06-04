import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listLocationsExamplePayload } from "../../examplePayloads";
import { listLocationsInputs } from "../../inputs";

export const listLocations = action({
  display: {
    label: "List Locations",
    description: "Lists all of the seller's locations, including those with an inactive status.",
  },
  perform: async (context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get("/v2/locations");

    return {
      data: response.data,
    };
  },
  inputs: listLocationsInputs,
  examplePayload: listLocationsExamplePayload,
});
