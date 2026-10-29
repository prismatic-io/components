import { action } from "@prismatic-io/spectral";
import type { SearchOptions } from "ldapts";
import { getLdapClient } from "../client";
import { searchExamplePayload as examplePayload } from "../examplePayloads";
import { searchInputs as inputs } from "../inputs";

export const search = action({
  display: {
    label: "Search Entries",
    description: "Searches for entries in Active Directory.",
  },
  perform: async (
    context,
    { connection, searchBase, scope, filter, attributes, includeReferences },
  ) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({
        searchBase,
        scope,
        filter,
        attributes,
        includeReferences,
      });
    }

    try {
      const options: SearchOptions = {
        scope: scope as SearchOptions["scope"],
        filter,
        attributes,
      };

      const { searchEntries, searchReferences } = await client.search(
        searchBase,
        options,
      );

      return {
        data: {
          entries: searchEntries,
          ...(includeReferences && { references: searchReferences }),
        },
      };
    } catch (err) {
      throw new Error(`LDAP Search Error: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
