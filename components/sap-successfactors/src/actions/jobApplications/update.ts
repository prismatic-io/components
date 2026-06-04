import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE, NO_CONTENT_RESPONSE_TEXT } from "../../constants";
import { updateJobApplicationInputs } from "../../inputs/jobApplicants";

export const updateJobApplication = action({
  display: {
    label: "Update Job Application",
    description: "Update an entity in JobApplication",
  },
  inputs: updateJobApplicationInputs,
  perform: async (
    context,
    { connection, jobApplicationId, additionalInputs, candidateId, jobReqId },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.put(`/JobApplication('${jobApplicationId}')`, {
      ...additionalInputs,
      candidateId,
      jobReqId,
    });
    return {
      data: NO_CONTENT_RESPONSE_TEXT,
    };
  },
  examplePayload: NO_CONTENT_RESPONSE,
});
