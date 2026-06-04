import { dataSource } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection } from "../inputs";

export const listUsers = dataSource({
  display: {
    label: "List Users from Source",
    description: "A picklist of users for an account",
  },
  inputs: {
    connection: oneDriveConnection,
  },
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const {
      data: { value },
    } = await client.get("/users");

    return value
      .map((record: Record<string, unknown>) => {
        if (record.mail) {
          return {
            label: record.mail,
            key: record.id,
          };
        }
        return null;
      })
      .filter(Boolean);
  },
  dataSourceType: "picklist",
});
