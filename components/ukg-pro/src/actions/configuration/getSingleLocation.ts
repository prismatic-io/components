import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getSingleLocationExamplePayload } from "../../examplePayloads";
import { getSingleLocationInputs } from "../../inputs";







export const getSingleLocation = action({
  display: {
    label: "Get Single Location",
    description: "Retrieve detailed information for a specific work location.",
  },
  inputs: getSingleLocationInputs,
  perform: async (context, { connection, locationId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/configuration/v1/locations/${locationId}`);

    return { data };
  },
  examplePayload: getSingleLocationExamplePayload,
});
