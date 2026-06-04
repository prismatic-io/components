import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateLocationExamplePayload } from "../../examplePayloads";
import { updateLocationInputs } from "../../inputs";

export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Updates a location associated with a Square account.",
  },
  perform: async (context, { locationId, locationUpdate, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    
    const params: Record<string, unknown> = {};

    const response = await client.put(
      `/v2/locations/${locationId}`,
      { location: locationUpdate },
      { params },
    );

    return {
      data: response.data,
    };
  },
  inputs: updateLocationInputs,
  examplePayload: updateLocationExamplePayload,
});
