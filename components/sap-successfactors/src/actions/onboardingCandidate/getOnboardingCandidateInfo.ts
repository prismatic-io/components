import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOnboardingCandidateInfoExamplePayload } from "../../examplePayloads";
import { getOnboardingCandidateInfoInputs } from "../../inputs";

export const getOnboardingCandidateInfo = action({
  display: {
    label: "Get Onboarding Candidate Info",
    description: "Retrieve onboarding candidate info by ID.",
  },
  inputs: getOnboardingCandidateInfoInputs,
  perform: async (context, { connection, applicantId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/OnboardingCandidateInfo('${applicantId}')`,
      {
        params: {
          $select,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: getOnboardingCandidateInfoExamplePayload,
});
