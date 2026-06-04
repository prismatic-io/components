import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteProblemInputs as inputs } from "../../inputs/problems";

export const deleteProblem = action({
  display: {
    label: "Delete Problem",
    description: "Deletes a problem by ID.",
  },
  perform: async (context, { connection, problemId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    await client.delete(`/problems/${problemId}`);

    return SUCCESS_RESPONSE;
  },
  inputs,
  examplePayload,
});
