import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getContactExamplePayload } from "../../examplePayloads";
import { getContactInputs } from "../../inputs";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieves a contact by its ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, contactId }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/contacts/${contactId}`, {
      params: { include: "profileImage" },
    });
    return { data };
  },
  inputs: getContactInputs,
  examplePayload: getContactExamplePayload,
});
