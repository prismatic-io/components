import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_ESTABLISH_PATH } from "../../constants";
import { getContactExamplePayload } from "../../examplePayloads";
import { getContactInputs } from "../../inputs";

export const getContact = action({
  examplePayload: getContactExamplePayload,
  display: {
    label: "Get Contact",
    description: "Retrieve a contact by contact key.",
  },
  inputs: getContactInputs,
  perform: async (context, { connection, contactKey }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(CONTACTS_ESTABLISH_PATH, {
      contactKeys: [contactKey],
    });
    const contact = data?.items?.[0]?.value?.contactReference || null;
    return { data: contact };
  },
});
