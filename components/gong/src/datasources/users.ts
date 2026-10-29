import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

interface User {
  requestId: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  }[];
}

export const users = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from your Gong workspace",
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<User>(`/v2/users`);

    const result = data.users.map<Element>((user) => {
      return {
        label: `${user.emailAddress} - ${user.lastName} ${user.firstName}`,
        key: user.id.toString(),
      };
    });

    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
  },
});
