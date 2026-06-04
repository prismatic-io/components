import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { viewOnboardingRequestExamplePayload as examplePayload } from "../../examplePayloads";
import { viewOnboardingRequestInputs as inputs } from "../../inputs/onboarding";

export const viewOnboardingRequest = action({
  display: {
    label: "View Onboarding Request",
    description: "Retrieves the onboarding request form.",
  },
  perform: async (context, { connection }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/onboarding_requests/form`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
