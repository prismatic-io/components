import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobExamplePayload } from "../../examplePayloads";
import { getJobInputs } from "../../inputs";
import { getJobOutputSchema } from "../../outputSchemas";
export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieve a job by ID.",
  },
  inputs: getJobInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getJobOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, jobId, externalDataApplicationGuid },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/jobs/${jobId}`, {
      params: {
        externalDataApplicationGuid,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getJobExamplePayload,
});
