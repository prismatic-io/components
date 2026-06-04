import { action } from "@prismatic-io/spectral";
import { Attribute, Change } from "ldapts";
import { getLdapClient } from "../client";
import { disableUserAccountExamplePayload as examplePayload } from "../examplePayloads";
import { disableUserAccountInputs as inputs } from "../inputs";

export const disableUserAccount = action({
  display: {
    label: "Disable User Account",
    description: "Disables a user account in Active Directory.",
  },
  perform: async (context, { connection, userDn }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ userDn });
    }

    try {
      const searchResult = await client.search(userDn, {
        scope: "base",
        attributes: ["userAccountControl"],
      });

      const userEntry = searchResult.searchEntries[0];
      if (!userEntry?.userAccountControl) {
        throw new Error(`Could not retrieve userAccountControl for ${userDn}.`);
      }

      const currentUac = parseInt(userEntry.userAccountControl as string, 10);
      const disabledUac = currentUac | 0x2; 

      const change = new Change({
        operation: "replace",
        modification: new Attribute({
          type: "userAccountControl",
          values: [disabledUac.toString()],
        }),
      });

      await client.modify(userDn, change);

      return {
        data: `User ${userDn} has been disabled.`,
      };
    } catch (err) {
      throw new Error(`Failed to disable user ${userDn}: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
