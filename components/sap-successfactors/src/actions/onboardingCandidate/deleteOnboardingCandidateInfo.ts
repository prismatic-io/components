import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteOnboardingCandidateInfoExamplePayload } from "../../examplePayloads";
import { deleteOnboardingCandidateInfoInputs } from "../../inputs";

export const deleteOnboardingCandidateInfo = action({
  display: {
    label: "Delete Onboarding Candidate Info",
    description: "Delete onboarding candidate info by ID.",
  },
  inputs: deleteOnboardingCandidateInfoInputs,
  perform: async (context, { connection, applicantId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/OnboardingCandidateInfo('${applicantId}')`,
    );
    return {
      data,
    };
  },
  examplePayload: deleteOnboardingCandidateInfoExamplePayload,
});
