import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { deleteEntryExamplePayload as examplePayload } from "../examplePayloads";
import { deleteEntryInputs as inputs } from "../inputs";

export const deleteEntry = action({
  display: {
    label: "Delete Entry",
    description: "Deletes an entry in Active Directory.",
  },
  perform: async (context, { connection, dnToDelete }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ dnToDelete });
    }

    try {
      await client.del(dnToDelete);

      return { data: `Successfully deleted entry at ${dnToDelete}.` };
    } catch (err) {
      throw new Error(`LDAP Delete Error: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
