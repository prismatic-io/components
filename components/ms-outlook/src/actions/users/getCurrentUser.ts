import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Gets the information and metadata of the user that is currently logged in.",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(params.connection, "/me");
    const { data } = await client.get(url);
    return { data };
  },
  inputs: getCurrentUserInputs,
  examplePayload: getCurrentUserExamplePayload,
});
