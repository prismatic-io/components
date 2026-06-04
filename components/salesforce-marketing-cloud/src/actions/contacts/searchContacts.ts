import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_SEARCH_PATH } from "../../constants";
import { searchContactsExamplePayload } from "../../examplePayloads";
import { searchContactsInputs } from "../../inputs";

export const searchContacts = action({
  examplePayload: searchContactsExamplePayload,
  display: {
    label: "Search Contacts",
    description: "Search contacts using filter criteria.",
  },
  inputs: searchContactsInputs,
  perform: async (context, { connection, searchFilter }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(CONTACTS_SEARCH_PATH, searchFilter);

    return { data };
  },
});
