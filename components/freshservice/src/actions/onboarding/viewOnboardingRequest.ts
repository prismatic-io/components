import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { viewOnboardingRequestExamplePayload as examplePayload } from "../../examplePayloads";
import { viewOnboardingRequestInputs as inputs } from "../../inputs";
import { viewOnboardingRequestOutputSchema } from "../../outputSchemas";
export const viewOnboardingRequest = action({
  display: {
    label: "View Onboarding Request",
    description: "Retrieves the onboarding request form.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/onboarding_requests/form`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: viewOnboardingRequestOutputSchema,
  }),
  inputs,
  examplePayload,
});
