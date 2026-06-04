import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { listLocationsExamplePayload } from "../../examplePayloads";
import { listLocationsInputs } from "../../inputs";







export const listLocations = action({
  display: {
    label: "List Locations",
    description: "Retrieve a list of work locations defined in the organization.",
  },
  inputs: listLocationsInputs,
  perform: async (context, { connection, countryCode, isActive }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get("/configuration/v1/locations", {
      params: { countryCode, isActive },
    });

    return { data };
  },
  examplePayload: listLocationsExamplePayload,
});
