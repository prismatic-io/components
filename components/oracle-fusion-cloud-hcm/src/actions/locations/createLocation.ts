import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createLocationExamplePayload } from "../../examplePayloads/locations";
import { createLocationInputs } from "../../inputs";
import { locationOutputSchema } from "../../outputSchemas";
import type { Location } from "../../types";
import { toChildArray } from "../../util";
export const createLocation = action({
  display: {
    label: "Create Location",
    description: "Create a new work location in Oracle Fusion Cloud HCM.",
  },
  examplePayload: createLocationExamplePayload,
  inputs: createLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: locationOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
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
    const { data } = await client.post<Location>("/locationsV2", body);
    return { data };
  },
});
