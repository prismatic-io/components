import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listMailboxesDataSourceInputs } from "../inputs/dataSources";

export const listMailboxes = dataSource({
  display: {
    label: "List Mailboxes",
    description:
      "Returns a picklist of available mailboxes that users can choose from",
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
    await client.connect();
    try {
      const data = await client.list();
      return {
        result: data.map((mailbox) => ({
          key: mailbox.path,
          label: mailbox.name,
        })),
      };
    } finally {
      client.close();
    }
  },
  inputs: listMailboxesDataSourceInputs,
});
