import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { updateEntryExamplePayload as examplePayload } from "../examplePayloads";
import { updateEntryInputs as inputs } from "../inputs";

export const updateEntry = action({
  display: {
    label: "Update Entry",
    description: "Updates an entry in Active Directory.",
  },
  perform: async (context, { connection, entryToUpdate, changes }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ entryToUpdate, changes });
    }

    if (!changes) {
      throw new Error("Changes are required to update an entry.");
    }

    try {
      await client.modify(entryToUpdate, changes);

      return {
        data: `Successfully updated entry at ${entryToUpdate}.`,
      };
    } catch (err) {
      throw new Error(`Failed to update entry: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
