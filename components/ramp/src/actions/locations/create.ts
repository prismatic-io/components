import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse as createLocationResponse } from "../../examplePayloads/locations";
import { connection, entityId, name } from "../../inputs";
import { createLocationOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createLocationOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { entityId, name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createLocationResponse,
      entity_id: entityId || createLocationResponse.entity_id,
      name: name ?? createLocationResponse.name,
    },
  }),
  examplePayload: {
    data: createLocationResponse,
  },
});
