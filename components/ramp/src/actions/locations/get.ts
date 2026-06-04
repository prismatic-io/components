import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse } from "../../examplePayloads/locations";
import { connection, locationId } from "../../inputs";

export const getLocation = action({
  display: {
    label: "Get Location",
    description: "Retrieve a location by ID",
  },
  inputs: {
    locationId,
    connection,
  },
  perform: async (context, { connection, locationId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/locations/${locationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getLocationResponse,
  },
});
