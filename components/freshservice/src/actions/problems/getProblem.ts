import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { getProblemInputs as inputs } from "../../inputs/problems";

export const getProblem = action({
  display: {
    label: "Get Problem",
    description: "Retrieves details of a problem by ID.",
  },
  perform: async (context, { connection, problemId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/problems/${problemId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
