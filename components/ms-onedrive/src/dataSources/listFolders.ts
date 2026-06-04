import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir } from "../inputs";

export const listFolders = dataSource({
  display: {
    label: "List Folders from Source",
    description: "A picklist of folders in a given directory",
  },
  inputs: {
    oneDriveConnection,
    dir,
  },
  perform: async (_context, { oneDriveConnection, dir }) => {
    const client = getOneDriveClient(oneDriveConnection, false);
    const path = dir === "/" ? "/me/drive/root/children" : dir;
    let files: Record<string, unknown>[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;

    do {
      const { data } = await client.get(nextLink);
      files = [
        ...files,
        ...(data?.value.filter(
          (record: { folder: Record<string, unknown> }) => record.folder,
        ) || []),
      ];
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);

    return {
      result: files.map((record) => {
        return {
          key: record.id,
          label: record.name,
        };
      }) as Element[],
    };
  },
  dataSourceType: "picklist",
});
