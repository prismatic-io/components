import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createJobExamplePayload } from "../../examplePayloads";
import { createJobInputs } from "../../inputs";

export const createJob = action({
  display: {
    label: "Create Job",
    description: "Creates a job in a seller account with a title and tip eligibility.",
  },
  perform: async (context, { squareConnection, idempotencyKey, jobTitle, isTipEligible }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      job: {
        title: jobTitle,
      } as Record<string, unknown>,
    };

    if (isTipEligible) {
      requestBody.job.is_tip_eligible = isTipEligible;
    }

    const { data } = await client.post("/v2/team-members/jobs", requestBody);
    return {
      data,
    };
  },
  inputs: createJobInputs,
  examplePayload: createJobExamplePayload,
});
