import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createOrUpdateUserExamplePayload } from "../../examplePayloads";
import { createOrUpdateUserInputs } from "../../inputs";

export const createOrUpdateUser = action({
  display: {
    label: "Create or Update User",
    description: "Creates a new user or updates an existing one by email.",
  },
  inputs: createOrUpdateUserInputs,
  perform: async (
    context,
    {
      connection,
      userEmail,
      userName,
      userId,
      companies,
      customFields,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/users/create_or_update", {
      email: userEmail,
      name: userName,
      userID: userId,
      companies,
      customFields,
      ...additionalFields,
    });
    return { data };
  },
  examplePayload: createOrUpdateUserExamplePayload,
});
