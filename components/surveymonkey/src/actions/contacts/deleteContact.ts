import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteContactInputs } from "../../inputs";
import { deleteContactExamplePayload } from "../../examplePayloads";






export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete a contact.",
  },
  inputs: deleteContactInputs,
  perform: async (context, { connection, contactId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/contacts/${contactId}`);

    return {
      data: {
        success: true,
        contactId,
        message: `Contact ${contactId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteContactExamplePayload,
});
