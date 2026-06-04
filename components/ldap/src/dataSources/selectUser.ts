import { dataSource, type Element } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { connection } from "../inputs/common";
import { getRootDn } from "../util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from Active Directory.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await getLdapClient(connection);
    const rootDn = await getRootDn(client);

    try {
      const { searchEntries } = await client.search(rootDn, {
        scope: "sub",
        filter: "(objectClass=user)",
        attributes: ["cn", "mail", "dn"],
      });

      const result = searchEntries
        .map(
          (entry): Element => ({
            key: entry.dn,
            label: (entry.cn as string) || entry.dn,
          }),
        )
        .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

      return { result };
    } finally {
      await client.unbind();
    }
  },
  dataSourceType: "picklist",
});
