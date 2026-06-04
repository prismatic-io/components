import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createContactsBulkInputs } from "../../inputs";
import { createBulkContactsExamplePayload } from "../../examplePayloads";
import type { Contact } from "../../types";










export const createContactsBulk = action({
  display: {
    label: "Create Contacts Bulk",
    description: "Create multiple contacts at once using a JSON array.",
  },
  inputs: createContactsBulkInputs,
  perform: async (
    context,
    { connection, contacts, updateExistingContacts },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    if (!Array.isArray(contacts)) {
      throw new Error("Contacts must be a JSON array of contact objects.");
    }

    
    const { data } = await client.post<{
      succeeded: Contact[];
      failed: unknown[];
    }>("/contacts/bulk", {
      contacts,
      update_existing: updateExistingContacts,
    });

    return { data };
  },
  examplePayload: createBulkContactsExamplePayload,
});
