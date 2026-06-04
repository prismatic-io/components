import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { applicantId } from "../../inputs/onboardingCandidates";

export const deleteOnboardingCandidateInfo = action({
  display: {
    label: "Delete Onboarding Candidate Info",
    description: "Delete an entity from OnboardingCandidateInfo",
  },
  inputs: {
    applicantId,
    connection,
  },
  perform: async (context, { connection, applicantId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/OnboardingCandidateInfo('${applicantId}')`);
    return {
      data,
    };
  },
});
