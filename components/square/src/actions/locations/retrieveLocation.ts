import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveLocationExamplePayload } from "../../examplePayloads";
import { retrieveLocationInputs } from "../../inputs";

export const retrieveLocation = action({
  display: {
    label: "Retrieve Location",
    description: "Retrieves details of a specific location.",
  },
  perform: async (context, { squareConnection, locationId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/locations/${locationId}`);

    return {
      data: response.data,
    };
  },
  inputs: retrieveLocationInputs,
  examplePayload: retrieveLocationExamplePayload,
});
