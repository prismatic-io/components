import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createOnboardingCandidateInfoExamplePayload } from "../../examplePayloads";
import { createOnboardingCandidateInfoInputs } from "../../inputs";

export const createOnboardingCandidateInfo = action({
  display: {
    label: "Create Onboarding Candidate Info",
    description: "Create new onboarding candidate info.",
  },
  inputs: createOnboardingCandidateInfoInputs,
  perform: async (context, { connection, additionalInputs }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/OnboardingCandidateInfo`, {
      ...additionalInputs,
    });
    return {
      data,
    };
  },
  examplePayload: createOnboardingCandidateInfoExamplePayload,
});
