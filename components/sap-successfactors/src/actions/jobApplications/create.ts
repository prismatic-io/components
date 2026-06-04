import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobApplicationExamplePayload } from "../../examplePayloads/jobApplications";
import { createJobApplicationInputs } from "../../inputs/jobApplicants";
import { cleanResultFromResponse } from "../../util";

export const createJobApplication = action({
  display: {
    label: "Create Job Application",
    description: "Add a new entity to JobApplication",
  },
  inputs: createJobApplicationInputs,
  perform: async (context, { connection, additionalInputs, candidateId, jobReqId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/JobApplication`, {
      ...additionalInputs,
      candidateId,
      jobReqId,
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: createJobApplicationExamplePayload,
});
