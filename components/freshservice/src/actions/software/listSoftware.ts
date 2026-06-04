import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { listSoftwareInputs as inputs } from "../../inputs/software";

export const listSoftware = action({
  display: {
    label: "List Software",
    description: "Returns a list of all software applications.",
  },
  perform: async (context, { connection }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/applications`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
