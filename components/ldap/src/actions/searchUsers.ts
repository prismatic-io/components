import { action } from "@prismatic-io/spectral";
import type { SearchOptions } from "ldapts";
import { getLdapClient } from "../client";
import { searchUsersExamplePayload as examplePayload } from "../examplePayloads";
import { searchUsersInputs as inputs } from "../inputs";
import { getRootDn } from "../util";

export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Searches for users in Active Directory.",
  },
  perform: async (context, { connection, additionalAttributes }) => {
    const client = await getLdapClient(connection);
    const rootDn = await getRootDn(client);

    if (context.debug.enabled) {
      context.logger.debug({ additionalAttributes });
    }

    try {
      const options: SearchOptions = {
        scope: "sub",
        filter: "(objectClass=user)",
        attributes: ["cn", "mail", ...additionalAttributes],
      };
      const { searchEntries } = await client.search(rootDn, options);

      return {
        data: {
          users: searchEntries,
        },
      };
    } catch (err) {
      throw new Error(`LDAP Search Users Error: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
