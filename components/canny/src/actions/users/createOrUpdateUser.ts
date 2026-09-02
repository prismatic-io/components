import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createOrUpdateUserExamplePayload } from "../../examplePayloads";
import { createOrUpdateUserInputs } from "../../inputs";
import { createOrUpdateUserOutputSchema } from "../../outputSchemas";
export const createOrUpdateUser = action({
  display: {
    label: "Create or Update User",
    description: "Creates a new user or updates an existing one by email.",
  },
  inputs: createOrUpdateUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createOrUpdateUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, userEmail, userName, userId, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/users/create_or_update", {
      email: userEmail,
      name: userName,
      userID: userId,
      companies: additionalFields.companies,
      customFields: additionalFields.customFields,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createOrUpdateUserExamplePayload,
  examplePayload: createOrUpdateUserExamplePayload,
});
