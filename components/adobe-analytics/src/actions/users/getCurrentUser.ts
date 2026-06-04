import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import type { DiscoveryResponse } from "../../types";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Retrieves the authenticated user and associated organizations and companies.",
  },
  inputs: getCurrentUserInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<DiscoveryResponse>("/discovery/me");
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});
