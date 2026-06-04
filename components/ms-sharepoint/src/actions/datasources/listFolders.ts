import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, dir } from "../../inputs";
import { sortArray } from "../../utils";

export const listFolders = dataSource({
  display: {
    label: "List Folders from Source",
    description: "A picklist of folders in a given directory",
  },
  inputs: {
    connection,
    dir,
  },
  perform: async (_context, { connection, dir }) => {
    const client = await createClient(connection, false);
    const path = dir === "/" ? "/me/drive/root/children" : dir;
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
        files.map((record) => {
          return {
            key: record.id,
            label: record.name,
          };
        }),
      ),
    };
  },
  dataSourceType: "picklist",
});
