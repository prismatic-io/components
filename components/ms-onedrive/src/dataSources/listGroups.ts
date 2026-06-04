import { dataSource } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection } from "../inputs";

export const listGroups = dataSource({
  display: {
    label: "List Groups from Source",
    description: "A picklist of groups for an account",
  },
  inputs: {
    connection: oneDriveConnection,
  },
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const {
      data: { value },
    } = await client.get("/groups");

    return value.map((record: Record<string, unknown>) => {
      return {
        label: record.displayName,
        key: record.id,
      };
    });
  },
  dataSourceType: "picklist",
});
