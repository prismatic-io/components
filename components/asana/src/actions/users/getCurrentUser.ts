import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: getCurrentUserInputs,
  examplePayload: getCurrentUserExamplePayload,
});
