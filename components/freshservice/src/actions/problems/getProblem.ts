import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { getProblemInputs as inputs } from "../../inputs";
import { problemOutputSchema } from "../../outputSchemas";
export const getProblem = action({
  display: {
    label: "Get Problem",
    description: "Retrieves details of a problem by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, problemId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/problems/${problemId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: problemOutputSchema,
  }),
  inputs,
  examplePayload,
});
