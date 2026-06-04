import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createContactListInputs } from "../../inputs";
import { createContactListExamplePayload } from "../../examplePayloads";
import type { ContactList, CreateContactListInput } from "../../types";






export const createContactList = action({
  display: {
    label: "Create Contact List",
    description: "Create a new contact list.",
  },
  inputs: createContactListInputs,
  perform: async (context, { connection, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const body: CreateContactListInput = { name };

    const { data } = await client.post<ContactList>("/contact_lists", body);

    return { data };
  },
  examplePayload: createContactListExamplePayload,
});
