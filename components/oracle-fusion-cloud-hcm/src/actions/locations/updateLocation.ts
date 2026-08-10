import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateLocationExamplePayload } from "../../examplePayloads/locations";
import { updateLocationInputs } from "../../inputs";
import { locationOutputSchema } from "../../outputSchemas";
import type { Location } from "../../types";
import { toChildArray } from "../../util";
export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Update an existing work location in Oracle Fusion Cloud HCM.",
  },
  examplePayload: updateLocationExamplePayload,
  inputs: updateLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: locationOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
      locationId,
      LocationCode,
      LocationName,
      EffectiveStartDate,
      EffectiveEndDate,
      SetCode,
      SetId,
      Description,
      EmailAddress,
      primaryAddress,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const addresses = toChildArray(primaryAddress);
    const body = {
      LocationCode,
      LocationName,
      EffectiveStartDate,
      EffectiveEndDate,
      SetCode,
      SetId,
      Description,
      EmailAddress,
      addresses,
      ...additionalFields,
    };
    const { data } = await client.patch<Location>(
      `/locationsV2/${locationId}`,
      body,
    );
    return { data };
  },
});
