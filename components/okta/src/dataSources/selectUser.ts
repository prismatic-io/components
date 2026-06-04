import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { User } from "../interfaces/user";
import { paginateRecordsWithLink } from "../util/util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "A picklist of users in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateRecordsWithLink<User>(client, "/users", true, {});

    const result = data.map<Element>((user) => ({
      label: `${user.profile.firstName} ${user.profile.lastName} (${user.profile.email})`,
      key: user.id.toString(),
    }));

    return {
      result,
    };
  },
  examplePayload: selectUserExamplePayload,
  dataSourceType: "picklist",
});
