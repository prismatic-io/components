import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobApplicationExamplePayload as getJobApplicationExamplePayload } from "../../examplePayloads/jobApplications";
import { getJobApplicationInputs } from "../../inputs/jobApplicants";
import { cleanResultFromResponse } from "../../util";

export const getJobApplication = action({
  display: {
    label: "Get Job Application",
    description: "Get entity from JobApplication by key",
  },
  inputs: getJobApplicationInputs,
  perform: async (context, { connection, jobApplicationId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/JobApplication('${jobApplicationId}')`, {
      params: {
        $select,
      },
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: getJobApplicationExamplePayload,
});
