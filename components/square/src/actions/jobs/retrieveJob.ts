import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveJobExamplePayload } from "../../examplePayloads";
import { retrieveJobInputs } from "../../inputs";

export const retrieveJob = action({
  display: {
    label: "Retrieve Job",
    description: "Retrieves a specified job by ID.",
  },
  perform: async (context, { squareConnection, jobId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const { data } = await client.get(`/v2/team-members/jobs/${jobId}`);
    return {
      data,
    };
  },
  inputs: retrieveJobInputs,
  examplePayload: retrieveJobExamplePayload,
});
