import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, dir } from "../../inputs";
import { sortArray } from "../../utils";

export const listDrives = dataSource({
  display: {
    label: "List Drives from Source",
    description: "A picklist of files in a given directory",
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
      files.push(...(data.value || []));
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);

    const result = sortArray(
      files.map((record) => {
        return {
          key: record.id,
          label: record.name,
        };
      }),
    );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
