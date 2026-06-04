import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_PATH } from "../../constants";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContactInputs } from "../../inputs";

export const createContact = action({
  examplePayload: createContactExamplePayload,
  display: {
    label: "Create Contact",
    description: "Create a new contact in Marketing Cloud.",
  },
  inputs: createContactInputs,
  perform: async (context, { connection, contactKey, attributeSets }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      contactKey,
      attributeSets,
    };

    const { data } = await client.post(CONTACTS_PATH, body);

    return { data };
  },
});
