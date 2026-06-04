import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { sortRecords } from "../util";

interface User {
  id: number;
  name: string;
  email: string;
  active_flag: boolean;
}

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a User from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false);
    const { data } = await client.get<{ data: User[] }>("/users");

    const users = data?.data ?? [];

    const result = sortRecords(
      users.filter((user) => user.active_flag),
      "name",
    ).map<Element>((user) => ({
      key: user.id.toString(),
      label: `${user.name} (${user.email})`,
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "John Doe (john@example.com)", key: "1" }],
  },
});
