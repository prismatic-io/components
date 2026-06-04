import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { groupDatasource } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Group } from "../interfaces";
import { fetchAllData, TComparator } from "../util";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a Group from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(client, "/groups", {}, true)) as {
      data: Group[];
    };

    const objects = data
      .sort(TComparator<Group>)
      .map<Element>(({ id, name }) => ({
        key: id,
        label: name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: groupDatasource,
  },
});
