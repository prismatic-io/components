import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateContactListInputs } from "../../inputs";
import { updateContactListExamplePayload } from "../../examplePayloads";
import type { ContactList } from "../../types";






export const updateContactList = action({
  display: {
    label: "Update Contact List",
    description: "Update a contact list's name.",
  },
  inputs: updateContactListInputs,
  perform: async (context, { connection, contactListId, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch<ContactList>(
      `/contact_lists/${contactListId}`,
      { name },
    );

    return { data };
  },
  examplePayload: updateContactListExamplePayload,
});
