import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getContactListInputs } from "../../inputs";
import { getContactListExamplePayload } from "../../examplePayloads";
import type { ContactList } from "../../types";






export const getContactList = action({
  display: {
    label: "Get Contact List",
    description: "Retrieve details about a specific contact list.",
  },
  inputs: getContactListInputs,
  perform: async (context, { connection, contactListId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<ContactList>(
      `/contact_lists/${contactListId}`,
    );

    return { data };
  },
  examplePayload: getContactListExamplePayload,
});
