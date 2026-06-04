import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectUserDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/users`);
    const result = (data.users as []).map<Element>(({ name, id, email }) => ({
      label: `${name} (${email})`,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectUserDataSourceExamplePayload,
  },
});
