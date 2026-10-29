import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectUserRoleDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectUserRole = dataSource({
  display: {
    label: "Select User Role",
    description: "Select a user role from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/userroles`);
    const result = (data.Roles as []).map<Element>(({ Name, Id }) => ({
      label: Name,
      key: Id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectUserRoleDataSourceExamplePayload,
  },
});
