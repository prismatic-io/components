import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse as updateLocationResponse } from "../../examplePayloads/locations";
import { connection, entityId, locationId, name } from "../../inputs";

export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Update an existing location",
  },
  inputs: {
    locationId: {
      ...locationId,
      comments: "The ID of the location to update",
    },
    name: {
      ...name,
      comments: "The updated name of the location",
      required: true,
    },
    entityId: {
      ...entityId,
      comments: "The ID of the entity to update the location",
    },
    connection,
  },
  perform: async (context, { connection, locationId, name, entityId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/locations/${locationId}`, {
      name,
      entity_id: entityId,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateLocationResponse,
  },
});
