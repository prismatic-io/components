import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationExamplePayload as updateLocationExamplePayload } from "../../examplePayloads";
import { updateLocationInputs } from "../../inputs";
export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Update a location",
  },
  inputs: updateLocationInputs,
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
  examplePayload: updateLocationExamplePayload,
});
