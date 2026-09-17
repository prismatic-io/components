import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteProblemInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const deleteProblem = action({
  display: {
    label: "Delete Problem",
    description: "Deletes a problem by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, problemId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/problems/${problemId}`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
