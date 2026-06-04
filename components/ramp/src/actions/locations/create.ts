import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse as createLocationResponse } from "../../examplePayloads/locations";
import { connection, entityId, name } from "../../inputs";

export const createLocation = action({
  display: {
    label: "Create Location",
    description: "Create a new location",
  },
  inputs: {
    name: {
      ...name,
      comments: "The name of the location",
      required: true,
    },
    entityId,
    connection,
  },
  perform: async (context, { connection, entityId, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/locations`, {
      entity_id: entityId,
      name,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createLocationResponse,
  },
});
