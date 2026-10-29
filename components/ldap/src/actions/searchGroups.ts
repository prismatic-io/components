import { action } from "@prismatic-io/spectral";
import type { SearchOptions } from "ldapts";
import { getLdapClient } from "../client";
import { searchGroupsExamplePayload as examplePayload } from "../examplePayloads";
import { searchGroupsInputs as inputs } from "../inputs";
import { getRootDn } from "../util";

export const searchGroups = action({
  display: {
    label: "Search Groups",
    description: "Searches for groups in Active Directory.",
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
        filter: "(objectClass=group)",
        attributes: ["cn", "name", ...additionalAttributes],
      };
      const { searchEntries } = await client.search(rootDn, options);

      return {
        data: {
          groups: searchEntries,
        },
      };
    } catch (err) {
      throw new Error(`LDAP Search Groups Error: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
