import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, dir } from "../inputs";

export const listFilesInDirectory = dataSource({
  display: {
    label: "Files in Directory",
    description: "A picklist of files in a given directory",
  },
  inputs: {
    connection: oneDriveConnection,
    dir,
  },
  perform: async (_context, { connection, dir }) => {
    const client = getOneDriveClient(connection, false);
    const path =
      dir === "/"
        ? "/me/drive/root/children"
        : `/me/drive/root:${dir}:/children`;
    let files: Record<string, unknown>[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;

    do {
      const { data } = await client.get(nextLink);
      files = [...files, ...(data.value || [])];
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);
    return {
      result: files
        .filter((record) => !record?.folder)
        .map((record) => {
          return {
            key: `${record?.["@microsoft.graph.downloadUrl"]}`,
            label: record.name,
          };
        }) as Element[],
    };
  },
  dataSourceType: "picklist",
});
