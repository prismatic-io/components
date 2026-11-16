import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listFoldersExamplePayload } from "../examplePayloads";
import { listFoldersInputs } from "../inputs/dataSources";
import { sortArray } from "../util";

export const listFolders = dataSource({
  display: {
    label: "List Folders from Source",
    description: "A picklist of folders in the root of the specified drive.",
  },
  inputs: listFoldersInputs,
  perform: async (_context, { connection, driveId }) => {
    const client = await createClient(connection, false);
    const path = `/drives/${driveId}/root/children`;
    const files: Record<string, string>[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;

    do {
      const { data } = await client.get(nextLink);
      files.push(...(data?.value.filter((record: Record<string, string>) => record.folder) || []));
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);
    return {
      result: sortArray(
        files.map((record) => ({
          key: record.id,
          label: record.name,
        })),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: listFoldersExamplePayload,
});
