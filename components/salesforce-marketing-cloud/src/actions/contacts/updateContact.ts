import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CONTACTS_PATH } from "../../constants";
import { updateContactExamplePayload } from "../../examplePayloads";
import { updateContactInputs } from "../../inputs";

export const updateContact = action({
  examplePayload: updateContactExamplePayload,
  display: {
    label: "Update Contact",
    description: "Update an existing contact's attributes in Marketing Cloud.",
  },
  inputs: updateContactInputs,
  perform: async (context, { connection, contactKey, attributeSets }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      contactKey,
      attributeSets,
    };

    const { data } = await client.patch(
      `${CONTACTS_PATH}/key:${encodeURIComponent(contactKey)}`,
      body,
    );

    return { data };
  },
});
