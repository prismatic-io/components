import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectGroupExamplePayload } from "../examplePayloads";
import { paginateResults } from "../util";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group app from the list of groups",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false, true);
    const data = await paginateResults(client, "/groups", true);

    return data.value.map((group: { id: string; displayName: string }) => {
      return {
        label: group.displayName,
        key: group.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectGroupExamplePayload },
});
