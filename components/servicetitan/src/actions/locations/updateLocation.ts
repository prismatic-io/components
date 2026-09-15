import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateLocationExamplePayload } from "../../examplePayloads";
import { updateLocationInputs } from "../../inputs";
import { updateLocationOutputSchema } from "../../outputSchemas";
export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Update a location.",
  },
  inputs: updateLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateLocationOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      address,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
      locationId,
      active,
      taxZoneId,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(`/locations/${locationId}`, {
      address,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
      active,
      taxZoneId,
    });
    return {
      data,
    };
  },
  examplePerform: async () => updateLocationExamplePayload,
  examplePayload: updateLocationExamplePayload,
});
