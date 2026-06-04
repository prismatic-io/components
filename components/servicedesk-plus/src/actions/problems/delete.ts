import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProblemResponse as examplePayload } from "../../examplePayloads";
import { deleteProblemInputs as inputs } from "../../inputs";

export const deleteProblem = action({
  display: {
    label: "Delete Problem",
    description: "Delete a problem by ID",
  },
  inputs,
  perform: async (context, { connectionInput, toDeleteProblemId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(`/problems/${toDeleteProblemId}`);
    return { data };
  },
  examplePayload,
});
