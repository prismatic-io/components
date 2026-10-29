import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteContactInputs } from "../../inputs/contacts";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Deletes a contact by its ID.",
  },
  perform: async (context, { connection, contactId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/contacts/${contactId}`);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteContactInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
