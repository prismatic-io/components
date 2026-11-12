import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteContactOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteContactInputs } from "../../inputs";
import { deleteContactExamplePayload } from "../../examplePayloads";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "This method deletes a contact associated with an account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, contactId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/contacts/${contactId}`);
    return { data };
  },
  examplePerform: async () => deleteContactExamplePayload,
  inputs: deleteContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteContactOutputSchema,
  }),
  examplePayload: deleteContactExamplePayload,
});
