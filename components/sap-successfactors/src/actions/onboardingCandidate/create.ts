import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCandidateInfoExample } from "../../exampleInputs";
import { additionalInputs, connection } from "../../inputs/general";

export const createOnboardingCandidateInfo = action({
  display: {
    label: "Create Onboarding Candidate Info",
    description: "Add a new entity to OnboardingCandidateInfo",
  },
  inputs: {
    additionalInputs: {
      ...additionalInputs,
      example: JSON.stringify(createCandidateInfoExample, null, 2),
    },
    connection,
  },
  perform: async (context, { connection, additionalInputs }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/OnboardingCandidateInfo`, {
      ...additionalInputs,
    });
    return {
      data,
    };
  },
});
