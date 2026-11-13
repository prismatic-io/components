import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { listDrivesDataSourceExamplePayload } from "../examplePayloads";
import { listDrivesDataSourceInputs } from "../inputs";
import { fetchAllPages } from "../util";

export const listDrives = dataSource({
  display: {
    label: "List Drives from Source",
    description: "Lists available drives for an account.",
  },
  inputs: listDrivesDataSourceInputs,
  perform: async (_context, { oneDriveConnection }) => {
    const client = getOneDriveClient(oneDriveConnection, false);
    const drives = await fetchAllPages<Record<string, unknown>>(
      client,
      "/me/drives",
    );

    return {
      result: drives.map((record) => {
        return {
          label: `${record.name}`,
          key: record.id,
        };
      }) as Element[],
    };
  },
  examplePayload: listDrivesDataSourceExamplePayload,
  dataSourceType: "picklist",
});
