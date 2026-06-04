import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, contactId } from "../inputs";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "This method deletes a contact associated with an account.",
  },
  perform: async (context, { connection, contactId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/contacts/${contactId}`);
    return { data };
  },
  inputs: {
    connection,
    contactId,
  },
});
