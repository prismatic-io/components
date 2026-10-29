import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectGroupDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/groups`);
    const result = (data.groups as []).map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectGroupDataSourceExamplePayload,
  },
});
