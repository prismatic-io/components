import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { $select, connection } from "../../inputs/general";
import { applicantId } from "../../inputs/onboardingCandidates";

export const getOnboardingCandidateInfo = action({
  display: {
    label: "Get Onboarding Candidate Info",
    description: "Get entity from OnboardingCandidateInfo by key",
  },
  inputs: {
    applicantId,
    $select,
    connection,
  },
  perform: async (context, { connection, applicantId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/OnboardingCandidateInfo('${applicantId}')`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
