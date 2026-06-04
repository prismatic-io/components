import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateContactInputs } from "../../inputs";
import { updateContactExamplePayload } from "../../examplePayloads";
import type { Contact } from "../../types";






export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update an existing contact's information.",
  },
  inputs: updateContactInputs,
  perform: async (
    context,
    {
      connection,
      contactId,
      email,
      firstName,
      lastName,
      customFields,
      extraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    
    const body: Record<string, unknown> = {
      email,
      first_name: firstName,
      last_name: lastName,
      custom_fields: customFields || undefined,
      ...extraBody,
    };

    const { data } = await client.patch<Contact>(
      `/contacts/${contactId}`,
      body,
    );

    return { data };
  },
  examplePayload: updateContactExamplePayload,
});
