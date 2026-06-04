import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createContactInputs } from "../../inputs";
import { createContactExamplePayload } from "../../examplePayloads";
import type { Contact, CreateContactInput } from "../../types";






export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new contact.",
  },
  inputs: createContactInputs,
  perform: async (
    context,
    { connection, email, firstName, lastName, customFields, extraBody },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: CreateContactInput = {
      email,
      first_name: firstName,
      last_name: lastName,
      custom_fields: (customFields as Record<string, string>) || undefined,
      ...extraBody,
    };

    const { data } = await client.post<Contact>("/contacts", body);

    return { data };
  },
  examplePayload: createContactExamplePayload,
});
