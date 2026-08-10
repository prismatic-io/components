import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationExamplePayload } from "../../examplePayloads/locations";
import { getLocationInputs } from "../../inputs";
import { locationOutputSchema } from "../../outputSchemas";
import type { Location } from "../../types";
export const getLocation = action({
  display: {
    label: "Get Location",
    description:
      "Retrieve a single work location by Location ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getLocationExamplePayload,
  inputs: getLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: locationOutputSchema,
  }),
  perform: async (
    context,
    { connection, locationId, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Location>(`/locationsV2/${locationId}`, {
      params: {
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
