import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateOnboardingCandidateInfoExamplePayload } from "../../examplePayloads";
import { updateOnboardingCandidateInfoInputs } from "../../inputs";

export const updateOnboardingCandidateInfo = action({
  display: {
    label: "Update Onboarding Candidate Info",
    description: "Update existing onboarding candidate info.",
  },
  inputs: updateOnboardingCandidateInfoInputs,
  perform: async (context, { connection, applicantId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/OnboardingCandidateInfo('${applicantId}')`,
    );
    return {
      data,
    };
  },
  examplePayload: updateOnboardingCandidateInfoExamplePayload,
});
