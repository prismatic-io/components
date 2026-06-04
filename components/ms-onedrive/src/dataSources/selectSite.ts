import { dataSource } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection } from "../inputs";

export const selectSite = dataSource({
  display: {
    label: "Select Site",
    description: "A picklist of sites available to the current user",
  },
  inputs: {
    connection: oneDriveConnection,
  },
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const {
      data: { value },
    } = await client.get("/sites");

    return value.map((record: Record<string, unknown>) => {
      return {
        label: record.displayName,
        key: record.id,
      };
    });
  },
  dataSourceType: "picklist",
});
