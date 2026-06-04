import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { applicantId } from "../../inputs/onboardingCandidates";

export const updateOnboardingCandidateInfo = action({
  display: {
    label: "Update Onboarding Candidate Info",
    description: "Update an entity in OnboardingCandidateInfo",
  },
  inputs: {
    applicantId,
    connection,
  },
  perform: async (context, { connection, applicantId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/OnboardingCandidateInfo('${applicantId}')`);
    return {
      data,
    };
  },
});
