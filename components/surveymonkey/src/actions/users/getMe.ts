import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrentUserInputs } from "../../inputs";
import { getMeExamplePayload } from "../../examplePayloads";
import type { User } from "../../types";






export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Retrieve information about the currently authenticated user.",
  },
  inputs: getCurrentUserInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<User>("/users/me");

    return { data };
  },
  examplePayload: getMeExamplePayload,
});
