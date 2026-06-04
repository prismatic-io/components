import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { getSoftwareInputs as inputs } from "../../inputs/software";

export const getSoftware = action({
  display: {
    label: "Get Software",
    description: "Retrieves details of a software application by ID.",
  },
  perform: async (context, { connection, applicationId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/applications/${applicationId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
