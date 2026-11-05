import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateJobExamplePayload } from "../../examplePayloads";
import { updateJobInputs } from "../../inputs";

export const updateJob = action({
  display: {
    label: "Update Job",
    description:
      "Updates the title or tip eligibility of a job. Changes propagate to all job assignments, shifts, and wage settings.",
  },
  perform: async (context, { squareConnection, jobId, jobTitle, isTipEligible, version }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      job: {} as Record<string, unknown>,
    };

    if (jobTitle !== undefined && jobTitle !== "") {
      requestBody.job.title = jobTitle;
    }

    if (isTipEligible) {
      requestBody.job.is_tip_eligible = isTipEligible;
    }

    if (version !== undefined) {
      requestBody.job.version = util.types.toInt(version);
    }

    const { data } = await client.put(`/v2/team-members/jobs/${jobId}`, requestBody);
    return {
      data,
    };
  },
  inputs: updateJobInputs,
  examplePayload: updateJobExamplePayload,
});
