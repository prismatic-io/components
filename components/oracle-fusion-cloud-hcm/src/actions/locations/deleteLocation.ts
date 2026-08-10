import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteLocationExamplePayload } from "../../examplePayloads/locations";
import { deleteLocationInputs } from "../../inputs";
import { deleteResultOutputSchema } from "../../outputSchemas";
export const deleteLocation = action({
  display: {
    label: "Delete Location",
    description:
      "Delete a work location by Location ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: deleteLocationExamplePayload,
  inputs: deleteLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteResultOutputSchema,
  }),
  perform: async (context, { connection, locationId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/locationsV2/${locationId}`);
    return { data: { id: locationId, status: "DELETED" } };
  },
});
