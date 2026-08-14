import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_EMAIL_SEARCH_PATH } from "../../constants";
import { searchContactsByEmailExamplePayload } from "../../examplePayloads";
import { searchContactsByEmailInputs } from "../../inputs";
import { searchContactsByEmailOutputSchema } from "../../outputSchemas";
export const searchContactsByEmail = action({
  examplePayload: searchContactsByEmailExamplePayload,
  display: {
    label: "Search Contacts by Email",
    description: "Search for contacts by email address.",
  },
  inputs: searchContactsByEmailInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchContactsByEmailOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, emailAddress }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(CONTACTS_EMAIL_SEARCH_PATH, {
      email: emailAddress,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: searchContactsByEmailExamplePayload.data,
  }),
});
