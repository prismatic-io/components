import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Retrieve the user ID and OAuth scopes for the current user.",
  },
  inputs: getCurrentUserInputs,
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/v0/meta/whoami");
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});
