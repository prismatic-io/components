import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getWorkLocationExamplePayload } from "../../../examplePayloads";
import { getWorkLocationInputs } from "../../../inputs";

export const getWorkLocation = action({
  display: {
    label: "Get Work Location (V2)",
    description: "Retrieve a specific work location by ID.",
  },
  inputs: getWorkLocationInputs,
  examplePayload: getWorkLocationExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/work-locations/${id}`);
    return { data };
  },
});
