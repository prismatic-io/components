import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { renameEntryExamplePayload as examplePayload } from "../examplePayloads";
import { renameEntryInputs as inputs } from "../inputs";

export const renameEntry = action({
  display: {
    label: "Rename Entry",
    description: "Renames an entry in Active Directory.",
  },
  perform: async (context, { connection, toRenameDn, newRDn }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ toRenameDn, newRDn });
    }

    try {
      await client.modifyDN(toRenameDn, newRDn);

      return {
        data: `Successfully renamed entry to ${newRDn}.`,
      };
    } catch (err) {
      throw new Error(`Failed to rename entry to ${newRDn}. ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
