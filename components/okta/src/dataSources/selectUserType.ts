import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { UserType } from "../interfaces/user";

export const selectUserType = dataSource({
  display: {
    label: "Select User Type",
    description: "A picklist of User Types in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<UserType[]>("/meta/types/user");

    const result = data.map<Element>((userType) => ({
      label: userType.displayName || userType.name || userType.id,
      key: userType.id,
    }));

    return {
      result,
    };
  },
  examplePayload: selectUserExamplePayload,
  dataSourceType: "picklist",
});
