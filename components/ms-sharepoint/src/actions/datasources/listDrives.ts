import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, siteId } from "../../inputs";
import type { Drive } from "../../interfaces";
import { sortArray } from "../../utils";
export const listDrives = dataSource({
  display: {
    label: "List Drives",
    description: "A picklist of drives for a given site",
  },
  inputs: {
    connection,
    siteId: { ...siteId, dataSource: undefined },
  },
  perform: async (_context, { connection, siteId }) => {
    const client = await createClient(connection, false);
    const path = `/sites/${siteId}/drives`;
    const drives: Drive[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;
    do {
      const { data } = await client.get(nextLink);
      drives.push(...(data.value || []));
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);
    const result = sortArray(
      drives.map((drive) => ({
        key: drive.id,
        label: drive.name,
      })),
    );
    return { result };
  },
  dataSourceType: "picklist",
});
