import { dataSource } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { listDrivesDataSourceInputs } from "../inputs";

export const listDrives = dataSource({
  display: {
    label: "List Drives from Source",
    description: "A picklist of drives for an account",
  },
  inputs: listDrivesDataSourceInputs,
  perform: async (_context, { oneDriveConnection }) => {
    const client = getOneDriveClient(oneDriveConnection, false);
    const {
      data: { value },
    } = await client.get("/me/drives");

    return value.map((record: Record<string, unknown>) => {
      return {
        label: `${record.name}`,
        key: record.id,
      };
    });
  },
  dataSourceType: "picklist",
});
