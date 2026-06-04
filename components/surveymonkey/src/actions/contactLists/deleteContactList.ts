import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteContactListInputs } from "../../inputs";
import { deleteContactListExamplePayload } from "../../examplePayloads";






export const deleteContactList = action({
  display: {
    label: "Delete Contact List",
    description: "Delete a contact list.",
  },
  inputs: deleteContactListInputs,
  perform: async (context, { connection, contactListId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/contact_lists/${contactListId}`);

    return {
      data: {
        success: true,
        contactListId,
        message: `Contact list ${contactListId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteContactListExamplePayload,
});
