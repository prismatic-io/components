import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse } from "../../examplePayloads";
import { connection, locationId } from "../../inputs";

export const getLocation = action({
  display: {
    label: "Get Location",
    description: "Retrieve a location by ID",
  },
  inputs: {
    connection,
    locationId: {
      ...locationId,
      comments: "The ID of the location to retrieve",
    },
  },
  perform: async (context, { connection, locationId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/locations/${locationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getLocationResponse,
  },
});
