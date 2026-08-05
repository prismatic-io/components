import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobExamplePayload } from "../../examplePayloads";
import { getJobInputs } from "../../inputs";
export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieve a job by ID",
  },
  inputs: getJobInputs,
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
