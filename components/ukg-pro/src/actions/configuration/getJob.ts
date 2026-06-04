import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getJobExamplePayload } from "../../examplePayloads";
import { getJobInputs } from "../../inputs";







export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieve detailed information for a specific job definition.",
  },
  inputs: getJobInputs,
  perform: async (context, { connection, jobId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/configuration/v2/jobs/${jobId}`);

    return { data };
  },
  examplePayload: getJobExamplePayload,
});
