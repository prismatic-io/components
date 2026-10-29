import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobApplicationExamplePayload as getJobApplicationExamplePayload } from "../../examplePayloads";
import { getJobApplicationInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const getJobApplication = action({
  display: {
    label: "Get Job Application",
    description: "Retrieve a job application by ID.",
  },
  inputs: getJobApplicationInputs,
  perform: async (context, { connection, jobApplicationId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/JobApplication('${jobApplicationId}')`,
      {
        params: {
          $select,
        },
      },
    );
    return {
      data: cleanResultFromResponse(data),
    };
  },
  examplePayload: getJobApplicationExamplePayload,
});
