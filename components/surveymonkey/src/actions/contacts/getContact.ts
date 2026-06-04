import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getContactInputs } from "../../inputs";
import { getContactExamplePayload } from "../../examplePayloads";
import type { Contact } from "../../types";






export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieve details about a specific contact.",
  },
  inputs: getContactInputs,
  perform: async (context, { connection, contactId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<Contact>(`/contacts/${contactId}`);

    return { data };
  },
  examplePayload: getContactExamplePayload,
});
